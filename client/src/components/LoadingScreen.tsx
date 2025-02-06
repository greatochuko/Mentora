import LoadingIndicator from "./LoadingIndicator";

export default function LoadingScreen() {
  return (
    <main className="flex h-full w-full flex-1 items-center justify-center">
      <LoadingIndicator color="#000" />
    </main>
  );
}
