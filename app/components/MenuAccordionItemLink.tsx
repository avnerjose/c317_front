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
      <a className="text-gray-200" href={href}>
        {label}
      </a>
    </li>
  );
}
