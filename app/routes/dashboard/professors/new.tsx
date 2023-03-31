import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { z } from "zod";
import { Button } from "~/components/Button";
import { InputGroup } from "~/components/InputGroup";
import { PageCard } from "~/components/PageCard";
import { Spinner } from "~/components/Spinner";
import { generateFormErrors } from "~/utils/generateFormErrors";

export const action = async ({ request }: ActionArgs) => {
  const formPayload = Object.fromEntries(await request.formData());
  const newProfessorSchema = z.object({
    id: z
      .number({
        coerce: true,
        invalid_type_error: "Matrícula deve ser um número",
      })
      .min(1, {
        message: "Matrícula é obrigatória",
      }),
    name: z.string().min(5, {
      message: "O nome deve ter no mínimo 5 caracteres",
    }),
    email: z.string().email({
      message: "E-mail inválido",
    }),
  });

  const newProfessor = newProfessorSchema.safeParse(formPayload);

  if (!newProfessor.success) {
    return json({
      errors: generateFormErrors(newProfessor.error),
    });
  }

  return redirect("/dashboard");
};

function NewProfessor() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <h1 className="text-xl text-gray-800">
        Professores / Cadastrar professor
      </h1>

      <PageCard title="Cadastrar professor">
        <Form className="flex flex-col gap-3 px-16 py-8" method="post">
          <InputGroup
            name="name"
            label="Nome"
            placeholder="Digite o nome do professor"
            error={actionData?.errors?.name}
          />
          <InputGroup
            name="email"
            label="Email"
            placeholder="Digite o email do professor"
            error={actionData?.errors?.email}
          />
          <InputGroup
            name="id"
            label="Matrícula"
            placeholder="Digite a matrícula do professor"
            error={actionData?.errors?.id}
          />
          <div className="flex gap-4 mt-2">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="flex items-center justify-center"
            >
              {isSubmitting && <Spinner />}
              Salvar
            </Button>
            <Button disabled={isSubmitting} type="button" variant="danger">
              Cancelar
            </Button>
          </div>
        </Form>
      </PageCard>
    </>
  );
}

export default NewProfessor;
