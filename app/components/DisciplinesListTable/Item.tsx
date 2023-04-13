import { Trash } from "phosphor-react";
import { AppTable } from "../AppTable";
import { AppAvatar } from "../AppAvatar";

interface ItemProps {
  code: string;
  name: string;
  professor: string;
}

export function Item({ code, name, professor }: ItemProps) {
  return (
    <tr>
      <AppTable.Td>{name}</AppTable.Td>
      <AppTable.Td>{code}</AppTable.Td>
      <AppTable.Td className="flex">
        <AppAvatar name={professor} isSmall/>
        {professor}
      </AppTable.Td>
      <AppTable.Td>
        <Trash size={24} className="text-red-500 cursor-pointer" />
      </AppTable.Td>
    </tr>
  );
}
