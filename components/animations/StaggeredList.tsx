"use client";
import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StaggeredListProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  start?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale";
}

export function StaggeredList({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  duration = 0.6,
  start = "top 85%",
  animation = "fade-up",
}: StaggeredListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/cbae29ee-7e08-4316-8562-21952b4578ad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'StaggeredList.tsx:36',message:'useGSAP entry',data:{prefersReducedMotion,hasContainer:!!containerRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
      if (prefersReducedMotion || !containerRef.current) return;

      const items = containerRef.current.children;
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/cbae29ee-7e08-4316-8562-21952b4578ad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'StaggeredList.tsx:40',message:'Children check',data:{itemsLength:items.length,animation},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      
      if (!items.length) return;

      const animations = {
        "fade-up": { from: { y: 30, opacity: 0 }, to: { y: 0, opacity: 1 } },
        "fade-left": { from: { x: -30, opacity: 0 }, to: { x: 0, opacity: 1 } },
        "fade-right": { from: { x: 30, opacity: 0 }, to: { x: 0, opacity: 1 } },
        scale: {
          from: { scale: 0.9, opacity: 0 },
          to: { scale: 1, opacity: 1 },
        },
      };

      const { from, to } = animations[animation];
      
      // #region agent log
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const triggerPoint = viewportHeight * 0.85;
      const isInViewport = rect.top < triggerPoint;
      
      // Check if element is near bottom of document (footer detection)
      const elementAbsoluteTop = rect.top + scrollY;
      const distanceFromBottom = documentHeight - (elementAbsoluteTop + rect.height);
      const isNearBottom = distanceFromBottom < viewportHeight * 0.3; // Within 30% of viewport from bottom
      
      fetch('http://127.0.0.1:7242/ingest/cbae29ee-7e08-4316-8562-21952b4578ad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'StaggeredList.tsx:54',message:'Before animation',data:{rectTop:rect.top,rectBottom:rect.bottom,viewportHeight,documentHeight,elementAbsoluteTop,distanceFromBottom,isInViewport,isNearBottom,start},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-v2',hypothesisId:'F'})}).catch(()=>{});
      // #endregion

      // Check if element is already in viewport OR is a footer element near bottom
      if (isInViewport || isNearBottom) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/cbae29ee-7e08-4316-8562-21952b4578ad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'StaggeredList.tsx:68',message:'Animating immediately (in viewport or near bottom)',data:{animation,reason:isNearBottom?'near-bottom':'in-viewport'},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-v2',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
        
        // Animate immediately without ScrollTrigger
        gsap.fromTo(items, from, {
          ...to,
          stagger,
          delay,
          duration,
          ease: "power3.out",
          onComplete: () => {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/cbae29ee-7e08-4316-8562-21952b4578ad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'StaggeredList.tsx:81',message:'Animation complete (immediate)',data:{animation},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-v2',hypothesisId:'E'})}).catch(()=>{});
            // #endregion
          },
        });
      } else {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/cbae29ee-7e08-4316-8562-21952b4578ad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'StaggeredList.tsx:88',message:'Using ScrollTrigger (below viewport)',data:{animation},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-v2',hypothesisId:'FIX'})}).catch(()=>{});
        // #endregion
        
        // Use ScrollTrigger for elements below viewport
        gsap.fromTo(items, from, {
          ...to,
          stagger,
          delay,
          duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once: true,
            onEnter: () => {
              // #region agent log
              fetch('http://127.0.0.1:7242/ingest/cbae29ee-7e08-4316-8562-21952b4578ad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'StaggeredList.tsx:103',message:'ScrollTrigger onEnter fired',data:{animation},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-v2',hypothesisId:'A'})}).catch(()=>{});
              // #endregion
            },
          },
          onComplete: () => {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/cbae29ee-7e08-4316-8562-21952b4578ad',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'StaggeredList.tsx:108',message:'Animation complete (scrollTrigger)',data:{animation},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-v2',hypothesisId:'E'})}).catch(()=>{});
            // #endregion
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
