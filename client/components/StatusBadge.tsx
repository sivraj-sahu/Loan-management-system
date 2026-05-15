export default function StatusBadge({
  status,
}: {
  status: string;
}) {
  let styles = "";

  switch (status) {
    case "APPLIED":
      styles =
        "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      break;

    case "SANCTIONED":
      styles =
        "bg-blue-500/20 text-blue-400 border-blue-500/30";
      break;

    case "DISBURSED":
      styles =
        "bg-green-500/20 text-green-400 border-green-500/30";
      break;

    case "CLOSED":
      styles =
        "bg-zinc-500/20 text-zinc-300 border-zinc-500/30";
      break;

    default:
      styles =
        "bg-zinc-700 text-white border-zinc-600";
  }

  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${styles}`}
    >
      {status}
    </span>
  );
}