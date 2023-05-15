import { Trash } from "phosphor-react";
import { useRevalidator } from "@remix-run/react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AppTable } from "../AppTable";
import { AppAvatar } from "../AppAvatar";
import { DeleteModal } from "../DeleteModal";
import { api } from "~/services/api";

interface ItemProps {
  id: number;
  name: string;
  email: string;
  course: string;
}

export function Item({ id, name, email, course }: ItemProps) {
  const revalidator = useRevalidator();

  const handleDeleteProfessor = async (studentId: number | string) => {
    await api.delete(`student/${studentId}`);

    revalidator.revalidate();
  };

  return (
    <tr>
      <AlertDialog.Root>
        <AppTable.Td className="flex">
          <AppAvatar name={name} isSmall />
          {name}
        </AppTable.Td>
        <AppTable.Td>{email}</AppTable.Td>
        <AppTable.Td>{id}</AppTable.Td>
        <AppTable.Td>{course}</AppTable.Td>
        <AppTable.Td>
          <AlertDialog.Trigger asChild>
            <Trash size={24} className="text-red-500 cursor-pointer" />
          </AlertDialog.Trigger>
        </AppTable.Td>
        <DeleteModal
          id={id}
          entityName="estudante"
          name={name}
          onDelete={handleDeleteProfessor}
        />
      </AlertDialog.Root>
    </tr>
  );
}
