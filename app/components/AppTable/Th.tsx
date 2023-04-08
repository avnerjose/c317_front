import type { PropsWithChildren } from "react";

export function Th({ children }: PropsWithChildren) {
  return (
    <th className="border border-gray-200 text-left px-4 py-3 text-gray-800">
      {children}
    </th>
  );
}
