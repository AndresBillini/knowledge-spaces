import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CardModel } from "@/models/Card";
import { getCards } from "@/api";
import "./search-bar.css";

interface SearchBarProps {
  setCards: Dispatch<SetStateAction<CardModel[]>>;
  setNextPageUrl: Dispatch<SetStateAction<string | undefined>>;
}

export default function SearchBar({ setCards, setNextPageUrl }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    router.replace(`/?search=${value}`);
    setCards([]);
    setNextPageUrl(undefined);
    const data = await getCards("1", value);
    setCards(data.results);
    setNextPageUrl(data.next);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const search = searchParams.get("search") || "";
      const page = searchParams.get("page") || "1";
      const data = await getCards(page, search);
      setCards(data.results);
      setNextPageUrl(data.next);
    };

    fetchInitialData();
  }, []);

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