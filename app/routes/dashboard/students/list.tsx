import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import * as StudentsLitsTable from "~/components/StudentsListTable";
import { PageCard } from "~/components/PageCard";

export const loader = async () => {
  return json({
    students: [
      {
        id: 100,
        name: "Fábio Fiorita",
        email: "fabio@email.com",
        course: "Produção",
      },
      {
        id: 320,
        name: "Bezinho Gandolpho",
        email: "bzinho@email.com",
        course: "Software",
      },
      {
        id: 190,
        name: "Avner José",
        email: "avner@email.com",
        course: "Computação",
      },
    ],
  });
};

function StudentsList() {
  const { students } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-xl text-gray-800">Alunos / Lista de alunos</h1>
      <PageCard title="Lista de alunos">
        <div className="px-16 py-8">
          <StudentsLitsTable.Table>
            {students.map((student) => (
              <StudentsLitsTable.Item key={student.id} {...student} />
            ))}
          </StudentsLitsTable.Table>
        </div>
      </PageCard>
    </>
  );
}

export default StudentsList;
