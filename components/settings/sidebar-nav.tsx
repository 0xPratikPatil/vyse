"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    items?: { href: string; title: string }[]; // Optional sub-items for dropdown
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <nav
      className={cn(
        "flex flex-col overflow-x-auto whitespace-nowrap max-w-xs",
        className
      )}
      {...props}
    >
      <div className="flex md:flex-col">
        {items.map((item) => (
          <div key={item.href} className="flex-shrink-0">
            <Link
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start text-sm md:text-base"
              )}
              onClick={
                item.items
                  ? (e) => {
                      e.preventDefault();
                      toggleDropdown(item.title);
                    }
                  : undefined
              }
            >
              {item.title}
            </Link>
            {item.items && openDropdown === item.title && (
              <div className="pl-4 flex flex-col space-y-1">
                {item.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      pathname === subItem.href
                        ? "bg-muted hover:bg-muted"
                        : "hover:bg-transparent hover:underline",
                      "justify-start text-sm md:text-base"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
