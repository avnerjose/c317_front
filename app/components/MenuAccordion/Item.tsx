import * as Accordion from "@radix-ui/react-accordion";
import type { IconProps } from "phosphor-react";
import { CaretRight } from "phosphor-react";

interface ItemProps {
  value: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  children: React.ReactNode;
}

export function Item({ value, label, icon: Icon, children }: ItemProps) {
  return (
    <Accordion.Item value={value}>
      <Accordion.AccordionTrigger className="flex w-full items-center gap-2 px-8 pt-5 pb-2 text-white group">
        <Icon size={24} />
        <span>{label}</span>
        <CaretRight
          className="group-data-[state=open]:rotate-90 transition ml-auto"
          size={24}
          aria-hidden
        />
      </Accordion.AccordionTrigger>
      <Accordion.AccordionContent className="mx-8 transition">
        <ul className="flex flex-col gap-2">{children}</ul>
      </Accordion.AccordionContent>
    </Accordion.Item>
  );
}
