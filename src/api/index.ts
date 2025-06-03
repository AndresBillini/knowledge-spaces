/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardModel, Note, PaginationCards } from "@/models/Card";

const API = '/api/proxy';

export async function getCards(page: string = '1', search: string = '', nextPage?: string): Promise<PaginationCards> {
  const url = `${API}/cards?page=${page}&search=${search}`;

  try {
    const res = await fetch(nextPage || url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch cards: ${error}`);
    return {
      count: 0,
      current_page: 0,
      total_pages: 0,
      page_size: 0,
      results: []
    };
  }
}

export async function getCardById(id: number): Promise<CardModel | null> {
  try {
    const res = await fetch(`${API}/cards/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch card: ${error}`);
    return null;
  }
}

export async function getRelatedCards(cardId: number): Promise<CardModel[]> {
  try {
    const res = await fetch(`${API}/cards/related/${cardId}`);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(`Failed to fetch related cards: ${error}`);
    return [];
  }
}

export async function addRelatedCard(cardId: number, relatedCardId: number): Promise<string> {
  try {
    const res = await fetch(`${API}/cards/add_related_card/${cardId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(relatedCardId),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return 'Failed to add related card';
  }
}

export async function removeRelatedCard(cardId: number, relatedCardId: number): Promise<string> {
  try {
    const res = await fetch(`${API}/cards/remove_related_card/${cardId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(relatedCardId),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return 'Failed to remove related card';
  }
}

export async function getNotes(): Promise<Note[]> {
  try {
    const res = await fetch(`${API}/notes`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch notes: ${error}`);
    return [];
  }
}