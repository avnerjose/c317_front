import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";

import { InputGroup } from "~/components/InputGroup.";

export const action = async ({ request }: ActionArgs) => {
  const formPayload = Object.fromEntries(await request.formData());
  const loginSchema = z.object({
    email: z
      .string({
        required_error: "E-mail é obrigatório",
      })
      .email({
        message: "E-mail inválido",
      }),
    password: z.string().min(6, {
      message: "A senha deve ter no mínimo 6 caracteres",
    }),
  });

  const loginData = loginSchema.safeParse(formPayload);

  if (!loginData.success) {
    const formattedErrors = loginData.error.format();

    return json({
      errors: {
        email: formattedErrors["email"]?._errors[0],
        password: formattedErrors["password"]?._errors[0],
      },
    });
  }

  return redirect("/dashboard");
};

function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex justify-end w-screen h-screen bg-gray-800">
      <div className="flex flex-col justify-center bg-white h-full px-16 max-w-[576px] rounded-l-lg  drop-shadow-default">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">Entrar</h1>
        <p className="text-gray-500">
          Bem-vindo ao Portal Académico! Por favor, faça o login abaixo para
          acessar e administrar informações de sua instituição de ensino.
        </p>
        <Form method="post" className="flex flex-col gap-4 mt-16">
          <InputGroup
            label="E-mail"
            name="email"
            placeholder="Digite seu e-mail"
            type="text"
            error={actionData?.errors.email}
          />
          <InputGroup
            label="Senha"
            name="password"
            placeholder="Digite sua senha"
            type="password"
            error={actionData?.errors.password}
          />
          <button
            className="bg-green-500 py-5 rounded-lg mt-12 text-white font-bold hover:bg-green-700 transition-colors focus:outline-green-700"
            type="submit"
          >
            ENTRAR
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
