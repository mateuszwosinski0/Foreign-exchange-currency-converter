import { readStoredList, writeStoredList, isConversion } from "@/utils/storage";
import { useEffect, useState } from "react";

const STORAGE_KEY = "conversion-log";

export default function useConversionLog() {
  const [logs, setLogs] = useState(() =>
    readStoredList(STORAGE_KEY, isConversion).slice(0, 20)
  );
  useEffect(() => {
    writeStoredList(STORAGE_KEY, logs);
  }, [logs]);

  function addConversion(conversion) {
    if (!isConversion(conversion)) return;
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