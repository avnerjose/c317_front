import { Link } from "@remix-run/react";

interface MenuAccordionItemLinkProps {
  href: string;
  label: string;
}

export function MenuAccordionItemLink({
  href,
  label,
}: MenuAccordionItemLinkProps) {
  return (
    <li className="px-6 py-2 rounded-lg">
      <Link className="text-gray-200" to={href}>
        {label}
      </Link>
    </li>
  );
}
