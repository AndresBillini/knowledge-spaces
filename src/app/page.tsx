"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCards } from "@/api";
import SearchBar from "@/components/SearchBar/SearchBar";
import Spinner from "@/components/Spinner/Spinner";
import CardList from "@/components/CardList/CardList";
import { CardModel, PaginationCards } from "@/models/Card";
import "./page.module.css";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<CardModel[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const search = searchParams.get("search") || "";
      const page = searchParams.get("page") || "1";
      const data = await getCards(page, search);
      setCards(data.results);
      setNextPageUrl(data.next);
    };

    fetchInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);// Only for initial fetch

  const fetchMore = async (url: string) => {
    if (!url) return;

    const parsedUrl = new URL(url);
    const search = parsedUrl.searchParams.get("search") || "";
    const page = parsedUrl.searchParams.get("page") || "1";

    setIsLoading(true);
    const data: PaginationCards = await getCards(page, search);
    setCards((prev) => [...prev, ...data.results]);
    setNextPageUrl(data.next);
    setIsLoading(false);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && nextPageUrl) {
          timeout = setTimeout(() => fetchMore(nextPageUrl), 300);
        }
      },
      { rootMargin: "200px" }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, [nextPageUrl]);

  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    router.replace(`/?search=${value}`); // update the query params
    setCards([]);
    setNextPageUrl(undefined);
    const data = await getCards("1", value);
    setCards(data.results);
    setNextPageUrl(data.next);
  };

  return (
    <main className="main-container">
      <SearchBar searchTerm={searchTerm} handleSearchInput={handleSearchInput} />

      {cards.length > 0 && <CardList cards={cards} />}

      {!!nextPageUrl && (
        <>
          <div ref={observerRef} className="observer" />
          {isLoading && <Spinner />}
        </>
      )}

      {!nextPageUrl && <p className="no-more-results">No more results</p>}
    </main>
  );
}