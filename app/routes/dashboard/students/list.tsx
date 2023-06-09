import type { ErrorBoundaryComponent, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { StudentsListTable } from "~/components/StudentsListTable";
import { PageCard } from "~/components/PageCard";
import { api } from "~/services/api";
import { EmptyState } from "~/components/EmptyState";

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
};

export const meta: MetaFunction = () => ({
  title: "Lista de alunos",
});

export const loader = async () => {
  const { data } = await api.get<Student[]>("/student");

  return json({
    students: data,
  });
};

function StudentsList() {
  const { students } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-xl text-gray-800">Alunos / Lista de alunos</h1>
      <PageCard title="Lista de alunos">
        {students.length ? (
          <div className="px-16 py-8">
            <StudentsListTable.Table>
              {students.map((student) => (
                <StudentsListTable.Item
                  data-test="student-list-item"
                  key={student.id}
                  student={student}
                />
              ))}
            </StudentsListTable.Table>
          </div>
        ) : (
          <EmptyState
            title="Lista de alunos vazia"
            description="Você ainda não tem nenhum aluno cadastrado em sua plataforma."
            linkUrl="/dashboard/students/new"
            linkLabel="Cadastre um novo aluno"
          />
        )}
      </PageCard>
    </>
  );
}

export default StudentsList;

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <>
      <h1 className="text-xl text-gray-800">Alunos / Lista de alunos</h1>
      <PageCard title="Lista de alunos">
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
