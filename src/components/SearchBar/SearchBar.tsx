import "./search-bar.css";

interface SearchBarProps {
  searchTerm: string;
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchBar({ searchTerm, handleSearchInput }: SearchBarProps) {
  return (
    <input
        type="text"
        placeholder="Lets explore..."
        value={searchTerm}
        onChange={handleSearchInput}
        className="search-bar"
      />
  );
}