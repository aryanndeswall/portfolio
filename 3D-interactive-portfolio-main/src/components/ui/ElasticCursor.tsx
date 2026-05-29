/**
 * Performance optimized ElasticCursor
 * RAF throttled mousemove + high-performance GSAP Ticker loop to eliminate garbage collection overhead
 * Dynamic body class binding for a highly robust, fail-safe accessibility fallback.
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

// GSAP Ticker hook for frame-synced loops
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

function useInstance<T = any>(value?: T | (() => T)): T {
  const ref = useRef<any>(EMPTY);
  if (ref.current === EMPTY) {
    ref.current = typeof value === "function" ? (value as Function)() : (value ?? {});
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
function getHoverParent(el: HTMLElement | null): HTMLElement | null {
  if (!el) return null;
  if (el.classList?.contains("cursor-can-hover")) return el;
  if (el.parentElement?.classList?.contains("cursor-can-hover")) return el.parentElement;
  if (el.parentElement?.parentElement?.classList?.contains("cursor-can-hover")) return el.parentElement.parentElement;
  return null;
}

const CURSOR_DIAMETER = 50;

function ElasticCursor() {
  const { loadingPercent, isLoading } = usePreloader();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const jellyRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Track targeted and actual mouse positions for ultra-smooth spring physics
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const dotRef = useRef<HTMLDivElement>(null);

  // Position and velocity state
  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance();

  // Bind GSAP quick setters — bypasses React rendering for peak performance
  useLayoutEffect(() => {
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
    set.width = gsap.quickSetter(jellyRef.current, "width", "px");
    
    // Offset center bounds cleanly
    gsap.set(jellyRef.current, { xPercent: -50, yPercent: -50 });
  }, [set]);

  // GSAP ticker loop — runs calculations on frame render ticks, not mousemove triggers
  const loop = useCallback(() => {
    if (!set.width || !set.sx || !set.sy || !set.r) return;

    // Smooth spring interpolation (lerp)
    const dx = mouseX.current - pos.x;
    const dy = mouseY.current - pos.y;

    pos.x += dx * 0.15;
    pos.y += dy * 0.15;

    // Compute frame-by-frame velocity vectors
    vel.x = dx * 0.8;
    vel.y = dy * 0.8;

    const rotation = getAngle(+vel.x, +vel.y);
    const scale = getScale(+vel.x, +vel.y);

    if (!isHovering && !isLoading) {
      set.x(pos.x);
      set.y(pos.y);
      set.width(CURSOR_DIAMETER + scale * 300);
      set.r(rotation);
      set.sx(1 + scale);
      set.sy(1 - scale * 2);
    }
  }, [isHovering, isLoading, pos, set, vel]);

  const [cursorMoved, setCursorMoved] = useState(false);

  // Passive mousemove handler — zero style layout recalculations here
  useLayoutEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorMoved) setCursorMoved(true);

      const mx = e.clientX;
      const my = e.clientY;

      mouseX.current = mx;
      mouseY.current = my;

      // Position the small indicator dot instantly
      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top = my + "px";
      }

      const el = e.target as HTMLElement;
      const hoverElem = getHoverParent(el);

      if (hoverElem) {
        const rect = hoverElem.getBoundingClientRect();
        setIsHovering(true);
        gsap.to(jellyRef.current, {
          rotate: 0,
          width: hoverElem.offsetWidth + 20,
          height: hoverElem.offsetHeight + 20,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 10,
          duration: 0.4,
          overwrite: "auto",
          ease: "power2.out",
        });
      } else if (isHovering) {
        setIsHovering(false);
        gsap.to(jellyRef.current, {
          borderRadius: 50,
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          duration: 0.3,
          overwrite: "auto",
          ease: "power2.out",
        });
      }
    };

    if (!isLoading) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isLoading, isHovering, cursorMoved, isMobile]);

  // Loading bar progress animation
  useEffect(() => {
    if (!jellyRef.current) return;
    jellyRef.current.style.height = "2rem";
    jellyRef.current.style.borderRadius = "1rem";
    jellyRef.current.style.width = loadingPercent * 2 + "vw";
  }, [loadingPercent]);

  // Failsafe accessibility mapping: only hide native cursor if ElasticCursor successfully loads
  useEffect(() => {
    if (cursorMoved && !isMobile) {
      document.documentElement.classList.add("custom-cursor-active");
    }
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [cursorMoved, isMobile]);

  useTicker(loop, isLoading || !cursorMoved || isMobile);

  if (isMobile) return null;

  return (
    <>
      {/* Elastic jelly blob — centered via GSAP quickSetter */}
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
      {/* Small precise indicator dot */}
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
