import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "Gerenciar disciplinas",
});

export const loader = () => {
  return json({
    subjects: [
      {
        name: "Tópicos especiais 1",
        code: "C317",
      },
      {
        name: "Algoritmos 1",
        code: "C202",
      },
    ],
  });
};

function ManageSubjects() {
  const { subjects } = useLoaderData<typeof loader>();

  return (
    <>
      <h2 className="text-xl text-gray-800">
        Disciplinas / Gerenciar disciplinas
      </h2>
      <h1 className="text-2xl mt-4 text-gray-800">Gerenciar disciplinas</h1>
      <div className="grid grid-cols-4 mt-4 w-full drop-shadow-md gap-6">
        {subjects.map((subject) => (
          <Link
            to={`/dashboard/subjects/manage/${subject.code}`}
            className="flex flex-col items-center overflow-hidden text-gray-700 bg-white rounded-lg hover:bg-gray-200 transition-colors group"
            key={subject.code}
          >
            <div className="bg-green-500 w-full flex items-center justify-center p-4 group-hover:bg-green-700 transition-colors">
              <span className="text-4xl font-bold text-white">
                {subject.code}
              </span>
            </div>
            <div className="p-4">
              <span>{subject.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ManageSubjects;
