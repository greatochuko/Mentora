export default function ModalContainer({
  open,
  closeModal,
  children,
}: {
  open: boolean;
  closeModal(): void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`fixed top-0 left-0 z-30 h-full w-full bg-black/30 backdrop-blur-xs duration-200 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      onClick={closeModal}
    >
      {children}
    </div>
  );
}
