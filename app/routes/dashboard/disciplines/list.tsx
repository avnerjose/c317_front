import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DisciplinesListTable } from "~/components/DisciplinesListTable";
import { PageCard } from "~/components/PageCard";

export const loader = async () => {
  return json({
    disciplines: [
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
    ],
  });
};

function DisciplinesList() {
  const { disciplines } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-xl text-gray-800">
        Disciplinas / Lista de disciplinas
      </h1>
      <PageCard title="Lista de disciplinas">
        <div className="px-16 py-8">
          <DisciplinesListTable.Table>
            {disciplines.map((discipline) => (
              <DisciplinesListTable.Item
                key={discipline.code}
                {...discipline}
              />
            ))}
          </DisciplinesListTable.Table>
        </div>
      </PageCard>
    </>
  );
}

export default DisciplinesList;
