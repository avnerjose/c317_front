import { NavLink } from "@remix-run/react";
import clsx from "clsx";

interface MenuAccordionItemLinkProps {
  href: string;
  label: string;
}

export function MenuAccordionItemLink({
  href,
  label,
}: MenuAccordionItemLinkProps) {
  return (
    <li className="flex ml-4 rounded-lg">
      <NavLink
        className={({ isActive }) =>
          clsx("text-gray-200 py-2 px-4 rounded-lg", {
            "bg-green-500 font-semibold": isActive,
            "bg-gray-800": !isActive,
          })
        }
        to={href}
      >
        {label}
      </NavLink>
    </li>
  );
}
