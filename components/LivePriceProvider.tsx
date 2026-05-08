"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SourceKey = "binance" | "coinbase" | "kraken";

export type SourceState = {
  key: SourceKey;
  name: string;
  bid: number;
  ask: number;
  last: number;
  high_24h: number;
  low_24h: number;
  change_24h: number;
  change_24h_pct: number;
  volume_24h: number;
  ts: number;
  connected: boolean;
  tick_count: number;
};

export type LivePrice = {
  xau: number | null;
  bid: number | null;
  ask: number | null;
  high24: number | null;
  low24: number | null;
  changePct24: number | null;
  change24: number | null;
  vol24: number | null;
  isLive: boolean;
  lastTick: number;
  sources: SourceState[];
  totalTicks: number;
};

const EMPTY: LivePrice = {
  xau: null,
  bid: null,
  ask: null,
  high24: null,
  low24: null,
  changePct24: null,
  change24: null,
  vol24: null,
  isLive: false,
  lastTick: 0,
  sources: [],
  totalTicks: 0,
};

const Ctx = createContext<LivePrice>(EMPTY);

export function useLivePrice(): LivePrice {
  return useContext(Ctx);
}

const initial = (k: SourceKey, n: string): SourceState => ({
  key: k,
  name: n,
  bid: 0,
  ask: 0,
  last: 0,
  high_24h: 0,
  low_24h: 0,
  change_24h: 0,
  change_24h_pct: 0,
  volume_24h: 0,
  ts: 0,
  connected: false,
  tick_count: 0,
});

function median(arr: number[]): number | null {
  const f = arr.filter((n) => Number.isFinite(n) && n > 0);
  if (f.length === 0) return null;
  const s = [...f].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
}

function medianSigned(arr: number[]): number | null {
  const f = arr.filter((n) => Number.isFinite(n) && n !== 0);
  if (f.length === 0) return null;
  const s = [...f].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
}

export function LivePriceProvider({ children }: { children: React.ReactNode }) {
  const [sources, setSources] = useState<Record<SourceKey, SourceState>>({
    binance: initial("binance", "Binance"),
    coinbase: initial("coinbase", "Coinbase"),
    kraken: initial("kraken", "Kraken"),
  });
  const reconnectRef = useRef<Record<SourceKey, number>>({
    binance: 0,
    coinbase: 0,
    kraken: 0,
  });

  const patch = useCallback((key: SourceKey, p: Partial<SourceState>) => {
    setSources((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...p,
        ts: Date.now(),
        tick_count: prev[key].tick_count + 1,
      },
    }));
  }, []);

  const setStatus = useCallback((key: SourceKey, connected: boolean) => {
    setSources((prev) => ({ ...prev, [key]: { ...prev[key], connected } }));
  }, []);

  useEffect(() => {
    let stopped = false;
    const sockets: WebSocket[] = [];

    const reconnect = (key: SourceKey, fn: () => void) => {
      if (stopped) return;
      const attempts = reconnectRef.current[key]++;
      const delay = Math.min(30_000, 1000 * Math.pow(2, attempts));
      setTimeout(() => {
        if (!stopped) fn();
      }, delay);
    };

    const connectBinance = () => {
      try {
        const ws = new WebSocket(
          "wss://stream.binance.com:9443/stream?streams=paxgusdt@bookTicker/paxgusdt@ticker",
        );
        ws.onopen = () => {
          reconnectRef.current.binance = 0;
          setStatus("binance", true);
        };
        ws.onclose = () => {
          setStatus("binance", false);
          reconnect("binance", connectBinance);
        };
        ws.onerror = () => ws.close();
        ws.onmessage = (e) => {
          try {
            const msg = JSON.parse(e.data);
            const stream: string = msg.stream ?? "";
            const data = msg.data ?? {};
            if (stream.endsWith("@bookTicker")) {
              patch("binance", {
                bid: parseFloat(data.b),
                ask: parseFloat(data.a),
              });
            } else if (stream.endsWith("@ticker")) {
              patch("binance", {
                last: parseFloat(data.c),
                high_24h: parseFloat(data.h),
                low_24h: parseFloat(data.l),
                change_24h: parseFloat(data.p),
                change_24h_pct: parseFloat(data.P),
                volume_24h: parseFloat(data.v),
              });
            }
          } catch {
            // ignore
          }
        };
        sockets.push(ws);
      } catch {
        reconnect("binance", connectBinance);
      }
    };

    const connectCoinbase = () => {
      try {
        const ws = new WebSocket("wss://ws-feed.exchange.coinbase.com");
        ws.onopen = () => {
          reconnectRef.current.coinbase = 0;
          ws.send(
            JSON.stringify({
              type: "subscribe",
              product_ids: ["PAXG-USD"],
              channels: ["ticker"],
            }),
          );
          setStatus("coinbase", true);
        };
        ws.onclose = () => {
          setStatus("coinbase", false);
          reconnect("coinbase", connectCoinbase);
        };
        ws.onerror = () => ws.close();
        ws.onmessage = (e) => {
          try {
            const msg = JSON.parse(e.data);
            if (msg.type !== "ticker" || msg.product_id !== "PAXG-USD") return;
            const last = parseFloat(msg.price);
            const open = parseFloat(msg.open_24h);
            const change = Number.isFinite(open) && open > 0 ? last - open : 0;
            const changePct =
              Number.isFinite(open) && open > 0 ? ((last - open) / open) * 100 : 0;
            patch("coinbase", {
              last,
              bid: parseFloat(msg.best_bid),
              ask: parseFloat(msg.best_ask),
              high_24h: parseFloat(msg.high_24h),
              low_24h: parseFloat(msg.low_24h),
              volume_24h: parseFloat(msg.volume_24h),
              change_24h: change,
              change_24h_pct: changePct,
            });
          } catch {
            // ignore
          }
        };
        sockets.push(ws);
      } catch {
        reconnect("coinbase", connectCoinbase);
      }
    };

    const connectKraken = () => {
      try {
        const ws = new WebSocket("wss://ws.kraken.com/v2");
        ws.onopen = () => {
          reconnectRef.current.kraken = 0;
          ws.send(
            JSON.stringify({
              method: "subscribe",
              params: { channel: "ticker", symbol: ["PAXG/USD"] },
            }),
          );
          setStatus("kraken", true);
        };
        ws.onclose = () => {
          setStatus("kraken", false);
          reconnect("kraken", connectKraken);
        };
        ws.onerror = () => ws.close();
        ws.onmessage = (e) => {
          try {
            const msg = JSON.parse(e.data);
            if (msg.channel !== "ticker" || !Array.isArray(msg.data)) return;
            const d = msg.data[0];
            if (!d || d.symbol !== "PAXG/USD") return;
            patch("kraken", {
              last: Number(d.last),
              bid: Number(d.bid),
              ask: Number(d.ask),
              high_24h: Number(d.high),
              low_24h: Number(d.low),
              change_24h: Number(d.change),
              change_24h_pct: Number(d.change_pct),
              volume_24h: Number(d.volume),
            });
          } catch {
            // ignore
          }
        };
        sockets.push(ws);
      } catch {
        reconnect("kraken", connectKraken);
      }
    };

    connectBinance();
    connectCoinbase();
    connectKraken();

    return () => {
      stopped = true;
      sockets.forEach((s) => {
        try {
          s.close();
        } catch {
          // ignore
        }
      });
    };
  }, [patch, setStatus]);

  const value = useMemo<LivePrice>(() => {
    const list = Object.values(sources);
    const lasts = list.map((s) => s.last);
    const xau = median(lasts);
    const bid = median(list.map((s) => s.bid));
    const ask = median(list.map((s) => s.ask));
    const high24 = median(list.map((s) => s.high_24h));
    const low24 = median(list.map((s) => s.low_24h));
    const changePct24 = medianSigned(list.map((s) => s.change_24h_pct));
    const change24 = medianSigned(list.map((s) => s.change_24h));
    const totalVol = list.reduce((acc, s) => acc + (s.volume_24h || 0), 0);
    const lastTick = Math.max(...list.map((s) => s.ts), 0);
    const isLive = list.some(
      // eslint-disable-next-line react-hooks/purity
      (s) => s.connected && s.last > 0 && Date.now() - s.ts < 30_000,
    );
    const totalTicks = list.reduce((acc, s) => acc + s.tick_count, 0);
    return {
      xau,
      bid,
      ask,
      high24,
      low24,
      changePct24,
      change24,
      vol24: totalVol > 0 ? totalVol : null,
      isLive,
      lastTick,
      sources: list,
      totalTicks,
    };
  }, [sources]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
