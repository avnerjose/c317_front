import * as Avatar from "@radix-ui/react-avatar";
import { Trash } from "phosphor-react";
import { AppTable } from "../AppTable";
import { AppAvatar } from "../AppAvatar";

interface ItemProps {
  id: number;
  name: string;
  email: string;
  course: string;
}

export function Item({ id, name, email, course }: ItemProps) {
  return (
    <tr>
      <AppTable.Td className="flex">
        <AppAvatar name={name} isSmall />
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
