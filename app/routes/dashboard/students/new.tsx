import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { z } from "zod";
import { Button } from "~/components/Button";
import { InputGroup } from "~/components/InputGroup";
import { PageCard } from "~/components/PageCard";
import { Spinner } from "~/components/Spinner";
import { api } from "~/services/api";
import { generateFormErrors } from "~/utils/generateFormErrors";

export const meta: MetaFunction = () => ({
  title: "Cadastrar aluno",
});

export const action = async ({ request }: ActionArgs) => {
  const formPayload = Object.fromEntries(await request.formData());
  const newStudentSchema = z.object({
    name: z.string().min(5, {
      message: "O nome deve ter no mínimo 5 caracteres",
    }),
    email: z.string().email({
      message: "E-mail inválido",
    }),
    course: z.string(),
    password: z.string().min(6, {
      message: "A senha deve ter no mínimo 6 caracteres",
    }),
  });

  const newStudent = newStudentSchema.safeParse(formPayload);

  if (!newStudent.success) {
    return json({
      errors: generateFormErrors(newStudent.error),
    });
  }

  try {
    const body = {
      student: newStudent.data,
    };

    await api.post("/student", body);

    return redirect("/dashboard");
  } catch (e) {
    return json({
      errors: {
        _error:
          "Ocorreu um erro ao cadastrar o aluno. Tente novamente mais tarde.",
      },
    });
  }
};

function NewStudent() {
  const actionData = useActionData<typeof action>() as any;
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
              name="course"
              label="Curso"
              placeholder="Digite o curso do aluno"
              error={actionData?.errors.course}
            />
            <InputGroup
              name="password"
              label="Senha"
              placeholder="Digite a senha para o aluno acessar a plataforma"
              error={actionData?.errors.password}
              type="password"
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
