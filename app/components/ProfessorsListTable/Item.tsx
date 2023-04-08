import * as Avatar from "@radix-ui/react-avatar";
import { Trash } from "phosphor-react";

import { AppTable } from "../AppTable";

interface ProfessorsListTableItemProps {
  id: number;
  name: string;
  email: string;
}

export function Item({ id, name, email }: ProfessorsListTableItemProps) {
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
      <AppTable.Td>
        <Trash size={24} className="text-red-500 cursor-pointer" />
      </AppTable.Td>
    </tr>
  );
}
