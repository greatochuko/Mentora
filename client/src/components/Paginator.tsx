import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

export default function Paginator({
  page,
  gotoPage,
  totalPages,
}: {
  page: number;
  gotoPage(page: number): void;
  totalPages: number;
}) {
  return (
    <div className="mx-auto mt-8 flex items-center gap-2">
      <button
        onClick={() => {
          const currentPage = page;
          if (!page || currentPage <= 1) return;
          gotoPage(currentPage - 1);
        }}
        disabled={!page || page <= 1}
        className="rounded-full border border-zinc-300 bg-white p-3 duration-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        <PiCaretLeftBold className="h-4 w-4" />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => gotoPage(index + 1)}
          className={`h-10 w-10 rounded-full font-semibold duration-300 hover:bg-zinc-100 ${(!page && index === 0) || page === index + 1 ? "text-blue-600" : ""}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => {
          const currentPage = page;
          if (currentPage >= totalPages) return;
          gotoPage(currentPage + 1);
        }}
        disabled={page >= totalPages}
        className="rounded-full border border-zinc-300 bg-white p-3 duration-300 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        <PiCaretRightBold className="h-4 w-4" />
      </button>
    </div>
  );
}
