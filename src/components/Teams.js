import Section from "./atoms/Section";

export default function Team() {
  const members = [
    {
      name: "Prof. Sigit Supadmo Hanggar",
      role: "Advisor",
    },
    { name: "Muhamad Khoiru Zaki, Ph.D", role: "Head of Climate Resources Division" },
    {
      name: "Ganara Mawandha, Ph.D",
      role: "Head of Water Resources Division",
    },
    {
      name: "Yunita Nur Azizah, S.T.P",
      role: "Research and Publication Division",
    },
    {
      name: "Nindya Marsya Larasati, S.Sos ",
      role: "Community Engagement& Outreach Division",
    },
    {
      name: "Issiami Nursafa, S.T.P",
      role: "Research and Publication Division",
    },
  ];

  return (
    <Section
      id="team"
      eyebrow="Meet Our Team"
      title="Researchers with diverse expertise"
      desc="Dedicated to addressing sustainability and environmental resilience challenges."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <div
            key={m.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700 font-semibold">
                {m.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold leading-tight">{m.name}</p>
                <p className="text-sm text-slate-600">{m.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
