import { Link } from "@remix-run/react";

interface EmptyStateProps {
  title: string;
  description: string;
  linkUrl: string;
  linkLabel: string;
}

export function EmptyState({
  description,
  linkLabel,
  linkUrl,
  title,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-10">
      <img className="w-60" src="/img/empty-state.jpg" alt="Empty state" />
      <h3 className="text-xl font-bold text-gray-700">{title}</h3>
      <p className="text-gray-500 max-w-[90%] text-center">{description}</p>

      <Link
        to={linkUrl}
        className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded-lg text-white text-sm font-bold mt-2"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
