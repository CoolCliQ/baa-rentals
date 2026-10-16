"use client"

import { useState } from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { format } from "date-fns"
import { ArrowRight, BadgeCheck, Calendar as CalendarIcon, Clock, Timer } from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem } from "@/components/ui/select"

type Mode = "hourly" | "daily" | "weekly"

const modes: Record<
  Mode,
  { tab: string; label: string; options: { label: string; summary: string }[]; initial: string }
> = {
  hourly: {
    tab: "Hourly",
    label: "Select Rental Hours:",
    options: [
      { label: "2 Hours", summary: "2 Hours" },
      { label: "4 Hours", summary: "4 Hours" },
      { label: "8 Hours", summary: "8 Hours" },
      { label: "12 Hours", summary: "12 Hours" },
      { label: "Custom +", summary: "Custom Hours" },
    ],
    initial: "4 Hours",
  },
  daily: {
    tab: "Daily",
    label: "Select Rental Days:",
    options: [
      { label: "1 Day", summary: "1 Day" },
      { label: "2 Days", summary: "2 Days" },
      { label: "3 Days", summary: "3 Days" },
      { label: "5 Days", summary: "5 Days" },
      { label: "7+ Days", summary: "7+ Days" },
    ],
    initial: "2 Days",
  },
  weekly: {
    tab: "Weekly",
    label: "Select Rental Weeks:",
    options: [
      { label: "1 Week", summary: "1 Week" },
      { label: "2 Weeks", summary: "2 Weeks" },
      { label: "1 Month", summary: "1 Month" },
    ],
    initial: "1 Week",
  },
}

// Pick-up slots every 30 minutes, 7:30 AM through 7:30 PM.
const timeSlots = Array.from({ length: 25 }, (_, i) => {
  const minutes = 7 * 60 + 30 + i * 30
  const hour = Math.floor(minutes / 60)
  const label = `${hour % 12 || 12}:${minutes % 60 === 0 ? "00" : "30"} ${hour < 12 ? "AM" : "PM"}`
  return { label, hour }
})

function partOfDay(time: string) {
  const hour = timeSlots.find((slot) => slot.label === time)?.hour ?? 10
  if (hour < 12) return "morning"
  if (hour < 17) return "afternoon"
  return "evening"
}

const fieldClass =
  "flex w-full flex-col justify-center rounded-tile bg-surface-container-low p-2 text-left outline-none transition-colors hover:bg-surface-container focus-visible:ring-2 focus-visible:ring-primary/30 lg:p-3"
const fieldLabelClass =
  "flex items-center gap-1 text-label-caps text-on-surface-variant"

function StartDateCalendar({
  selected,
  onSelect,
}: {
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
}) {
  return (
    <Calendar
      mode="single"
      className="[--cell-size:--spacing(9)]"
      selected={selected}
      onSelect={onSelect}
      disabled={{ before: new Date() }}
    />
  )
}

export function BookingConsole() {
  const [mode, setMode] = useState<Mode>("hourly")
  const [durations, setDurations] = useState<Record<Mode, string>>({
    hourly: modes.hourly.initial,
    daily: modes.daily.initial,
    weekly: modes.weekly.initial,
  })
  const [date, setDate] = useState<Date>()
  const [dateOpen, setDateOpen] = useState(false)
  const [time, setTime] = useState("10:00 AM")

  const current = modes[mode]

  return (
    <div className="flex h-full w-full flex-col rounded-card bg-surface-container-lowest p-4 shadow-xl lg:p-8">
      <div className="mb-2 flex items-center justify-between lg:mb-4">
        <div>
          <span className="text-label-caps tracking-wider text-primary uppercase">
            Fast Flexible Booking
          </span>
          <h2 className="text-headline-sm text-on-surface lg:text-headline-md">
            Rent by the Hour, Day, or Week
          </h2>
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Timer className="size-5" aria-hidden />
        </div>
      </div>

      <div
        role="group"
        aria-label="Rental type"
        className="mb-4 grid grid-cols-3 gap-1 rounded-full bg-surface-container-low p-1"
      >
        {(Object.keys(modes) as Mode[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={mode === key}
            onClick={() => setMode(key)}
            className={cn(
              "rounded-full px-1 py-2 text-center text-label-md transition-all",
              mode === key
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            {modes[key].tab}
          </button>
        ))}
      </div>

      <div className="mb-2 grid grid-cols-2 gap-1 lg:mb-4 lg:gap-3">
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger className={fieldClass}>
            <span className={fieldLabelClass}>
              <CalendarIcon className="size-3.5 text-primary" aria-hidden />
              START DATE
            </span>
            <span className="mt-0.5 text-label-lg font-bold text-on-surface">
              {date ? format(date, "MMM d, yyyy") : "Select date"}
            </span>
            <span className="text-[11px] text-on-surface-variant">
              {date ? `${format(date, "EEEE")} ${partOfDay(time)}` : "Tap to choose"}
            </span>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <StartDateCalendar
              selected={date}
              onSelect={(next) => {
                setDate(next)
                setDateOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>

        <Select value={time} onValueChange={(next) => next && setTime(next)}>
          <SelectPrimitive.Trigger className={fieldClass}>
            <span className={fieldLabelClass}>
              <Clock className="size-3.5 text-primary" aria-hidden />
              START TIME
            </span>
            <SelectPrimitive.Value className="mt-0.5 text-label-lg font-bold text-on-surface" />
            <span className="text-[11px] text-on-surface-variant">Pick-up ready</span>
          </SelectPrimitive.Trigger>
          <SelectContent alignItemWithTrigger={false} align="start" className="max-h-64">
            {timeSlots.map((slot) => (
              <SelectItem key={slot.label} value={slot.label}>
                {slot.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span id="duration-label" className="text-label-md text-on-surface">
            {current.label}
          </span>
          <span aria-live="polite" className="text-[11px] font-semibold text-primary">
            {durations[mode]} selected
          </span>
        </div>
        <div role="group" aria-labelledby="duration-label" className="flex flex-wrap gap-1.5">
          {current.options.map((option) => {
            const active = durations[mode] === option.summary
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setDurations((prev) => ({ ...prev, [mode]: option.summary }))
                }
                className={cn(
                  "rounded-full px-3 py-1.5 text-label-md transition-colors",
                  active
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      <a
        href="#fleet"
        className={cn(buttonVariants({
          variant: "brand",
          size: "pill-lg",
          className: "mt-auto w-full active:scale-[0.99]",
        }))}
      >
        <span>Calculate Rate &amp; Reserve</span>
        <ArrowRight aria-hidden />
      </a>

      <div className="mt-2 flex items-start gap-2 pt-1 text-on-surface-variant">
        <BadgeCheck className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />
        <p className="text-[11px] leading-tight">
          Simple time-based rentals. Drive anywhere in the Greater Houston &amp;
          Galveston Bay Area with unlimited local mileage.
        </p>
      </div>
    </div>
  )
}
