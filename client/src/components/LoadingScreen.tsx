import LoadingIndicator from "./LoadingIndicator";

export default function LoadingScreen() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <LoadingIndicator color="#000" />
    </div>
  );
}
