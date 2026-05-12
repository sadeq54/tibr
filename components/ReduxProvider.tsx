"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import type { Persistor } from "redux-persist";

import { persistor, store } from "@/lib/store";

/**
 * Redux + redux-persist root provider.
 *
 * We render `children` immediately (no PersistGate wall) so server-rendered
 * HTML contains the full page tree — critical for SEO, since otherwise the
 * gate emits `loading={null}` on SSR and crawlers see an empty body.
 *
 * Rehydration from localStorage happens client-side via persistStore's own
 * `useEffect`; any UI prefs (theme, currency) flash from default to persisted
 * state on first paint, which is acceptable for a public, non-auth site.
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const persistorRef = useRef<Persistor | null>(null);
  useEffect(() => {
    if (!persistorRef.current) {
      persistorRef.current = persistor;
    }
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
