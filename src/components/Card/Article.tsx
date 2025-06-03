/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ArticleContent } from "@/models/Card";

interface ArticleProps {
  article: ArticleContent;
  disableUserSelect?: boolean
  getHostname: (link: string) => string
}

function ArticleImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) return null;

  return (
    <img
      className="article-image"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

export default function Article({ article, disableUserSelect, getHostname }: ArticleProps) {
  return (
    <>
      <div className="article-container">
        <div className={`content-column ${article.thumbnail ? "margin" : ""}`}>
          <h2 className={`card-title ${disableUserSelect ? "disable-user-select" : ""}`}>{article.title}</h2>
          {
            article.description && (
              <p className={`card-description ${disableUserSelect ? "disable-user-select" : ""}`}>{article.description}</p>
            )
          }
          {
            article.url && (
              <a 
                href={article.url} target="_blank" rel="noreferrer" 
                className={`card-url ${disableUserSelect ? "disable-user-select" : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                {getHostname(article.url)}
              </a>
            )
          }
        </div>
        {
          article.thumbnail && (
            <div className="image-column">
              <ArticleImage src={article.thumbnail} alt={article.title || ""} />
            </div>
          )
        }
      </div>
    </>
  )
}