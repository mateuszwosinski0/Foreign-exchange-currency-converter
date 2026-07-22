function formatDate(date) {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function exportCsv(logs) {
  const headers = ["From", "To", "Amount", "Result", "Rate", "Date"];

  const rows = logs.map((conversion) =>
    [
      conversion.from,
      conversion.to,
      conversion.amount,
      conversion.result,
      conversion.rate,
      formatDate(conversion.date),
    ].join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "conversion-log.csv";
  link.click();

  URL.revokeObjectURL(url);
}