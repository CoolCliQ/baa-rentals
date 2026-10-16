import { BadgeDollarSign, CalendarSync, MapPin, ReceiptText } from "lucide-react"

const props = [
  {
    icon: MapPin,
    iconClass: "bg-secondary-fixed text-secondary",
    title: "Webster Hub",
    body: "301 W Bay Area Blvd near NASA JSC",
  },
  {
    icon: BadgeDollarSign,
    iconClass: "bg-primary-fixed text-primary",
    title: "Flexible Rates",
    body: "Pay only for the hours or days you need",
  },
  {
    icon: ReceiptText,
    iconClass: "bg-surface-container-highest text-tertiary",
    title: "Zero Hidden Fees",
    body: "Instant Texas ID & card verification",
  },
  {
    icon: CalendarSync,
    iconClass: "bg-secondary-fixed-dim text-on-secondary-fixed",
    title: "Free Cancel",
    body: "Cancel up to 1 hr before your pickup",
  },
]

export function ValueProps() {
  return (
    <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 lg:gap-6">
      {props.map(({ icon: Icon, iconClass, title, body }) => (
        <div
          key={title}
          className="flex items-start gap-1 rounded-tile bg-surface-container-lowest p-2 shadow-sm lg:gap-3 lg:p-4"
        >
          <div
            className={`flex size-8 shrink-0 items-center justify-center rounded-full lg:size-10 ${iconClass}`}
          >
            <Icon className="size-[18px] lg:size-5" aria-hidden />
          </div>
          <div>
            <h3 className="text-label-md leading-tight font-bold text-on-surface lg:text-label-lg lg:font-bold">
              {title}
            </h3>
            <p className="mt-0.5 text-[11px] leading-tight text-on-surface-variant lg:text-body-sm">
              {body}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
