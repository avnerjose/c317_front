import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
      <div className="bg-white drop-shadow-default mt-4 rounded-lg">
        <div className="py-6 px-16 border-b border-gray-200">
          <h3 className="text-2xl text-gray-800 ">Lista de professores</h3>
        </div>

        <div className="px-16 py-8">
          <ProfessorsListTable>
            {professors.map((professor) => (
              <ProfessorsListTableItem key={professor.id} {...professor} />
            ))}
          </ProfessorsListTable>
        </div>
      </div>
    </>
  );
}

export default ProfessorsList;
