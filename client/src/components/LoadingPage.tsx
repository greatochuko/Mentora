import LoadingIndicator from "./LoadingIndicator";

export default function LoadingPage({ className = "" }) {
  return (
    <main
      className={`flex h-dvh w-full flex-1 items-center justify-center ${className}`}
    >
      <LoadingIndicator color="#155dfc" size={28} />
    </main>
  );
}
