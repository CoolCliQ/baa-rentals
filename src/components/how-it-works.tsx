const steps = [
  {
    numberClass: "bg-primary text-on-primary",
    title: "Choose Your Date & Duration",
    body: "Select hourly, daily, or weekly rental. No rigid drop-off schedules or complicated destination inquiries.",
  },
  {
    numberClass: "bg-secondary text-on-secondary",
    title: "Pick Your Preferred Brand",
    body: "Choose from reliable Ford, Chevy, Toyota, GMC, Jeep, or Nissan vehicles ready on our lot.",
  },
  {
    numberClass: "bg-tertiary-container text-on-tertiary-container",
    title: "Drive Away from Webster",
    body: "Pick up at 301 W Bay Area Blvd. Key handoff in 3 minutes with unlimited Greater Houston local mileage.",
  },
]

export function HowItWorks() {
  return (
    <div className="rounded-card bg-surface-container-low p-4 shadow-sm lg:p-10">
      <div className="mb-4 text-center lg:mb-8">
        <span className="text-label-caps text-primary uppercase">
          Frictionless Process
        </span>
        <h2 className="text-headline-sm font-bold text-on-surface lg:text-headline-lg">
          How Time-Based Rental Works
        </h2>
      </div>
      <ol className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="flex items-start gap-2 lg:gap-3">
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-full text-headline-sm shadow-sm ${step.numberClass}`}
            >
              {index + 1}
            </div>
            <div className="pt-0.5">
              <h3 className="text-[16px] leading-[26px] font-bold text-on-surface">
                {step.title}
              </h3>
              <p className="mt-0.5 text-body-md text-on-surface-variant">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
