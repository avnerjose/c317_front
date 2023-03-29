import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { InputGroup } from "~/components/InputGroup.";

export const action = async () => {
  return redirect("/dashboard");
};

function Login() {
  return (
    <div className="flex justify-end w-screen h-screen bg-gray-800">
      <div className="flex flex-col justify-center bg-white h-full px-16 max-w-[576px] rounded-l-lg  drop-shadow-default">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">Entrar</h1>
        <p className="text-gray-500">
          Bem-vindo ao Portal Acadêmico! Por favor, faça o login abaixo para
          acessar e administrar informações de sua instituição de ensino.
        </p>
        <Form method="post" className="flex flex-col gap-4 mt-16">
          <InputGroup
            label="E-mail"
            name="email"
            placeholder="Digite seu e-mail"
            type="email"
          />
          <InputGroup
            label="Senha"
            name="password"
            placeholder="Digite sua senha"
            type="password"
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
