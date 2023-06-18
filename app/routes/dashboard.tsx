import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import * as Accordion from "@radix-ui/react-accordion";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import {
  BookBookmark,
  ChalkboardSimple,
  SignOut,
  Student,
  Warning,
} from "phosphor-react";
import { MenuAccordion } from "~/components/MenuAccordion";
import { getUserSession, logout } from "~/utils/session.server";
import { HasAccess } from "~/components/HasAccess";
import { AppAvatar } from "~/components/AppAvatar";
import axios from "axios";
import { useEffect } from "react";
import { api } from "~/services/api";
import { Button } from "~/components/Button";

const Roles = {
  admin: "Administrador",
  professor: "Professor",
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUserSession(request);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${user?.accessToken}`;

  if (!user) {
    return redirect("/login");
  }

  return json({
    user,
  });
};

export const action = async ({ request }: ActionArgs) => {
  return await logout(request);
};

function Dashboard() {
  const {
    user: { name, role, accessToken },
  } = useLoaderData<typeof loader>();

  useEffect(() => {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }, []);

  return (
    <div className="grid grid-cols-dashboard min-h-screen">
      <aside className="flex flex-col bg-gray-800 drop-shadow-default">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
          <AppAvatar name={name} />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white">{name}</span>
            <span className="text-gray-200">
              {Roles[role as keyof typeof Roles]}
            </span>
          </div>
        </div>
        <nav>
          <Accordion.Root type="single" defaultValue="item-1" collapsible>
            <HasAccess allowedRoles="admin" role={role}>
              <MenuAccordion.Item
                value="item-1"
                label="Professores"
                icon={ChalkboardSimple}
              >
                <MenuAccordion.Link
                  to="/dashboard/professors/new"
                  label="Cadastrar professor"
                  data-test="menu-new-professor"
                />
                <MenuAccordion.Link
                  to="/dashboard/professors/list"
                  label="Lista de professores"
                  data-test="menu-list-professor"
                />
              </MenuAccordion.Item>
              <MenuAccordion.Item value="item-2" label="Alunos" icon={Student}>
                <MenuAccordion.Link
                  to="/dashboard/students/new"
                  label="Cadastrar aluno"
                  data-test="menu-new-student"
                />
                <MenuAccordion.Link
                  to="/dashboard/students/list"
                  label="Lista de alunos"
                  data-test="menu-list-student"
                />
              </MenuAccordion.Item>
            </HasAccess>
            <HasAccess allowedRoles={["admin", "professor"]} role={role}>
              <MenuAccordion.Item
                value="item-3"
                label="Disciplinas"
                icon={BookBookmark}
              >
                <HasAccess allowedRoles="admin" role={role}>
                  <MenuAccordion.Link
                    to="/dashboard/subjects/new"
                    label="Cadastrar disciplina"
                    data-test="menu-new-subject"
                  />
                  <MenuAccordion.Link
                    to="/dashboard/subjects/list"
                    label="Lista de disciplinas"
                  />
                </HasAccess>
                <HasAccess allowedRoles="professor" role={role}>
                  <MenuAccordion.Link
                    to="/dashboard/subjects/manage"
                    label="Gerenciar disciplinas"
                  />
                </HasAccess>
              </MenuAccordion.Item>
            </HasAccess>
          </Accordion.Root>
        </nav>

        <Form
          id="logout-form"
          method="post"
          className="border-t border-t-gray-200 mt-auto"
        >
          <button
            type="submit"
            className="flex gap-4  px-6 py-5 w-full transition-colors hover:bg-gray-700"
            data-test="sign-out-button"
          >
            <SignOut size={24} className="text-white" />
            <span className="text-white text-xl">Sair</span>
          </button>
        </Form>
      </aside>
      <main className="flex flex-col items-start bg-gray-100 p-8">
        <Outlet />
      </main>
      <AlertDialog.Root open={role === "student"}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="absolute inset-0 bg-gray-700 opacity-30" />

          <AlertDialog.Content className="flex flex-col items-center justify-center p-4 rounded-lg fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[600px] max-h-[85vh] bg-white">
            <AlertDialog.Title className="text-xl text-center flex flex-col font-bold items-center text-gray-700 gap-2">
              Oops!
            </AlertDialog.Title>
            <AlertDialog.Description className="flex flex-col items-center justify-center my-4">
              <p className="text-gray-500 max-w-[90%] text-center">
                Nosso aplicativo Web ainda não possui suporte para alunos,
                utilize nosso aplicativo Mobile para isso.
              </p>
              <img
                className="w-64"
                src="/img/maintenance.svg"
                alt="Empty state"
              />

              <Button
                type="submit"
                form="logout-form"
                className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded-lg text-white text-sm font-bold mt-2 w-32"
              >
                Sair
              </Button>
            </AlertDialog.Description>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}

export default Dashboard;
