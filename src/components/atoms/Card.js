export default function Card({ icon, title, desc }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 inline-flex rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200 group-hover:ring-emerald-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold leading-tight">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}
