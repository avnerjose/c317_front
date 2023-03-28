import { Outlet } from "@remix-run/react";
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

function Dashboard() {
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
            <MenuAccordionItem
              value="item-1"
              label="Professores"
              icon={ChalkboardSimple}
            >
              <MenuAccordionItemLink href="/" label="Cadastrar professor" />
              <MenuAccordionItemLink href="/" label="Lista de professores" />
            </MenuAccordionItem>
            <MenuAccordionItem value="item-2" label="Alunos" icon={Student}>
              <MenuAccordionItemLink href="/" label="Cadastrar aluno" />
              <MenuAccordionItemLink href="/" label="Lista de alunos" />
            </MenuAccordionItem>
            <MenuAccordionItem
              value="item-3"
              label="Disciplinas"
              icon={BookBookmark}
            >
              <MenuAccordionItemLink href="/" label="Cadastrar disciplina" />
              <MenuAccordionItemLink href="/" label="Lista de disciplinas" />
            </MenuAccordionItem>
          </Accordion.Root>
        </nav>

        <button className="flex gap-4 border-t border-t-gray-200 mt-auto px-6 py-5 w-full transition-colors hover:bg-gray-900">
          <SignOut size={24} className="text-white" />
          <span className="text-white text-xl">Sair</span>
        </button>
      </aside>
      <main className="bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
