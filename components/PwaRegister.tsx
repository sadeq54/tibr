"use client";

import { useEffect } from "react";

/**
 * Registers `/public/sw.js` in production, after the page has loaded so the
 * registration never competes with LCP. Renders nothing.
 *
 * Skipped on: dev builds, Netlify previews/branch deploys (never cache a
 * staging host), and inside iframes (the `/embed/*` widgets on partner pages).
 *
 * `controllerchange` fires when a new worker takes over (we `skipWaiting` +
 * `clients.claim`). Reload once so the page never mixes chunks from two
 * deploys — but only when a previous controller existed, otherwise the very
 * first install would trigger a surprise reload.
 */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const ctx = process.env.NEXT_PUBLIC_DEPLOY_CONTEXT;
    if (ctx && ctx !== "production") return;
    if (!("serviceWorker" in navigator) || window.top !== window) return;

    const sw = navigator.serviceWorker;
    const hadController = Boolean(sw.controller);
    let refreshing = false;

    const onControllerChange = () => {
      if (!hadController || refreshing) return;
      refreshing = true;
      window.location.reload();
    };
    const register = () => {
      sw.register("/sw.js", { scope: "/" }).catch(() => {
        // Registration failures are non-fatal — the site works without a worker.
      });
    };

    sw.addEventListener("controllerchange", onControllerChange);
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });

    return () => {
      sw.removeEventListener("controllerchange", onControllerChange);
      window.removeEventListener("load", register);
    };
  }, []);

  return null;
}
