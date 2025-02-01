export default function Header() {
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <header>
      <span>FobeworkLMS</span>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search your courses here..." />
      </form>
    </header>
  );
}
