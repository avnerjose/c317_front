import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import * as Avatar from "@radix-ui/react-avatar";
import * as Accordion from "@radix-ui/react-accordion";
import {
  BookBookmark,
  ChalkboardSimple,
  SignOut,
  Student,
} from "phosphor-react";
import { MenuAccordion } from "~/components/MenuAccordion";
import { getUserSession, logout } from "~/utils/session.server";
import { HasAccess } from "~/components/HasAccess";

const Roles = {
  admin: "Administrador",
  professor: "Professor",
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUserSession(request);

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
    user: { name, roles },
  } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-dashboard min-h-screen">
      <aside className="flex flex-col bg-gray-800 drop-shadow-default">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
          <Avatar.Root className="flex items-center justify-center bg-green-500 w-14 h-14 rounded-full">
            <Avatar.Fallback>
              <span className="text-xl font-bold text-gray-800">RM</span>
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white">{name}</span>
            <span className="text-gray-200">
              {Roles[roles[0] as keyof typeof Roles]}
            </span>
          </div>
        </div>
        <nav>
          <Accordion.Root type="single" defaultValue="item-1" collapsible>
            <HasAccess allowedRoles="admin" roles={roles}>
              <MenuAccordion.Item
                value="item-1"
                label="Professores"
                icon={ChalkboardSimple}
              >
                <MenuAccordion.Link
                  href="/dashboard/professors/new"
                  label="Cadastrar professor"
                />
                <MenuAccordion.Link
                  href="/dashboard/professors/list"
                  label="Lista de professores"
                />
              </MenuAccordion.Item>
              <MenuAccordion.Item value="item-2" label="Alunos" icon={Student}>
                <MenuAccordion.Link
                  href="/dashboard/students/new"
                  label="Cadastrar aluno"
                />
                <MenuAccordion.Link
                  href="/dashboard/students/list"
                  label="Lista de alunos"
                />
              </MenuAccordion.Item>
            </HasAccess>
            <HasAccess allowedRoles={["admin", "professor"]} roles={roles}>
              <MenuAccordion.Item
                value="item-3"
                label="Disciplinas"
                icon={BookBookmark}
              >
                <HasAccess allowedRoles="admin" roles={roles}>
                  <MenuAccordion.Link
                    href="/dashboard/disciplines/new"
                    label="Cadastrar disciplina"
                  />
                  <MenuAccordion.Link
                    href="/dashboard/disciplines/list"
                    label="Lista de disciplinas"
                  />
                </HasAccess>
                <HasAccess allowedRoles="professor" roles={roles}>
                  <MenuAccordion.Link
                    href="/dashboard/disciplines/manage"
                    label="Gerenciar disciplinas"
                  />
                </HasAccess>
              </MenuAccordion.Item>
            </HasAccess>
          </Accordion.Root>
        </nav>

        <Form method="post" className="border-t border-t-gray-200 mt-auto">
          <button
            type="submit"
            className="flex gap-4  px-6 py-5 w-full transition-colors hover:bg-gray-700"
          >
            <SignOut size={24} className="text-white" />
            <span className="text-white text-xl">Sair</span>
          </button>
        </Form>
      </aside>
      <main className="flex flex-col items-start bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
