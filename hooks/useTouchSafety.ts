"use client";

import { useEffect } from "react";

export function useTouchSafety() {
  useEffect(() => {
    const handleElement = (el: Element) => {
      if (!(el instanceof HTMLElement)) return;

      let startY = 0;

      const onStart = (e: TouchEvent) => {
        startY = e.touches[0].clientY;
      };

      const onEnd = (e: TouchEvent) => {
        const endY = e.changedTouches[0].clientY;
        const diff = Math.abs(endY - startY);
        if (diff < 10) el.click();
      };

      el.addEventListener("touchstart", onStart);
      el.addEventListener("touchend", onEnd);

      // Clean-up when needed
      el.addEventListener("remove", () => {
        el.removeEventListener("touchstart", onStart);
        el.removeEventListener("touchend", onEnd);
      });
    };

    // Initial run
    document.querySelectorAll("[data-tap-safe]").forEach(handleElement);

    // Watch for future DOM changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;

          if (node.matches?.("[data-tap-safe]")) {
            handleElement(node);
          }

          // If node has children with [data-tap-safe]
          node.querySelectorAll?.("[data-tap-safe]").forEach(handleElement);
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
