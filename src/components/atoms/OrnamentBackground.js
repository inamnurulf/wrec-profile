
import React from "react";


export default function OrnamentBackground({ className }) {
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 -z-10",
        className,
      ].filter(Boolean).join(" ")}
    >
      {/* dotted grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.200/50)_1px,transparent_0)] bg-[length:20px_20px]" />
      {/* soft blobs */}
      <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-sky-200/30 blur-3xl" />
    </div>
  );
}
