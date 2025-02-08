import LoadingIndicator from "./LoadingIndicator";

export default function LoadingPage() {
  return (
    <main className="flex h-full w-full flex-1 items-center justify-center">
      <LoadingIndicator color="#155dfc" size={28} />
    </main>
  );
}
