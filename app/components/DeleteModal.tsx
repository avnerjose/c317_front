import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Warning } from "phosphor-react";

interface DeleteModalProps {
  id: number | string;
  entityName: string;
  name: string;
  onDelete: (id: number | string) => void;
}

export function DeleteModal({
  entityName,
  name,
  onDelete,
  id,
}: DeleteModalProps) {
  const handleDelete = () => onDelete(id);

  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="absolute inset-0 bg-gray-700 opacity-30" />
      <AlertDialog.Content className="p-4 rounded-lg fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[420px] max-h-[85vh] bg-white">
        <AlertDialog.Title className="text-xl text-center flex flex-col font-bold items-center gap-2">
          <div className="bg-red-200 rounded-full p-2 w-fit">
            <Warning className="text-red-500" size={32} />
          </div>
          <span>Deletar {entityName}</span>
        </AlertDialog.Title>
        <AlertDialog.Description className="text-center my-4">
          Você tem certeza que deseja deletar o {entityName}{" "}
          <strong>{name}</strong>? Essa ação não pode ser desfeita.
        </AlertDialog.Description>
        <div className="flex gap-2 justify-end">
          <AlertDialog.Cancel asChild>
            <button
              data-test="modal-cancel-button"
              className="bg-gray-200 text-grau-900 py-2 px-1 rounded-md w-full hover:bg-gray-500"
            >
              Cancelar
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              data-test="modal-delete-button"
              onClick={handleDelete}
              className="bg-red-500 text-white border py-2 px-1 rounded-md w-full hover:bg-red-200 hover:text-red-500"
            >
              Sim, deletar {entityName}
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  );
}
