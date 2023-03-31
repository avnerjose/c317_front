import type { PropsWithChildren } from "react";
import * as Avatar from "@radix-ui/react-avatar";

import * as AppTable from "./Table";
import { Trash } from "phosphor-react";

interface TableProps extends PropsWithChildren {}

export function Table({ children }: TableProps) {
  return (
    <AppTable.Table>
      <AppTable.THead>
        <tr>
          <AppTable.Th>Nome</AppTable.Th>
          <AppTable.Th>E-mail</AppTable.Th>
          <AppTable.Th>Matrícula</AppTable.Th>
          <AppTable.Th>Curso</AppTable.Th>
          <AppTable.Th></AppTable.Th>
        </tr>
      </AppTable.THead>
      <tbody>{children}</tbody>
    </AppTable.Table>
  );
}

interface ItemProps {
  id: number;
  name: string;
  email: string;
  course: string;
}

export function Item({ id, name, email, course }: ItemProps) {
  const initials = name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 3);

  return (
    <tr>
      <AppTable.Td className="flex">
        <Avatar.Root className="flex items-center justify-center bg-green-500 w-8 h-8 rounded-full">
          <Avatar.Fallback>
            <span className="font-bold text-gray-800">{initials}</span>
          </Avatar.Fallback>
        </Avatar.Root>
        {name}
      </AppTable.Td>
      <AppTable.Td>{email}</AppTable.Td>
      <AppTable.Td>{id}</AppTable.Td>
      <AppTable.Td>{course}</AppTable.Td>
      <AppTable.Td>
        <Trash size={24} className="text-red-500 cursor-pointer" />
      </AppTable.Td>
    </tr>
  );
}
