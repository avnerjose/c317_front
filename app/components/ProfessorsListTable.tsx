import * as Avatar from "@radix-ui/react-avatar";
import { Trash } from "phosphor-react";
import * as AppTable from "./Table";

interface ProfessorsListTableProps {
  children: React.ReactNode;
}

export function Table({ children }: ProfessorsListTableProps) {
  return (
    <AppTable.Table>
      <AppTable.THead>
        <tr>
          <AppTable.Th>Nome</AppTable.Th>
          <AppTable.Th>Email</AppTable.Th>
          <AppTable.Th>Matrícula</AppTable.Th>
          <AppTable.Th></AppTable.Th>
        </tr>
      </AppTable.THead>
      <tbody>{children}</tbody>
    </AppTable.Table>
  );
}



interface ProfessorsListTableItemProps {
  id: number;
  name: string;
  email: string;
}

export function Item({
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
