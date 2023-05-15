import type { ErrorBoundaryComponent, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { EmptyState } from "~/components/EmptyState";
import { PageCard } from "~/components/PageCard";
import { ProfessorsListTable } from "~/components/ProfessorsListTable";
import { api } from "~/services/api";

export type Professor = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  departament: string;
};

export const meta: MetaFunction = () => ({
  title: "Lista de professores",
});

export const loader = async () => {
  const { data } = await api.get<Professor[]>("/professor");

  return json({
    professors: data,
  });
};

function ProfessorsList() {
  const { professors } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-xl text-gray-800">
        Professores / Lista de professores
      </h1>
      <PageCard title="Lista de professores">
        {professors.length ? (
          <div className="px-16 py-8">
            <ProfessorsListTable.Table>
              {professors.map((professor) => (
                <ProfessorsListTable.Item key={professor.id} {...professor} />
              ))}
            </ProfessorsListTable.Table>
          </div>
        ) : (
          <EmptyState
            title="Lista de professores vazia"
            description="Você ainda não tem nenhum professor cadastrado em sua plataforma."
            linkUrl="/dashboard/professors/new"
            linkLabel="Cadastre um novo professor"
          />
        )}
      </PageCard>
    </>
  );
}

export default ProfessorsList;

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <>
      <h1 className="text-xl text-gray-800">
        Professores / Lista de professores
      </h1>
      <PageCard title="Lista de professores">
        <div className="flex flex-col items-center gap-2 p-10">
          <img
            className="w-60"
            src="/img/server-error.jpg"
            alt="Server error"
          />
          <h3 className="text-xl font-bold text-gray-700">
            Oops! Encontramos problemas com o servidor.
          </h3>
          <p className="text-gray-500 max-w-[80%] text-center">
            Verifique sua conexão com a internet e tente novamente mais tarde.
          </p>
        </div>
      </PageCard>
    </>
  );
};
