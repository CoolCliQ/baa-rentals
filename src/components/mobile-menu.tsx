"use client"

import { Menu, Phone } from "lucide-react"

import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navItems, site } from "@/lib/site"

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open Menu"
        className="flex size-11 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container lg:hidden"
      >
        <Menu className="size-[22px]" aria-hidden />
      </SheetTrigger>
      <SheetContent side="right" className="bg-surface">
        <SheetHeader className="pt-6">
          <SheetTitle className="text-headline-sm text-on-surface">
            {site.name}
          </SheetTitle>
          <SheetDescription className="text-body-sm text-on-surface-variant">
            {site.address.full}
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <SheetClose
              key={item.id}
              nativeButton={false}
              render={<a href={`#${item.id}`} />}
              className="rounded-full px-4 py-3 text-label-lg text-on-surface transition-colors hover:bg-surface-container"
            >
              {item.label}
            </SheetClose>
          ))}
        </nav>
        <SheetFooter>
          <a
            href={site.phone.href}
            className={cn(buttonVariants({ variant: "brand", size: "pill" }))}
          >
            <Phone aria-hidden />
            Call {site.phone.display}
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
