import type {
  ErrorBoundaryComponent,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { DotsThreeCircle, Plus } from "phosphor-react";

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data) {
    return {
      title: "Gerenciar disciplina - Erro ao gerenciar disciplina",
    }
  }

  return {
    title: `Gerenciar disciplina - ${data.subject.name}`,
  };
};

export const loader = async ({ params }: LoaderArgs) => {
  const { code } = params;
  const subjects = [
    {
      name: "Tópicos especiais 1",
      code: "C317",
      professor: "Renzo Mesquita",
    },
    {
      name: "Algoritmos 1",
      code: "C202",
      professor: "Carlos Ynoguti",
    },
  ];

  const subject = subjects.find((d) => d.code === code);

  if (!subject) {
    throw new Error("Disciplina não encontrada");
  }

  return json({
    subject,
  });
};

function ManageSubject() {
  const {
    subject: { code, name },
  } = useLoaderData<typeof loader>();

  return (
    <>
      <h2 className="text-xl text-gray-800">
        Disciplinas /{" "}
        <Link to="/dashboard/subjects/manage" className="hover:underline">
          Gerenciar disciplinas
        </Link>{" "}
        / {code}
      </h2>
      <h3 className="text-2xl text-gray-800 mt-4">
        {code} - {name}
      </h3>
      <div className="grid grid-cols-3 grid-flow-row gap-6 mt-4 items-start">
        <div className="bg-white rounded-lg overflow-hidden drop-shadow-md">
          <div className="flex items-center justify-center p-4 border-b border-b-gray-200 bg-green-500 drop-shadow-md">
            <span className="text-white font-bold text-xl">Aulas</span>
          </div>
          <div className="flex flex-col py-4">
            <table className="border-separate border-spacing-x-8 text-left">
              <thead className="text-gray-800">
                <tr>
                  <th>Dia da semana</th>
                  <th>Horário</th>
                </tr>
              </thead>
              <tbody className="text-gray-y00">
                <tr>
                  <td>Segunda-feira</td>
                  <td>10:00</td>
                </tr>
                <tr>
                  <td>Sexta-feira</td>
                  <td>20:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden drop-shadow-md">
          <div className="flex items-center justify-center p-4 border-b border-b-gray-200 bg-green-500 drop-shadow-md">
            <span className="text-white font-bold text-xl">Alunos</span>
          </div>
          <div className="flex flex-col py-4">
            <table className="border-separate border-spacing-x-8 text-left">
              <thead className="text-gray-800">
                <tr>
                  <th>Aluno</th>
                  <th>Matrícula</th>
                </tr>
              </thead>
              <tbody className="text-gray-y00">
                <tr>
                  <td>Fábio Fiorita</td>
                  <td>24</td>
                </tr>
                <tr>
                  <td>Bezinho Gandolpho</td>
                  <td>169</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden drop-shadow-md">
          <div className="flex items-center justify-center p-4 border-b border-b-gray-200 bg-green-500 drop-shadow-md">
            <span className="text-white font-bold text-xl">Avaliações</span>
          </div>
          <div className="flex flex-col py-4">
            <table className="border-separate border-spacing-x-8 text-left">
              <thead className="text-gray-800">
                <tr>
                  <th>Código</th>
                  <th>Data</th>
                  <th>
                    <Plus size={24} />
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-y00">
                <tr>
                  <td>NP1</td>
                  <td>24/03/21</td>
                  <td>
                    <DotsThreeCircle size={24} />
                  </td>
                </tr>
                <tr>
                  <td>NP2</td>
                  <td>13/04/21</td>
                  <td>
                    <DotsThreeCircle size={24} />
                  </td>
                </tr>
                <tr>
                  <td>NP3</td>
                  <td>26/06/21</td>
                  <td>
                    <DotsThreeCircle size={24} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageSubject;

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <>
      <h2 className="text-xl text-gray-800">
        Disciplinas / Gerenciar disciplinas
      </h2>
      <div className="flex flex-col bg-red-200 p-4 rounded-lg mt-4">
        <span className="text-red-500 text-lg uppercase font-bold">
          Erro ao gerenciar disciplina
        </span>
        <span className="text-red-500">{error.message}</span>
      </div>
    </>
  );
};
