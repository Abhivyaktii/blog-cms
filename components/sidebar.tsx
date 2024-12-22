"use client"

import { FileText, Settings, PlusCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      icon: FileText,
      text: "Posts",
    },
    {
      href: "/settings",
      icon: Settings,
      text: "Settings",
    },
  ]

  return (
    <div className="pb-12 min-h-screen w-64 border-r">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-6 px-4 text-lg font-semibold">Blog CMS</h2>
          <div className="space-y-1">
            <Link href="/new">
              <Button className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>
          <nav className="mt-6 flex flex-col space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  pathname === route.href
                    ? "bg-accent"
                    : "hover:bg-accent/50 transition-colors"
                )}
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}