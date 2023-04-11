import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { z } from "zod";
import { Button } from "~/components/Button";
import { InputGroup } from "~/components/InputGroup";
import { PageCard } from "~/components/PageCard";
import { Spinner } from "~/components/Spinner";
import { generateFormErrors } from "~/utils/generateFormErrors";

export const meta: MetaFunction = () => ({
  title: "Cadastrar aluno",
});

export const action = async ({ request }: ActionArgs) => {
  const formPayload = Object.fromEntries(await request.formData());
  const newStudentSchema = z.object({
    id: z
      .number({
        coerce: true,
        invalid_type_error: "Matrícula deve ser um número",
      })
      .min(1, { message: "Matrícula é obrigatória" }),
    name: z.string().min(5, {
      message: "O nome deve ter no mínimo 5 caracteres",
    }),
    email: z.string().email({
      message: "E-mail inválido",
    }),
    course: z.string(),
  });

  const newStudent = newStudentSchema.safeParse(formPayload);

  if (!newStudent.success) {
    return json({
      errors: generateFormErrors(newStudent.error),
    });
  }

  return redirect("/dashboard");
};

function NewStudent() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <h1 className="text-xl text-gray-800">Alunos / Cadastrar aluno</h1>
      <PageCard title="Cadastrar aluno">
        <Form className="flex flex-col gap-3 px-16 py-8" method="post">
          <div className="grid grid-cols-2 gap-6">
            <InputGroup
              name="name"
              label="Nome"
              placeholder="Digite o nome do aluno"
              error={actionData?.errors.name}
            />
            <InputGroup
              name="email"
              label="Email"
              placeholder="Digite o email do aluno"
              error={actionData?.errors.email}
            />
            <InputGroup
              name="id"
              label="Matrícula"
              placeholder="Digite a matrícula do aluno"
              error={actionData?.errors.id}
            />
            <InputGroup
              name="course"
              label="Curso"
              placeholder="Digite o curso do aluno"
              error={actionData?.errors.course}
            />
          </div>
          <div className="flex gap-4 mt-2 max-w-[50%] w-full ml-auto">
            <Button
              type="submit"
              className="flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner />}
              Salvar
            </Button>
            <Button type="button" variant="danger" disabled={isSubmitting}>
              Cancelar
            </Button>
          </div>
        </Form>
      </PageCard>
    </>
  );
}

export default NewStudent;
