import { Trash } from "phosphor-react";
import { useRevalidator } from "@remix-run/react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { AppTable } from "../AppTable";
import { AppAvatar } from "../AppAvatar";
import { api } from "~/services/api";
import { convertToPhoneNumberFormat } from "~/utils/convertPhoneNumber";
import { DeleteModal } from "../DeleteModal";

interface ProfessorsListTableItemProps {
  id: number;
  name: string;
  email: string;
  departament: string;
  phone_number: string;
}

export function Item({
  id,
  name,
  email,
  departament,
  phone_number,
}: ProfessorsListTableItemProps) {
  const revalidator = useRevalidator();

  const handleDeleteProfessor = async (professorId: number) => {
    await api.delete(`professor/${professorId}`, {
      method: "DELETE",
    });

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
        <AppTable.Td>{departament}</AppTable.Td>
        <AppTable.Td>{convertToPhoneNumberFormat(phone_number)}</AppTable.Td>
        <AppTable.Td>
          <AlertDialog.Trigger asChild>
            <Trash size={24} className="text-red-500 cursor-pointer" />
          </AlertDialog.Trigger>
        </AppTable.Td>
        <DeleteModal
          id={id}
          entityName="professor"
          name={name}
          onDelete={handleDeleteProfessor}
        />
      </AlertDialog.Root>
    </tr>
  );
}
