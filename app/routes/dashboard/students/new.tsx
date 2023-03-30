import { Form } from "@remix-run/react";
import { Button } from "~/components/Button";
import { InputGroup } from "~/components/InputGroup";
import { PageCard } from "~/components/PageCard";

function NewStudent() {
  return (
    <>
      <h1 className="text-xl text-gray-800">Alunos / Cadastrar aluno</h1>
      <PageCard title="Cadastrar aluno">
        <Form className="flex flex-col gap-3 px-16 py-8" method="post">
          <div className="grid grid-cols-2 gap-6">
            <InputGroup
              name="name"
              label="Nome"
              placeholder="Digite o nome do aluno"
            />
            <InputGroup
              name="email"
              label="Email"
              placeholder="Digite o email do aluno"
            />
            <InputGroup
              name="id"
              label="Matrícula"
              placeholder="Digite a matrícula do aluno"
            />
            <InputGroup
              name="major"
              label="Curso"
              placeholder="Digite o curso do aluno"
            />
          </div>
          <div className="flex gap-4 mt-2 max-w-[50%] w-full ml-auto">
            <Button type="submit" className="flex items-center justify-center">
              {/* {isSubmitting && <Spinner />} */}
              Salvar
            </Button>
            <Button type="button" variant="danger">
              Cancelar
            </Button>
          </div>
        </Form>
      </PageCard>
    </>
  );
}

export default NewStudent;
