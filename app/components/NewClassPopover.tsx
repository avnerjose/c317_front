import type { Class } from "../routes/dashboard/subjects/new";
import { ptBR } from "date-fns/locale";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { SelectGroup } from "./SelectGroup";

interface NewClassPopoverProps {
  onSave: (c: Class) => void;
  onClose: () => void;
  classesList: Class[];
}

export function NewClassPopover({
  onSave,
  onClose,
  classesList,
}: NewClassPopoverProps) {
  const [day, setWeekDay] = useState("Segunda-Feira");
  const [time, setTime] = useState("07:00");
  const [formError, setFormError] = useState("");

  const days = [...Array(7).keys()].slice(1).map((i) =>
    String(ptBR.localize?.day(i))
      .split("-")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join("-")
  );

  const timeOptions = [...Array(24).keys()]
    .slice(7)
    .map((item) => String(item).padStart(2, "0") + ":00");

  const handleSaveClass = () => {
    setFormError("");
    const newClass = {
      day: days.find((item) => item === day)!,
      time,
    } as Class;

    const classAlreadyExists = !!classesList.find(
      (item) => item.time === newClass.time && item.day === newClass.day
    );

    if (classAlreadyExists) {
      setFormError("Já existe uma aula cadastrada nesse horário");
      return;
    }

    onSave(newClass);
    onClose();
  };

  return (
    <Popover.Portal>
      <Popover.Content
        side="left"
        className="flex flex-col gap-2 bg-white p-4 rounded-lg drop-shadow-default"
        sideOffset={4}
        onEscapeKeyDown={onClose}
        onPointerDownOutside={onClose}

      >
        <h3 className="text-lg mx-auto">Nova aula</h3>
        {formError && (
          <div className="bg-red-200 p-1 rounded-smC">
            <p className="text-red-500 text-sm text-center">{formError}</p>
          </div>
        )}

        <SelectGroup
          label="Dia da semana"
          name="weekday"
          placeholder="Selecione o dia da semana"
          isSmall
          value={day}
          onChange={(e) => setWeekDay(e.target.value)}
          data-test="new-class-weekday"
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </SelectGroup>
        <SelectGroup
          label="Horário"
          name="time"
          value={time}
          isSmall
          placeholder="Selecione o horário"
          onChange={(e) => setTime(e.target.value)}
          data-test="new-class-time"
        >
          {timeOptions.map((timeOption) => (
            <option key={timeOption} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </SelectGroup>
        <Popover.Close aria-label="close" className="mt-3" asChild>
          <button
            onClick={handleSaveClass}
            className="bg-green-500 hover:bg-green-700 rounded-lg w-full text-white font-bold py-2 "
            data-test="new-class-save"
          >
            Salvar
          </button>
        </Popover.Close>
        <Popover.Arrow width={16} height={8} className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  );
}
