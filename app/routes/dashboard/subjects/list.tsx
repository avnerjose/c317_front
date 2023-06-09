import type { MetaFunction } from "@remix-run/node";
import type { Professor } from "../professors/list";
import type { Class } from "./new";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SubjectsListTable } from "~/components/SubjectsListTable";
import { EmptyState } from "~/components/EmptyState";
import { PageCard } from "~/components/PageCard";
import { api } from "~/services/api";

export const meta: MetaFunction = () => ({
  title: "Lista de disciplinas",
});

type Subject = {
  id: string;
  name: string;
  professor: Professor | null;
  classes: Class[];
};

export const loader = async () => {
  const { data: subjects } = await api.get<Subject[]>("/subject");

  return json({
    subjects: subjects.map((s) => ({
      ...s,
      classes: s.classes.map((c) => ({
        ...c,
        time: c.time.split(":").splice(0, 2).join(":"),
      })),
    })),
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
                <SubjectsListTable.Item
                  key={subject.id}
                  subject={subject}
                  data-test="subject-list-item"
                />
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
