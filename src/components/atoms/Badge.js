import { TagIcon } from "lucide-react";
import classNames from "@/helper/className";

export default function Badge({ children, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs",
        active
          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      )}
    >
      <TagIcon className="h-3.5 w-3.5" /> {children}
    </button>
  );
}
