import type { PropsWithChildren } from "react";
import { AppTable } from "../AppTable";

export function Table({ children }: PropsWithChildren) {
  return (
    <AppTable.Table>
      <AppTable.THead>
        <tr>
          <AppTable.Th>Nome</AppTable.Th>
          <AppTable.Th>Código</AppTable.Th>
          <AppTable.Th>Professor</AppTable.Th>
          <AppTable.Th></AppTable.Th>
        </tr>
      </AppTable.THead>
      <tbody>{children}</tbody>
    </AppTable.Table>
  );
}
