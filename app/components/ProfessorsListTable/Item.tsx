import { Trash } from "phosphor-react";
import { useRevalidator } from "@remix-run/react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { AppTable } from "../AppTable";
import { AppAvatar } from "../AppAvatar";
import { api } from "~/services/api";
import { convertToPhoneNumberFormat } from "~/utils/convertPhoneNumber";
import { DeleteModal } from "../DeleteModal";

interface ProfessorsListTableItemProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  professor: {
    id: number;
    name: string;
    email: string;
    departament: string;
    phone_number: string;
  };
}

export function Item({
  professor: { id, name, email, departament, phone_number },
  ...rest
}: ProfessorsListTableItemProps) {
  const revalidator = useRevalidator();

  const handleDeleteProfessor = async (professorId: number | string) => {
    await api.delete(`professor/${professorId}`);

    revalidator.revalidate();
  };

  return (
    <tr {...rest}>
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
            <Trash
              data-test="delete-button"
              size={24}
              className="text-red-500 cursor-pointer"
            />
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
