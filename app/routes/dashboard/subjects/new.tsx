import type { FormMethod } from "@remix-run/react";
import type { ActionArgs, MetaFunction } from "@remix-run/node";
import type { ActionMeta } from "react-select";

import React, { useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { Plus } from "phosphor-react";
import * as Popover from "@radix-ui/react-popover";
import { ClientOnly } from "remix-utils";
import { z } from "zod";

import { InputGroup } from "~/components/InputGroup";
import { NewClassPopover } from "~/components/NewClassPopover";
import { PageCard } from "~/components/PageCard";
import { MultipleSelectGroup } from "~/components/MultipleSelectGroup";
import { SelectGroup } from "~/components/SelectGroup";
import { Button } from "~/components/Button";
import { generateFormErrors } from "~/utils/generateFormErrors";
import { api } from "~/services/api";
import clsx from "clsx";

export type Class = {
  id: string;
  day: string;
  time: string;
};

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
};

type Professor = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  departament: string;
};

export const meta: MetaFunction = () => ({
  title: "Cadastrar disciplina",
});

export const loader = async () => {
  const { data: students } = await api.get<Student[]>("/student");
  const { data: professors } = await api.get<Professor[]>("/professor");

  return json({
    students,
    professors,
  });
};

export const action = async ({ request }: ActionArgs) => {
  const data = Object.fromEntries(await request.formData());
  const newSubjectSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    id: z
      .string()
      .nonempty("Código é obrigatório")
      .max(4, "O código deve ter no máximo 4 caracteres")
      .toUpperCase(),
    professorId: z.number({
      coerce: true,
      invalid_type_error: "Professor inválido",
    }),
    classes: z.preprocess(
      (val) => JSON.parse(String(val)),
      z
        .array(
          z.object({
            day: z.string(),
            time: z.string(),
          })
        )
        .min(1, "É necessário cadastrar ao menos uma aula")
        .refine((classes) => {
          const noRepeats = new Set(
            classes.map((item) => `${item.day} - ${item.time}`)
          );

          return noRepeats.size === classes.length;
        }, "Não é possível cadastrar aulas repetidas")
    ),
    students: z.preprocess(
      (val) => JSON.parse(String(val)),
      z
        .array(
          z.number({
            coerce: true,
          })
        )
        .min(1, "É necessário cadastrar ao menos um aluno")
    ),
  });

  const newSubject = newSubjectSchema.safeParse(data);

  if (!newSubject.success) {
    return json({
      errors: generateFormErrors(newSubject.error),
    });
  }

  await api.post("/subject", {
    subject: {
      id: newSubject.data.id,
      name: newSubject.data.name,
    },
  });

  await api.patch(`/subject/${newSubject.data.id}`, {
    professor_id: newSubject.data.professorId,
    student_id: newSubject.data.students.map((student) => student),
  });

  newSubject.data.classes.forEach(async (c) => {
    await api.post("/class_schedule", {
      class_schedule: {
        day: c.day,
        time: c.time,
        subject_id: newSubject.data.id,
      },
    });
  });

  return redirect("/dashboard");
};

function NewSubject() {
  const { students: studentsList, professors: professorsList } = useLoaderData<
    typeof loader
  >();
  const data = useActionData<typeof action>();
  const submit = useSubmit();
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [professorId, setProfessorId] = useState("");
  const [isNewClassPopoverOpen, setIsNewClassPopoverOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.set("classes", JSON.stringify(classes));
    formData.set("students", JSON.stringify(students.map((item) => item.id)));

    submit(formData, {
      method: (form.getAttribute("method") as FormMethod) ?? "post",
    });
  };

  const addNewClass = (c: Class) => {
    setClasses((prev) => [...prev, c]);
  };

  const classesSelectOnChange = (v: any, actionMeta: ActionMeta<Class>) => {
    switch (actionMeta.action) {
      case "remove-value":
        const removedValue = actionMeta.removedValue;
        const newClassesArray = classes.filter(
          (item) => item.id !== removedValue.id
        );
        setClasses(newClassesArray);
        return;
      case "clear":
        setClasses([]);
        return;
    }
  };

  return (
    <>
      <h1 className="text-xl text-gray-800">
        Disciplinas / Cadastrar disciplina
      </h1>
      <PageCard title="Cadastrar disciplina">
        <Form
          className="flex flex-col items-end px-16 py-8"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <InputGroup
                label="Nome"
                name="name"
                placeholder="Digite o nome da disciplina"
                error={data?.errors?.name}
              />
              <InputGroup
                label="Código"
                name="id"
                placeholder="Digite o código da disciplina ex: C202"
                error={data?.errors?.id}
              />
              <SelectGroup
                label="Professor"
                name="professorId"
                error={data?.errors?.professorId}
                value={professorId}
                onChange={(e) => setProfessorId(e.target.value)}
                className={clsx({
                  "text-gray-500": professorId === "",
                })}
              >
                <option value="" disabled>
                  Selecione o professor da disciplina
                </option>
                {professorsList.map((professor) => (
                  <option
                    className="text-gray-800"
                    key={professor.id}
                    value={professor.id}
                  >
                    {professor.name}
                  </option>
                ))}
              </SelectGroup>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-end gap-2 w-[min(450px,100%)]">
                <ClientOnly fallback={null}>
                  {() => (
                    <MultipleSelectGroup<Class>
                      label="Aulas"
                      name="classes"
                      menuIsOpen={false}
                      value={classes}
                      inputValue=""
                      onChange={classesSelectOnChange}
                      onFocus={() => setIsNewClassPopoverOpen(true)}
                      placeholder="Crie aulas para a disciplina"
                      error={data?.errors?.classes}
                      getOptionLabel={(option) =>
                        `${option.day} - ${option.time}`
                      }
                      append={
                        <Popover.Root open={isNewClassPopoverOpen}>
                          <Popover.Trigger asChild>
                            <button
                              type="button"
                              className="flex items-center justify-center w-8 h-8 bg-green-500 p-2 hover:bg-green-700 transition-colors rounded-lg focus:outline-green-700"
                              onClick={() => setIsNewClassPopoverOpen(true)}
                            >
                              <Plus
                                className="text-white font-bold"
                                size={24}
                              />
                            </button>
                          </Popover.Trigger>
                          <NewClassPopover
                            onSave={addNewClass}
                            onClose={() => setIsNewClassPopoverOpen(false)}
                            classesList={classes}
                          />
                        </Popover.Root>
                      }
                    />
                  )}
                </ClientOnly>
              </div>
              <ClientOnly fallback={null}>
                {() => (
                  <MultipleSelectGroup<Student>
                    label="Alunos"
                    name="students"
                    value={students}
                    options={studentsList}
                    placeholder="Selecione os alunos da disciplina"
                    getOptionLabel={(option) => `${option.name} - ${option.id}`}
                    getOptionValue={(option) => option.id.toString()}
                    onChange={(newValue) => setStudents(newValue as Student[])}
                    error={data?.errors?.students}
                  />
                )}
              </ClientOnly>
            </div>
          </div>
          <div className="flex gap-4 mt-2 w-[48%] ">
            <Button type="submit">Salvar</Button>
            <Button variant="danger">Cancelar</Button>
          </div>
        </Form>
      </PageCard>
    </>
  );
}

export default NewSubject;
