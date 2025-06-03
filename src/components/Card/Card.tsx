"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleCard } from "@/redux/slices/savedCardsSlice";
import { CardModel } from "@/models/Card";
import Article from "./Article";
import Social from "./Social";
import SublimePost from "./SublimePost";
import SublimeImage from "./SublimeImage";
import SublimeVideo from "./SublimeVideo";
import AddIcon from "@/components/Icons/add.svg";
import CheckIcon from "@/components/Icons/check.svg";
import { saveCardId } from "@/redux/slices/navigationSlice";
import "./card.css"

interface CardProps {
  card: CardModel;
  disableClick?: boolean
  disableUserSelect?: boolean
  isKnowledgeCard?: boolean
}

export default function Card({ card, disableClick, disableUserSelect, isKnowledgeCard }: CardProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const savedCards = useSelector((state: RootState) => state.savedCards.savedCards);
  const isSaved = savedCards.find((savedCard) => savedCard.id === card.id);

  const handleRedirect = () => {
    dispatch(saveCardId(card.id));
    router.push(`/cards/${card.slug}`);
  };

  const getHostname = (link: string): string => {
    const url = new URL(link);
    return url.hostname;
  }

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleCard(card));
  };

  const getContent = () => {
    const { content, card_type: cardType } = card;

    switch (cardType) {
      case 'article':
        return <Article article={content} disableUserSelect={disableUserSelect} getHostname={getHostname} />;
      case 'social':
        return <Social social={content} disableUserSelect={disableUserSelect} getHostname={getHostname} />;
      case 'sublime_post':
        return <SublimePost post={content} disableUserSelect={disableUserSelect} />
      case 'sublime_image':
        return <SublimeImage sublimeImage={content} />
      case 'sublime_video':
        return <SublimeVideo video={content} />
    }
  }

  return (
    <div 
      className={`card-container ${disableClick ? "not-clickable" : ""} ${isKnowledgeCard ? "is-knowledge-card" : ""}`}
      role="link" tabIndex={disableClick ? -1 : 0}
      onClick={disableClick ? undefined : handleRedirect}
      onKeyDown={disableClick ? undefined : (e) => e.key === "Enter" && handleRedirect()}
    >
      { getContent() }

      <div className="card-footer">
        {
          (card.card_type !== 'sublime_image' && card.content.author) && (
            <span className={`card-author ${disableUserSelect ? "disable-user-select" : ""}`}>{card.content.author}</span>
          )
        }
        <button
          className={`save-button ${disableUserSelect ? "disable-user-select" : ""}`}
          onClick={handleSaveClick}
          aria-label={isSaved ? "Remove from my collection" : "Add to my collection"}
        >
          {isSaved 
            ? <Image src={CheckIcon} alt="Check icon" width={20} height={20} title="Remove from my collection" /> 
            : <Image src={AddIcon} alt="Add icon" width={20} height={20} title="Add to my collection" />
          }
        </button>
      </div>
    </div>
  );
}