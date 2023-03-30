import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PageCard } from "~/components/PageCard";
import { ProfessorsListTable } from "~/components/ProfessorsListTable";
import { ProfessorsListTableItem } from "~/components/ProfessorsListTableItem";

export const loader = async () => {
  return json({
    professors: [
      {
        id: 1900,
        name: "Chris Lima",
        email: "chris@email.com",
      },
      {
        id: 134,
        name: "Renzo Mesquita",
        email: "renzo@gmail.com",
      },
    ],
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
        <div className="px-16 py-8">
          <ProfessorsListTable>
            {professors.map((professor) => (
              <ProfessorsListTableItem key={professor.id} {...professor} />
            ))}
          </ProfessorsListTable>
        </div>
      </PageCard>
    </>
  );
}

export default ProfessorsList;
