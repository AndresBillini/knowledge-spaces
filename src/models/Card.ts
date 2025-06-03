export type CardType = 'article' | 'social' | 'sublime_image' | 'sublime_post' | 'sublime_video';

interface BaseCard {
  id: number;
  card_type: CardType;
  created_at: string;
  updated_at: string;
  related: number[];
  notes: Note[];
  slug?: string;
}

export interface Note {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;
  card: number;
}

export interface ArticleContent {
  url: string;
  title?: string;
  description?: string;
  author?: string;
  thumbnail?: string;
}

export interface ArticleCard extends BaseCard {
  card_type: 'article';
  content: ArticleContent;
}

export interface SocialContent {
  url: string;
  title?: string;
  text?: string;
  images?: string[];
  videos?: { video_url: string; thumbnail?: string }[];
  description?: string;
  author?: string;
}

export interface SocialCard extends BaseCard {
  card_type: 'social';
  content: SocialContent;
}

export interface SublimePostContent {
  text?: string;
  author?: string;
}

export interface SublimePostCard extends BaseCard {
  card_type: 'sublime_post';
  content: SublimePostContent;
}

export interface SublimeImageContent {
  card_type: 'sublime_image';
  title: string;
  url: string;
}

export interface SublimeImageCard extends BaseCard {
  card_type: 'sublime_image';
  content: SublimeImageContent;
}

export interface SublimeVideoContent {
  card_type: 'sublime_video';
  author?: string;
  description?: string;
  thumbnail?: string;
  title?: string;
  url: string;
}

export interface SublimeVideoCard extends BaseCard {
  card_type: 'sublime_video';
  content: SublimeVideoContent;
}

export type CardModel = ArticleCard | SocialCard | SublimePostCard | SublimeImageCard | SublimeVideoCard;

export interface PaginationCards {
  count: number;
  current_page: number;
  total_pages: number;
  page_size: number;
  results: CardModel[];
  next?: string;
  previous?: string;
}