import * as Avatar from "@radix-ui/react-avatar";
import { Trash } from "phosphor-react";

import * as Table from "./Table";

interface ProfessorsListTableItemProps {
  id: number;
  name: string;
  email: string;
}

export function ProfessorsListTableItem({
  id,
  name,
  email,
}: ProfessorsListTableItemProps) {
  const initials = name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 3);

  return (
    <tr>
      <Table.Td className="flex">
        <Avatar.Root className="flex items-center justify-center bg-green-500 w-8 h-8 rounded-full">
          <Avatar.Fallback>
            <span className="font-bold text-gray-800">{initials}</span>
          </Avatar.Fallback>
        </Avatar.Root>
        {name}
      </Table.Td>
      <Table.Td>{email}</Table.Td>
      <Table.Td>{id}</Table.Td>
      <Table.Td>
        <Trash size={24} className="text-red-500 cursor-pointer" />
      </Table.Td>
    </tr>
  );
}
