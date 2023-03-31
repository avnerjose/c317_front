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
import { MenuAccordionItem } from "~/components/MenuAccordionItem";
import { MenuAccordionItemLink } from "~/components/MenuAccordionItemLink";
import { getUserSession, logout } from "~/utils/session.server";
import { HasAccess } from "~/components/HasAccess";

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
  const { user } = useLoaderData<typeof loader>();

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
            <span className="text-xl font-bold text-white">Renzo Mequista</span>
            <span className="text-gray-200">Administrador</span>
          </div>
        </div>
        <nav>
          <Accordion.Root type="single" defaultValue="item-1" collapsible>
            <HasAccess allowedRole="admin" roles={user.roles}>
              <MenuAccordionItem
                value="item-1"
                label="Professores"
                icon={ChalkboardSimple}
              >
                <MenuAccordionItemLink
                  href="/dashboard/professors/new"
                  label="Cadastrar professor"
                />
                <MenuAccordionItemLink
                  href="/dashboard/professors/list"
                  label="Lista de professores"
                />
              </MenuAccordionItem>
              <MenuAccordionItem value="item-2" label="Alunos" icon={Student}>
                <MenuAccordionItemLink
                  href="/dashboard/students/new"
                  label="Cadastrar aluno"
                />
                <MenuAccordionItemLink
                  href="/dashboard/students/list"
                  label="Lista de alunos"
                />
              </MenuAccordionItem>
              <MenuAccordionItem
                value="item-3"
                label="Disciplinas"
                icon={BookBookmark}
              >
                <MenuAccordionItemLink href="/" label="Cadastrar disciplina" />
                <MenuAccordionItemLink href="/" label="Lista de disciplinas" />
              </MenuAccordionItem>
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
