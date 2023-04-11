import type { Class } from "../routes/dashboard/disciplines/new";
import { ptBR } from "date-fns/locale";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { SelectGroup } from "./SelectGroup";

interface NewClassPopoverProps {
  onSave: (c: Class) => void;
}

export function NewClassPopover({ onSave }: NewClassPopoverProps) {
  const [weekDay, setWeekDay] = useState(1);
  const [time, setTime] = useState("07:00");

  const weekDays = [...Array(7).keys()]
    .slice(1)
    .map((i) =>
      String(ptBR.localize?.day(i))
        .split("-")
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .join("-")
    )
    .map((item, i) => ({
      value: i + 1,
      label: item,
    }));

  const timeOptions = [...Array(24).keys()]
    .slice(7)
    .map((item) => String(item).padStart(2, "0") + ":00");

  const handleSaveClass = () => {
    const newClass: Class = {
      id: Date.now().toString(),
      weekDay: weekDays.find((item) => item.value === weekDay)!,
      time,
    };

    onSave(newClass);
  };

  return (
    <Popover.Portal>
      <Popover.Content
        side="left"
        className="flex flex-col gap-2 bg-white p-4 rounded-lg drop-shadow-default"
        sideOffset={4}
      >
        <h3 className="text-lg mx-auto">Nova aula</h3>
        <SelectGroup
          label="Dia da semana"
          name="weekday"
          placeholder="Selecione o dia da semana"
          isSmall
          value={weekDay}
          onChange={(e) => setWeekDay(Number(e.target.value))}
        >
          {weekDays.map((weekDay) => (
            <option key={weekDay.label} value={weekDay.value}>
              {weekDay.label}
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
        >
          {timeOptions.map((timeOption) => (
            <option key={timeOption} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </SelectGroup>
        <Popover.Close aria-label="close" className=" mt-3">
          <button
            onClick={handleSaveClass}
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
