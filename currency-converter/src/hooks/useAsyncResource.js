import { useEffect, useEffectEvent, useState } from "react";

export default function useAsyncResource(key, load, refreshMs = 0) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);
  const requestKey = JSON.stringify([key, attempt]);
  const loadLatest = useEffectEvent(load);

  useEffect(() => {
    const controller = new AbortController();
    let pending = false;
    async function run() {
      if (pending) return;
      pending = true;
      try {
        const data = await loadLatest(controller.signal);
        if (!controller.signal.aborted) setResult({ key: requestKey, data, error: "" });
      } catch (error) {
        if (!controller.signal.aborted) {
          setResult({ key: requestKey, data: null, error: error.message || "Could not load data." });
        }
      } finally {
        pending = false;
      }
    }
    run();
    const timer = refreshMs ? setInterval(run, refreshMs) : null;
    return () => {
      controller.abort();
      if (timer) clearInterval(timer);
    };
  }, [requestKey, refreshMs]);

  const current = result?.key === requestKey ? result : null;
  return {
    data: current?.data ?? null,
    error: current?.error ?? "",
    isLoading: !current,
    retry: () => setAttempt((value) => value + 1),
  };
}
