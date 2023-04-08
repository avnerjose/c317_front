import type { PropsWithChildren } from "react";
import { AppTable } from "../AppTable";

export function Table({ children }: PropsWithChildren) {
  return (
    <AppTable.Table>
      <AppTable.THead>
        <tr>
          <AppTable.Th>Nome</AppTable.Th>
          <AppTable.Th>E-mail</AppTable.Th>
          <AppTable.Th>Matrícula</AppTable.Th>
          <AppTable.Th>Curso</AppTable.Th>
          <AppTable.Th></AppTable.Th>
        </tr>
      </AppTable.THead>
      <tbody>{children}</tbody>
    </AppTable.Table>
  );
}
