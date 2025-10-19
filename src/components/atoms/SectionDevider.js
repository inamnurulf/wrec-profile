export default function SectionDivider({ flip = false }) {
  return (
    <div className={`overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
      <svg
        className="relative block w-full h-16 text-emerald-50"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <path
          d="M321.39,56.44C174.23,85.81,69.03,128.68,0,160V0H1200V27.35C1086.66,62.63,902.29,101,688,95.45,512.86,90.91,406.05,42.47,321.39,56.44Z"
          className="fill-emerald-50"
        ></path>
      </svg>
    </div>
  );
}
