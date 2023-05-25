import type { Dayjs } from "dayjs";
import * as Popover from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { SelectGroup } from "./SelectGroup";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ClientOnly } from "remix-utils";
import { InputGroup } from "./InputGroup";
import { z } from "zod";
import { generateFormErrors } from "~/utils/generateFormErrors";

type Exam = {
  date: number;
  code: string;
};

interface NewExamPopoverProps {
  onSave: (c: Exam) => void;
  onClose: () => void;
}

export function NewExamPopover({ onSave, onClose }: NewExamPopoverProps) {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState("07:00");
  const [code, setCode] = useState("");
  const [formErrors, setFormErrors] = useState<{
    code: string | undefined;
    date: string | undefined;
  } | null>(null);

  const timeOptions = [...Array(24).keys()]
    .slice(7)
    .map((item) => String(item).padStart(2, "0") + ":00");

  const handleSaveExam = () => {
    const newExamSchema = z.object({
      date: z
        .number({
          invalid_type_error: "Data inválida",
        })
        .refine((number) => dayjs(number).isValid(), {
          message: "Data inválida",
        }),
      code: z.string().nonempty("Nome é obrigatório"),
    });

    const newExam = newExamSchema.safeParse({
      date: date?.toDate().getTime(),
      code,
    });

    if (!newExam.success) {
      const errors = generateFormErrors(newExam.error);
      setFormErrors(errors);
      return;
    }

    onSave(newExam.data);
    onClose();
  };

  const handleChangeDateTime = (time: string) => {
    const [hour, minute] = time.split(":");

    const newDate = dayjs(date)
      .set("hour", Number(hour))
      .set("minute", Number(minute));

    setDate(newDate);
    setTime(time);
  };

  useEffect(() => {
    handleChangeDateTime(time);
  }, []);

  return (
    <Popover.Portal>
      <Popover.Content
        side="left"
        className="flex flex-col gap-2 bg-white p-4 rounded-lg drop-shadow-default"
        sideOffset={4}
        onEscapeKeyDown={onClose}
        onPointerDownOutside={onClose}
      >
        <h3 className="text-lg mx-auto">Nova avaliação</h3>

        <ClientOnly fallback={null}>
          {() => (
            <>
              <label htmlFor="">Data</label>
              <DatePicker
                value={date}
                onChange={(value) => setDate(value)}
                defaultValue={dayjs(new Date())}
              />
              {formErrors?.date && (
                <span className="text-sm text-red-500 mt-2">
                  {formErrors.date}
                </span>
              )}
              <SelectGroup
                label="Horário"
                name="time"
                value={time}
                isSmall
                placeholder="Selecione o horário"
                onChange={(e) => handleChangeDateTime(e.target.value)}
              >
                {timeOptions.map((timeOption) => (
                  <option key={timeOption} value={timeOption}>
                    {timeOption}
                  </option>
                ))}
              </SelectGroup>
              <InputGroup
                label="Nome"
                name="code"
                isSmall
                placeholder="Digite o nome da avaliação"
                error={formErrors?.code}
                onChange={(e) => setCode(e.target.value)}
              />
            </>
          )}
        </ClientOnly>
        <Popover.Close aria-label="close" className="mt-3" asChild>
          <button
            onClick={handleSaveExam}
            className="bg-green-500 hover:bg-green-700 rounded-lg w-full text-white font-bold py-2 "
          >
            Salvar
          </button>
        </Popover.Close>
        <Popover.Arrow width={16} height={8} className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  );
}
