import type { FormMethod } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
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

export type Class = {
  id: string;
  weekDay: {
    value: number;
    label: string;
  };
  time: string;
};

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
};

export const loader = async () => {
  return json({
    students: [
      {
        id: 100,
        name: "Fábio Fiorita",
        email: "fabio@email.com",
        course: "Produção",
      },
      {
        id: 320,
        name: "Bezinho Gandolpho",
        email: "bzinho@email.com",
        course: "Software",
      },
      {
        id: 190,
        name: "Avner José",
        email: "avner@email.com",
        course: "Computação",
      },
    ],
  });
};

export const action = async ({ request }: ActionArgs) => {
  const data = Object.fromEntries(await request.formData());
  const newDisciplineSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    code: z
      .string()
      .nonempty("Código é obrigatório")
      .max(4, "O código deve ter no máximo 4 caracteres")
      .toUpperCase(),
    professor: z.string().nonempty("É necessário selecionar um professor"),
    classes: z.preprocess(
      (val) => JSON.parse(String(val)),
      z
        .array(
          z.object({
            id: z.string(),
            weekDay: z.object({
              value: z.number(),
              label: z.string(),
            }),
            time: z.string(),
          })
        )
        .min(1, "É necessário cadastrar ao menos uma aula")
        .refine((classes) => {
          const noRepeats = new Set(
            classes.map((item) => `${item.weekDay.value} - ${item.time}`)
          );

          return noRepeats.size === classes.length;
        }, "Não é possível cadastrar aulas repetidas")
    ),
    students: z.preprocess(
      (val) => JSON.parse(String(val)),
      z
        .array(
          z.object({
            id: z.number(),
            name: z.string(),
            email: z.string(),
            course: z.string(),
          })
        )
        .min(1, "É necessário cadastrar ao menos um aluno")
    ),
  });

  const newDiscipline = newDisciplineSchema.safeParse(data);

  if (!newDiscipline.success) {
    return json({
      errors: generateFormErrors(newDiscipline.error),
    });
  }

  return redirect("/dashboard");
};

function NewDiscipline() {
  const { students: studentsList } = useLoaderData<typeof loader>();
  const data = useActionData<typeof action>();
  const submit = useSubmit();
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.set("classes", JSON.stringify(classes));
    formData.set("students", JSON.stringify(students));

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
      <h1 className="text-xl text-gray-800">Disciplinas / Cadastrar disciplina</h1>
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
                name="code"
                placeholder="Digite o código da disciplina ex: C202"
                error={data?.errors?.code}
              />
              <SelectGroup
                label="Professor"
                name="professor"
                placeholder="Selecione o professor da disciplina"
                error={data?.errors?.professor}
              >
                <option value="chris"> Chris Lima</option>
                <option value="renzo"> Renzo Mesquita</option>
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
                      isDisabled={classes.length === 0}
                      onChange={classesSelectOnChange}
                      placeholder="Crie aulas para a disciplina"
                      error={data?.errors?.classes}
                      getOptionLabel={(option) =>
                        `${option.weekDay.label} - ${option.time}`
                      }
                      append={
                        <Popover.Root>
                          <Popover.Trigger asChild>
                            <button
                              type="button"
                              className="flex items-center justify-center w-8 h-8 bg-green-500 p-2 hover:bg-green-700 transition-colors rounded-lg focus:outline-green-700"
                            >
                              <Plus
                                className="text-white font-bold"
                                size={24}
                              />
                            </button>
                          </Popover.Trigger>
                          <NewClassPopover onSave={addNewClass} />
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

export default NewDiscipline;
