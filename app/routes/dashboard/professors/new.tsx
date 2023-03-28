import { InputGroup } from "~/components/InputGroup.";

function NewProfessor() {
  return (
    <>
      <h1 className="text-xl text-gray-800">
        Professores / Cadastrar professor
      </h1>
      <div className="bg-white drop-shadow-default mt-4 rounded-lg">
        <div className="py-6 px-16 border-b border-gray-200">
          <h3 className="text-2xl text-gray-800 ">Cadastrar professor</h3>
        </div>
        <form className="flex flex-col gap-3 px-16 py-8" action="">
          <InputGroup
            name="name"
            label="Nome"
            placeholder="Digite o nome do professor"
          />
          <InputGroup
            name="email"
            label="Email"
            placeholder="Digite o email do professor"
          />
          <InputGroup
            name="id"
            label="Matrícula"
            placeholder="Digite a matrícula do professor"
          />
          <div className="flex gap-4 mt-2">
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-4 rounded-lg"
            >
              Salvar
            </button>
            <button
              type="button"
              className="w-full border border-red-500 text-red-500 font-bold py-4 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewProfessor;
