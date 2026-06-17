import { CalendarCheck, LayoutDashboard, LineChart, ShoppingBag, type LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/routine", label: "Routine", icon: CalendarCheck },
  { href: "/products", label: "Products", icon: ShoppingBag },
  { href: "/progress", label: "Progress", icon: LineChart },
];
