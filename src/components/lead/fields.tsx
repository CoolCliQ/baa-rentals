"use client"

import { useState, type ReactNode } from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { format } from "date-fns"
import { CalendarDays, ChevronDown, Clock, Hourglass, type LucideIcon } from "lucide-react"
import { cn } from "cn"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select"
import { durationGroups, timeSlots } from "@/lib/rental"

export const fieldControlClass =
  "flex h-12 w-full items-center gap-2.5 rounded-xl border border-input bg-white px-3.5 text-left text-[15px] text-ink outline-none transition-colors hover:border-navy/40 focus-visible:border-navy focus-visible:ring-3 focus-visible:ring-navy/15 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15"

export function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-semibold text-navy">
        {label}
        {optional && <span className="font-normal text-ink-muted"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function TriggerContent({
  icon: Icon,
  children,
}: {
  icon: LucideIcon
  children: ReactNode
}) {
  return (
    <>
      <Icon className="size-[18px] shrink-0 text-navy-600" aria-hidden />
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {/* Hidden on phones so short values like "10:00 AM" fit the two-column layout. */}
      <ChevronDown className="hidden size-4 shrink-0 text-ink-muted sm:block" aria-hidden />
    </>
  )
}

function PickupCalendar({
  selected,
  onSelect,
}: {
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
}) {
  // Rendered only while the popover is open, so "today" is read in the browser.
  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
      disabled={{ before: new Date() }}
      className="[--cell-size:--spacing(9)]"
    />
  )
}

export function DateField({
  id,
  value,
  onChange,
  error,
}: {
  id: string
  value: Date | undefined
  onChange: (date: Date) => void
  error?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <Field id={id} label="Pickup date" error={error}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(fieldControlClass, !value && "text-ink-muted")}
        >
          <TriggerContent icon={CalendarDays}>
            {value ? format(value, "EEE, MMM d") : "Select date"}
          </TriggerContent>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <PickupCalendar
            selected={value}
            onSelect={(next) => {
              if (next) onChange(next)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

export function TimeField({
  id,
  value,
  onChange,
}: {
  id: string
  value: string
  onChange: (time: string) => void
}) {
  return (
    <Field id={id} label="Pickup time">
      <Select value={value} onValueChange={(next) => next && onChange(next)}>
        <SelectPrimitive.Trigger id={id} className={fieldControlClass}>
          <TriggerContent icon={Clock}>
            <SelectPrimitive.Value />
          </TriggerContent>
        </SelectPrimitive.Trigger>
        <SelectContent alignItemWithTrigger={false} align="start" className="max-h-64">
          {timeSlots.map((slot) => (
            <SelectItem key={slot} value={slot}>
              {slot}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}

export function DurationField({
  id,
  value,
  onChange,
  error,
}: {
  id: string
  value: string | undefined
  onChange: (duration: string) => void
  error?: string
}) {
  return (
    <Field id={id} label="How long?" error={error}>
      <Select value={value ?? null} onValueChange={(next) => next && onChange(next)}>
        <SelectPrimitive.Trigger
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(fieldControlClass, !value && "text-ink-muted")}
        >
          <TriggerContent icon={Hourglass}>
            <SelectPrimitive.Value placeholder="Select duration" />
          </TriggerContent>
        </SelectPrimitive.Trigger>
        <SelectContent alignItemWithTrigger={false} align="start" className="max-h-72">
          {durationGroups.map((group) => (
            <SelectGroup key={group.label}>
              <SelectLabel>{group.label}</SelectLabel>
              {group.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}
