import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SubjectsListTable } from "~/components/SubjectsListTable";
import { EmptyState } from "~/components/EmptyState";
import { PageCard } from "~/components/PageCard";
import { api } from "~/services/api";
import { Professor } from "../professors/list";
import { Class } from "./new";

export const meta: MetaFunction = () => ({
  title: "Lista de disciplinas",
});

type Subject = {
  id: string;
  name: string;
  professor: string;
  classes: Class[];
};

type APISubject = {
  id: string;
  name: string;
  professor_id: number;
  classes: Class[];
};

export const loader = async () => {
  const { data: subjects } = await api.get<APISubject[]>("/subject");

  console.log(JSON.stringify(subjects, null, 2));

  const res = await Promise.all(
    subjects.map((item) => {
      return api
        .get<Professor>(`/professor/${item.professor_id}`)
        .then((response) => response.data);
    })
  ).then((professors) => {
    const mappedSubjects: Subject[] = subjects.map((item) => ({
      id: item.id,
      name: item.name,
      professor:
        professors.find((p) => p.id === item.professor_id)?.name ||
        "Não encontrado",
      classes: item.classes.map((item) => ({
        ...item,
        time: item.time.split(":").slice(0, 2).join(":"),
      })),
    }));

    return mappedSubjects;
  });

  return json({
    subjects: res,
  });
};

function SubjectsList() {
  const { subjects } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-xl text-gray-800">
        Disciplinas / Lista de disciplinas
      </h1>
      <PageCard title="Lista de disciplinas">
        {subjects.length ? (
          <div className="px-16 py-8">
            <SubjectsListTable.Table>
              {subjects.map((subject) => (
                <SubjectsListTable.Item key={subject.id} {...subject} />
              ))}
            </SubjectsListTable.Table>
          </div>
        ) : (
          <EmptyState
            title="Lista de disciplinas vazia"
            description="Você ainda não tem nenhuma disciplina cadastrada em sua plataforma."
            linkUrl="/dashboard/subject/new"
            linkLabel="Cadastre uma nova disciplina"
          />
        )}
      </PageCard>
    </>
  );
}

export default SubjectsList;
