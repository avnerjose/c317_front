import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import InputMask from "react-input-mask";
import { z } from "zod";
import { Button } from "~/components/Button";
import { InputGroup } from "~/components/InputGroup";
import { InputMaskGroup } from "~/components/InputMaskGroup";
import { PageCard } from "~/components/PageCard";
import { Spinner } from "~/components/Spinner";
import { api } from "~/services/api";
import { generateFormErrors } from "~/utils/generateFormErrors";

export const meta: MetaFunction = () => ({
  title: "Cadastrar professor",
});

export const action = async ({ request }: ActionArgs) => {
  const formPayload = Object.fromEntries(await request.formData());
  const newProfessorSchema = z.object({
    name: z.string().min(5, {
      message: "O nome deve ter no mínimo 5 caracteres",
    }),
    email: z.string().email({
      message: "E-mail inválido",
    }),
    departament: z.string().nonempty("Departamento é obrigatório"),
    password: z.string().min(8, {
      message: "A senha deve ter no mínimo 8 caracteres",
    }),
    phone_number: z
      .string()
      .transform((data): string => {
        return data
          .split("(")
          .join("")
          .split(")")
          .join("")
          .split("-")
          .join("")
          .split(" ")
          .join("");
      })
      .refine((data) => data.length === 11, {
        message: "Número de telefone inválido",
      }),
  });

  const newProfessor = newProfessorSchema.safeParse(formPayload);

  if (!newProfessor.success) {
    return json({
      errors: {
        _errors: null,
        ...generateFormErrors(newProfessor.error),
      },
    });
  }

  try {
    const body = {
      professor: JSON.parse(JSON.stringify(newProfessor.data)),
    };

    console.log(body);

    await api.post("/professor", body);

    return redirect("/dashboard");
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
    return json({
      errors: {
        _error:
          "Ocorreu um erro ao cadastrar o professor. Tente novamente mais tarde.",
      },
    });
  }
};

function NewProfessor() {
  const actionData = useActionData<typeof action>() as any;
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <h1 className="text-xl text-gray-800">
        Professores / Cadastrar professor
      </h1>

      <PageCard title="Cadastrar professor">
        <Form className="flex flex-col gap-3 px-16 py-8" method="post">
          <div className="grid grid-cols-2 gap-6">
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
            <InputMaskGroup
              label="Número de contato"
              mask="(99) 99999-9999"
              name="phone_number"
              className="mt-3 px-6 py-4 w-[450px] border border-gray-200 rounded-lg  text-gray-800 placeholder-gray-500"
              placeholder="Digite o telefone do professor"
              error={actionData?.errors?.phone_number}
            />
            <InputGroup
              name="departament"
              label="Departamento"
              placeholder="Digite o departamento do professor"
              error={actionData?.errors?.departament}
            />
            <InputGroup
              name="password"
              label="Senha"
              placeholder="Digite a senha para o professor acessar a plataforma"
              error={actionData?.errors?.password}
              type="password"
            />
          </div>
          <div className="flex gap-4 mt-2 max-w-[50%] w-full ml-auto">
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
