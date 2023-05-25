import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { AppTable } from "~/components/AppTable";

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = params;
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

  return json({
    subject: subjects[0],
  });
};

function SubjectExams() {
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
        /{" "}
        <Link
          to={`/dashboard/subjects/manage/${code}`}
          className="hover:underline"
        >
          {code}
        </Link>{" "}
        / Avaliações
      </h2>
      <h3 className="text-2xl text-gray-800 mt-4">
        {code} - {name}
      </h3>
      <div className="bg-white p-8 drop-shadow-md mt-4 rounded-lg">
        <AppTable.Table>
          <AppTable.THead>
            <tr>
              <AppTable.Th>Alunos</AppTable.Th>
              <AppTable.Th>NP1</AppTable.Th>
              <AppTable.Th>NP2</AppTable.Th>
            </tr>
          </AppTable.THead>
          <tbody>
            <tr>
              <AppTable.Td>Fábio Fiorita Pontes</AppTable.Td>
              <AppTable.Td className="p-0">
                <div className="flex items-start h-full">
                  <input
                    className="w-12 outline-none appearance-none"
                    type="number"
                    name="np1-fabio"
                    id="np1-fabio"
                    value={70}
                  />
                </div>
              </AppTable.Td>
              <AppTable.Td>30</AppTable.Td>
            </tr>
          </tbody>
        </AppTable.Table>
      </div>
    </>
  );
}

export default SubjectExams;
