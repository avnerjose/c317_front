import * as Table from "./Table";

interface ProfessorsListTableProps {
  children: React.ReactNode;
}

export function ProfessorsListTable({ children }: ProfessorsListTableProps) {
  return (
    <Table.Table>
      <Table.THead>
        <tr>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Matrícula</Table.Th>
          <Table.Th></Table.Th>
        </tr>
      </Table.THead>
      <tbody>{children}</tbody>
    </Table.Table>
  );
}
