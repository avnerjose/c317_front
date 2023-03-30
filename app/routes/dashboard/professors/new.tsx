import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { z } from "zod";
import { InputGroup } from "~/components/InputGroup.";
import { PageCard } from "~/components/PageCard";
import { Spinner } from "~/components/Spinner";

export const action = async ({ request }: ActionArgs) => {
  const formPayload = Object.fromEntries(await request.formData());
  const newProfessorSchema = z.object({
    id: z
      .number({
        coerce: true,
        invalid_type_error: "Matrícula deve ser um número",
      })

      .min(1, {
        message: "Matrícula inválida",
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
    const formattedErrors = newProfessor.error.format();

    return json({
      errors: {
        id: formattedErrors["id"]?._errors[0],
        name: formattedErrors["name"]?._errors[0],
        email: formattedErrors["email"]?._errors[0],
      },
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
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex items-center justify-center w-full bg-green-500 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              {isSubmitting && <Spinner />}
              Salvar
            </button>
            <button
              disabled={isSubmitting}
              type="button"
              className="w-full border border-red-500 text-red-500 font-bold py-4 rounded-lg hover:bg-red-200 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </Form>
      </PageCard>
    </>
  );
}

export default NewProfessor;
