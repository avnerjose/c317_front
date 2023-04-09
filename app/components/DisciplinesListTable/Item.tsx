import { Trash } from "phosphor-react";
import * as Avatar from "@radix-ui/react-avatar";
import { AppTable } from "../AppTable";

interface ItemProps {
  code: string;
  name: string;
  professor: string;
}

export function Item({ code, name, professor }: ItemProps) {
  const initials = professor
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 3);

  return (
    <tr>
      <AppTable.Td>{name}</AppTable.Td>
      <AppTable.Td>{code}</AppTable.Td>
      <AppTable.Td className="flex">
        <Avatar.Root className="flex items-center justify-center bg-green-500 w-8 h-8 rounded-full">
          <Avatar.Fallback>
            <span className="font-bold text-gray-800">{initials}</span>
          </Avatar.Fallback>
        </Avatar.Root>
        {professor}
      </AppTable.Td>
      <AppTable.Td>
        <Trash size={24} className="text-red-500 cursor-pointer" />
      </AppTable.Td>
    </tr>
  );
}
