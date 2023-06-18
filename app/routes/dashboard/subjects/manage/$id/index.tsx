import type {
  ErrorBoundaryComponent,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useRevalidator } from "@remix-run/react";
import { Plus, Trash, Warning } from "phosphor-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Popover from "@radix-ui/react-popover";
import { AppTable } from "~/components/AppTable";

import { api } from "~/services/api";
import { NewExamPopover } from "~/components/NewExamPopover";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DeleteModal } from "~/components/DeleteModal";
import { EditedGradePopover } from "~/components/EditedGradePopover";

dayjs.extend(localizedFormat);

export type Exam = {
  id: number;
  date: number;
  code: string;
  subject_id: string;
};

type Subject = {
  id: string;
  name: string;
  exams: Exam[];
  professor: {
    id: number;
    email: string;
    name: string;
    departament: string;
    phone_number: string;
  };
  students: Array<{
    id: number;
    name: string;
    course: string;
    email: string;
  }>;
  classes: Array<{
    id: number;
    day: string;
    time: string;
  }>;
};

type ExamsGrades = {
  [key: string]: Grade;
};

type Grade = {
  [key: string]: number;
};

type APIExam = {
  id: number;
  code: string;
  date: string;
  students: Array<{
    student_id: number;
    grade: number | null;
  }>;
};

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data) {
    return {
      title: "Gerenciar disciplina - Erro ao gerenciar disciplina",
    };
  }

  return {
    title: `Gerenciar disciplina - ${data.subject.name}`,
  };
};

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = params;
  const { data } = await api.get<Subject>(`/subject/${id}`);

  const grades = await Promise.all(
    data.exams?.map((item) => {
      return api
        .get<APIExam>(`/exam/${item.id}`)
        .then((response) => response.data);
    })
  ).then((exams) => {
    const examsGrades = {} as ExamsGrades;
    const mappedGrades = exams?.map((exam) =>
      exam.students.reduce((accumulator, student) => {
        accumulator[student.student_id.toString()] = student.grade || 0;
        return accumulator;
      }, {} as Grade)
    );

    const keys = exams?.map((item) => item.id);

    keys.forEach((key, index) => {
      examsGrades[key] = mappedGrades[index];
    });

    return examsGrades;
  });

  return json({
    subject: {
      ...data,
      classes: data.classes?.map((item) => ({
        ...item,
        time: item.time.split(":").slice(0, 2).join(":"),
      })),
      exams: data.exams.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    },
    grades,
  });
};

function ManageSubject() {
  const {
    subject: { id, name, classes, students, exams },
    grades: initialGrades,
  } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();
  const [isNewExamPopoverOpen, setIsNewExamPopoverOpen] = useState(false);
  const [grades, setGrades] = useState<ExamsGrades>(
    JSON.parse(JSON.stringify(initialGrades))
  );
  const [editedExams, setEditedExams] = useState<number[]>([]);

  const handleUpdateGrade = (
    value: number,
    examId: number,
    studentId: number
  ) => {
    const newGrades = { ...grades };
    newGrades[examId][studentId] = value;

    setEditedExams((prev) => [...prev, examId]);
    setGrades(newGrades);
  };

  const handleCreateNewExam = async (
    newExam: Omit<Exam, "subject_id" | "id">
  ) => {
    await api.post("/exam", {
      exam: {
        ...newExam,
        subject_id: id,
      },
    });

    revalidator.revalidate();
  };

  const handleDeleteExam = async (examId: number | string) => {
    await api.delete(`exam/${examId}`);

    revalidator.revalidate();
  };

  const handleDiscardChangesOnGrades = async (examId: number | string) => {
    const newGrades = { ...grades };
    const oldGrades = { ...initialGrades };
    
    newGrades[examId] = oldGrades[examId];
    
    setEditedExams((prev) => prev.filter((id) => id !== examId));
    setGrades(newGrades);
  };

  const handleSaveChanges = async (examId: number | string) => {
    
    
    setEditedExams((prev) => prev.filter((id) => id !== examId));
  };

  return (
    <>
      <h2 className="text-xl text-gray-800">
        Disciplinas /{" "}
        <Link to="/dashboard/subjects/manage" className="hover:underline">
          Gerenciar disciplinas
        </Link>{" "}
        / {id}
      </h2>
      <pre>
        <code>{JSON.stringify(grades, null, 2)}</code>
      </pre>
      <h3 className="text-2xl text-gray-800 mt-4">
        {id} - {name}
      </h3>
      <div className="grid grid-cols-3 grid-flow-row gap-6 mt-4 items-start">
        <div className="bg-white rounded-lg overflow-hidden drop-shadow-md">
          <div className="flex items-center justify-center p-4 border-b border-b-gray-200 bg-gray-200 drop-shadow-sm">
            <span className="text-gray-700 font-bold text-xl">Aulas</span>
          </div>
          <div className="flex flex-col py-4">
            <table className="border-separate border-spacing-x-8 text-left">
              <thead className="text-gray-800">
                <tr>
                  <th>Dia da semana</th>
                  <th>Horário</th>
                </tr>
              </thead>
              <tbody className="text-gray-y00">
                {classes.map((item) => (
                  <tr key={item.id}>
                    <td>{item.day}</td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden drop-shadow-sm">
          <div className="flex items-center justify-center p-4 border-b border-b-gray-200 bg-gray-200 drop-shadow-sm">
            <span className="text-gray-700 font-bold text-xl">Alunos</span>
          </div>
          <div className="flex flex-col py-4">
            <table className="border-separate border-spacing-x-8 text-left">
              <thead className="text-gray-800">
                <tr>
                  <th>Aluno</th>
                  <th>Matrícula</th>
                </tr>
              </thead>
              <tbody className="text-gray-y00">
                {students.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden drop-shadow-sm">
          <div className="flex items-center justify-center p-4 border-b border-b-gray-200 bg-gray-200 drop-shadow-sm">
            <span className="text-gray-700 font-bold text-xl">Avaliações</span>
          </div>
          <div className="flex flex-col py-4">
            <table className="border-separate border-spacing-x-4 text-left">
              <thead className="text-gray-800">
                <tr>
                  <th>Código</th>
                  <th>Data</th>
                  <th>
                    <Popover.Root open={isNewExamPopoverOpen}>
                      <Popover.Trigger asChild>
                        <div className="flex items-center justify-center">
                          <Plus
                            size={24}
                            onClick={() => setIsNewExamPopoverOpen(true)}
                          />
                        </div>
                      </Popover.Trigger>
                      <NewExamPopover
                        onClose={() => setIsNewExamPopoverOpen(false)}
                        onSave={handleCreateNewExam}
                      />
                    </Popover.Root>
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-y00">
                {exams?.map((item) => (
                  <tr key={item.date}>
                    <AlertDialog.Root>
                      <td>{item.code}</td>
                      <td>
                        {dayjs(item.date, {
                          locale: "pt-br",
                        }).format("L LT")}{" "}
                      </td>
                      <td className="flex h-full items-center justify-center ">
                        <AlertDialog.Trigger>
                          <Trash className="h-6 text-red-500" size={20} />
                        </AlertDialog.Trigger>
                      </td>
                      <DeleteModal
                        entityName="avaliação"
                        id={item.id}
                        name={item.code}
                        onDelete={handleDeleteExam}
                      />
                    </AlertDialog.Root>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-white p-8 drop-shadow-md mt-4 rounded-lg">
        <AppTable.Table>
          <AppTable.THead>
            <tr>
              <AppTable.Th>Alunos</AppTable.Th>
              {exams?.map((item) => (
                <AppTable.Th key={item.id}>
                  <div className="flex items-center gap-1">
                    {item.code}{" "}
                    {editedExams.includes(item.id) && (
                      <Popover.Root>
                        <EditedGradePopover
                          exam={item}
                          onDiscardChanges={handleDiscardChangesOnGrades}
                          onClose={() => {}}
                        />
                        <Popover.Trigger asChild>
                          <Warning className="text-red-500" />
                        </Popover.Trigger>
                      </Popover.Root>
                    )}
                  </div>
                </AppTable.Th>
              ))}
            </tr>
          </AppTable.THead>
          <tbody>
            {students?.map((student, i) => (
              <tr key={student.id}>
                <AppTable.Td>{student.name}</AppTable.Td>
                {exams?.map((exam) => (
                  <AppTable.Td key={exam.id} className="p-0">
                    <div className="flex items-start h-full">
                      <input
                        className="w-12 outline-none appearance-none"
                        type="number"
                        min="0"
                        value={grades[exam.id][student.id]}
                        onChange={(e) =>
                          handleUpdateGrade(
                            Number(e.target.value),
                            exam.id,
                            student.id
                          )
                        }
                      />
                    </div>
                  </AppTable.Td>
                ))}
              </tr>
            ))}
          </tbody>
        </AppTable.Table>
      </div>
    </>
  );
}

export default ManageSubject;

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <>
      <h2 className="text-xl text-gray-800">
        Disciplinas / Gerenciar disciplinas
      </h2>
      <div className="flex flex-col bg-red-200 p-4 rounded-lg mt-4">
        <span className="text-red-500 text-lg uppercase font-bold">
          Erro ao gerenciar disciplina
        </span>
        <span className="text-red-500">{error.message}</span>
      </div>
    </>
  );
};
