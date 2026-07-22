import { useEffect, useState } from "react";

const STORAGE_KEY = "conversion-log";

export default function useConversionLog() {
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  function addConversion(conversion) {
    setLogs((previous) =>
      [conversion, ...previous].slice(0, 20)
    );
  }

  function removeConversion(id) {
    setLogs((previous) =>
      previous.filter((conversion) => conversion.id !== id)
    );
  }

  function clearLog() {
    setLogs([]);
  }

  return {
    logs,
    addConversion,
    removeConversion,
    clearLog,
  };
}