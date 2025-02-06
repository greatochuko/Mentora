export default function CourseCardWireframe({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`rounded-md border border-zinc-300 p-1.5 shadow ${className}`}
    >
      <div className="aspect-video animate-pulse rounded-sm bg-zinc-300"></div>
      <div className="flex flex-col gap-2 py-2">
        <div className="mb-2 h-4 w-20 animate-pulse rounded-md bg-zinc-300"></div>
        <div className="h-4 w-full animate-pulse rounded-md bg-zinc-300"></div>
        <div className="mb-2 h-4 w-7/10 animate-pulse rounded-md bg-zinc-300"></div>
        <div className="h-4 w-16 animate-pulse rounded-md bg-zinc-300"></div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 animate-pulse rounded-md bg-zinc-300"></div>
          <button className="rounded-full bg-blue-500 px-3 py-1.5 text-sm font-medium text-white duration-200 hover:bg-blue-600">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
