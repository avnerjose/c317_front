import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DisciplinesListTable } from "~/components/DisciplinesListTable";
import { EmptyState } from "~/components/EmptyState";
import { PageCard } from "~/components/PageCard";
import { api } from "~/services/api";

export const meta: MetaFunction = () => ({
  title: "Lista de disciplinas",
});

type Discipline = {
  id: string;
  name: string;
  professor: string;
};

export const loader = async () => {
  const { data } = await api.get<Discipline[]>("/subject");

  return json({
    disciplines: data,
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
        {disciplines.length ? (
          <div className="px-16 py-8">
            <DisciplinesListTable.Table>
              {disciplines.map((discipline) => (
                <DisciplinesListTable.Item
                  key={discipline.id}
                  {...discipline}
                />
              ))}
            </DisciplinesListTable.Table>
          </div>
        ) : (
          <EmptyState
            title="Lista de disciplinas vazia"
            description="Você ainda não tem nenhuma disciplina cadastrada em sua plataforma."
            linkUrl="/dashboard/discipline/new"
            linkLabel="Cadastre uma nova disciplina"
          />
        )}
      </PageCard>
    </>
  );
}

export default DisciplinesList;
