import type { Professor } from "~/routes/dashboard/professors/list";
import type { Class } from "~/routes/dashboard/subjects/new";
import { Trash } from "phosphor-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useRevalidator } from "@remix-run/react";

import { AppTable } from "../AppTable";
import { AppAvatar } from "../AppAvatar";
import { api } from "~/services/api";
import { DeleteModal } from "../DeleteModal";

interface ItemProps {
  id: string;
  name: string;
  professor: Professor | null;
  classes: Class[];
}

export function Item({ id, name, professor, classes }: ItemProps) {
  const revalidator = useRevalidator();

  const handleDeleteProfessor = async (subjectId: number | string) => {
    try {
      await api.delete(`/subject/${subjectId}`);

      revalidator.revalidate();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <tr>
      <AlertDialog.Root>
        <AppTable.Td>{name}</AppTable.Td>
        <AppTable.Td>{id}</AppTable.Td>
        <AppTable.Td>
          <div className="flex items-center gap-2">
            <AppAvatar name={professor?.name ?? "Não encontrado"} isSmall />
            {professor?.name ?? "Não encontrado"}
          </div>
        </AppTable.Td>
        <AppTable.Td>
          <ul className="list-disc flex flex-col ml-4 text-gray-700 marker:text-green-500">
            {classes.map((item) => (
              <li key={item.id}>
                {item.day} - {item.time}
              </li>
            ))}
          </ul>
        </AppTable.Td>
        <AppTable.Td>
          <AlertDialog.Trigger asChild>
            <Trash size={24} className="text-red-500 cursor-pointer" />
          </AlertDialog.Trigger>
        </AppTable.Td>
        <DeleteModal
          id={id}
          entityName="disciplina"
          name={`${name} - ${id}`}
          onDelete={handleDeleteProfessor}
        />
      </AlertDialog.Root>
    </tr>
  );
}
