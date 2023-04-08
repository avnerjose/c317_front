import type { PropsWithChildren } from "react";

export function Table({ children }: PropsWithChildren) {
  return (
    <table className="border-collapse border rounded-t-sm outline outline-1 outline-gray-100 overflow-hidden">
      {children}
    </table>
  );
}
