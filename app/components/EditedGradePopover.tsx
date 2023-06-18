import type { Exam } from "~/routes/dashboard/subjects/manage/$id";
import * as Popover from "@radix-ui/react-popover";

interface EditedGradePopoverProps {
  exam: Exam;
  onClose: () => void;
  onDiscardChanges: (examId: string | number) => void;
}

export function EditedGradePopover({
  onClose,
  onDiscardChanges,
  exam,
}: EditedGradePopoverProps) {
  const handleSaveClass = () => {};

  return (
    <Popover.Portal>
      <Popover.Content
        side="left"
        className="flex flex-col items-center gap-2 bg-white p-4 rounded-lg drop-shadow-default max-w-[420px]"
        sideOffset={4}
        onEscapeKeyDown={onClose}
        onPointerDownOutside={onClose}
      >
        <h3 className="text-lg font-bold">Publicar notas</h3>
        <p className="text-center">
          As notas desta disciplina foram alteradas, publique as notas para
          salvar as alterações.
        </p>
        <div className="flex items-center gap-2 w-full">
          <Popover.Close aria-label="close" className="mt-3" asChild>
            <button
              onClick={() => onDiscardChanges(exam.id)}
              className="bg-gray-200 outline-red-500 rounded-lg w-full text-red-500 font-bold py-2 border border-red-500"
              data-test="new-class-save"
            >
              Descartar mudanças
            </button>
          </Popover.Close>
          <Popover.Close aria-label="close" className="mt-3" asChild>
            <button
              onClick={handleSaveClass}
              className="bg-green-500 hover:bg-green-700 rounded-lg w-full text-white font-bold py-2 "
              data-test="new-class-save"
            >
              Publicar
            </button>
          </Popover.Close>
        </div>
        <Popover.Arrow width={16} height={8} className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  );
}
