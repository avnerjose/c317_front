import type { PropsWithChildren } from "react";

export function THead({ children }: PropsWithChildren) {
  return <thead className="bg-gray-100">{children}</thead>;
}
