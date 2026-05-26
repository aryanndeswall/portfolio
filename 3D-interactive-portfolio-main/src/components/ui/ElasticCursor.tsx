/**
 * Disclaimer: This component is not entirely my own.
 * Performance fixes: RAF throttling + passive listeners to eliminate lag.
 */

"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { usePreloader } from "../preloader";
import { useMediaQuery } from "@/hooks/use-media-query";

// GSAP Ticker hook
function useTicker(callback: any, paused: boolean) {
  useEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      gsap.ticker.remove(callback);
    };
  }, [callback, paused]);
}

const EMPTY = {} as {
  x: Function;
  y: Function;
  r?: Function;
  width?: Function;
  rt?: Function;
  sx?: Function;
  sy?: Function;
};
function useInstance(value = {}) {
  const ref = useRef(EMPTY);
  if (ref.current === EMPTY) {
    ref.current = typeof value === "function" ? value() : value;
  }
  return ref.current;
}

// Squeeze scale from velocity magnitude
function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}

// Rotation angle from velocity direction
function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

// Find the closest hoverable ancestor
function getRekt(el: HTMLElement) {
  if (el.classList.contains("cursor-can-hover"))
    return el.getBoundingClientRect();
  else if (el.parentElement?.classList.contains("cursor-can-hover"))
    return el.parentElement.getBoundingClientRect();
  else if (el.parentElement?.parentElement?.classList.contains("cursor-can-hover"))
    return el.parentElement.parentElement.getBoundingClientRect();
  return null;
}

const CURSOR_DIAMETER = 50;

function ElasticCursor() {
  const { loadingPercent, isLoading } = usePreloader();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const jellyRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  // Track raw mouse position for the small dot — avoids useMouse hook lag
  const dotX = useRef(0);
  const dotY = useRef(0);
  const dotRef = useRef<HTMLDivElement>(null);

  // RAF throttle refs — only process one mousemove per animation frame
  const rafRef = useRef<number | null>(null);
  const pendingEventRef = useRef<MouseEvent | null>(null);

  // Position and velocity state
  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance();

  // Bind GSAP quick setters — xPercent/yPercent center the blob without
  // Tailwind translate classes that GSAP's transform system would overwrite
  useLayoutEffect(() => {
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
    set.width = gsap.quickSetter(jellyRef.current, "width", "px");
    // Let GSAP own the centering offset so it stays correct when x/y update
    gsap.set(jellyRef.current, { xPercent: -50, yPercent: -50 });
  }, []);

  // GSAP ticker loop — runs every frame, not on every mousemove
  const loop = useCallback(() => {
    if (!set.width || !set.sx || !set.sy || !set.r) return;
    const rotation = getAngle(+vel.x, +vel.y);
    const scale = getScale(+vel.x, +vel.y);

    if (!isHovering && !isLoading) {
      set.x(pos.x);
      set.y(pos.y);
      set.width(50 + scale * 300);
      set.r(rotation);
      set.sx(1 + scale);
      set.sy(1 - scale * 2);
    } else {
      set.r(0);
    }
  }, [isHovering, isLoading]);

  const [cursorMoved, setCursorMoved] = useState(false);

  // Mousemove handler — throttled via RAF to prevent jank
  useLayoutEffect(() => {
    if (isMobile) return;

    const processEvent = (e: MouseEvent) => {
      if (!jellyRef.current) return;
      if (!cursorMoved) setCursorMoved(true);

      const mx = e.clientX;
      const my = e.clientY;

      // Move the precise dot instantly — no spring, no offset
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }

      const el = e.target as HTMLElement;
      const hoverElemRect = getRekt(el);

      if (hoverElemRect) {
        const rect = el.getBoundingClientRect();
        setIsHovering(true);
        gsap.to(jellyRef.current, { rotate: 0, duration: 0 });
        gsap.to(jellyRef.current, {
          width: el.offsetWidth + 20,
          height: el.offsetHeight + 20,
          // snap blob to center of hovered element
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 10,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        });
      } else {
        gsap.to(jellyRef.current, {
          borderRadius: 50,
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
        });
        setIsHovering(false);
      }

      gsap.to(pos, {
        x: mx,
        y: my,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onUpdate: () => {
          // @ts-ignore
          vel.x = (mx - pos.x) * 1.2;
          // @ts-ignore
          vel.y = (my - pos.y) * 1.2;
        },
      });

      loop();
      rafRef.current = null;
    };

    // Only schedule ONE frame at a time — debounce rapid mouse events
    const setFromEvent = (e: MouseEvent) => {
      pendingEventRef.current = e;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        if (pendingEventRef.current) {
          processEvent(pendingEventRef.current);
          pendingEventRef.current = null;
        }
      });
    };

    if (!isLoading) {
      // passive: true tells browser we won't call preventDefault() → no jank
      window.addEventListener("mousemove", setFromEvent, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isLoading]);

  // Loading bar animation
  useEffect(() => {
    if (!jellyRef.current) return;
    jellyRef.current.style.height = "2rem";
    jellyRef.current.style.borderRadius = "1rem";
    jellyRef.current.style.width = loadingPercent * 2 + "vw";
  }, [loadingPercent]);

  useTicker(loop, isLoading || !cursorMoved || isMobile);

  if (isMobile) return null;

  return (
    <>
      {/* Elastic jelly blob — centered via GSAP xPercent/yPercent, NOT Tailwind translate */}
      <div
        ref={jellyRef}
        id="jelly-id"
        className={cn(
          `w-[${CURSOR_DIAMETER}px] h-[${CURSOR_DIAMETER}px] border-2 border-black dark:border-white`,
          "jelly-blob fixed left-0 top-0 rounded-lg z-[999] pointer-events-none"
        )}
        style={{
          zIndex: 100,
          backdropFilter: "invert(100%)",
        }}
      />
      {/* Small precise dot — positioned directly via ref for zero lag */}
      <div
        ref={dotRef}
        className="w-2 h-2 rounded-full fixed pointer-events-none"
        style={{
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%)",
          backdropFilter: "invert(100%)",
          willChange: "left, top",
          zIndex: 100,
        }}
      />
    </>
  );
}

export default ElasticCursor;
