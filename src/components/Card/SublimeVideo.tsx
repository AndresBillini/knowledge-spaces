/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { SublimeVideoContent } from "@/models/Card";

interface SublimeVideoProps {
  video: SublimeVideoContent;
}

export default function SublimeVideo({ video }: SublimeVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const getYoutubeVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  }

  const getVideoUrl = (url: string): string => {
    const videoId = getYoutubeVideoId(url);
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return (
    <div className="video-wrapper">
      {
        isPlaying
          ? (
            <iframe
              src={getVideoUrl(video.url)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              {
                video.thumbnail && (
                  <div 
                    className="thumbnail" 
                    role="button" tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(true)
                    }} 
                    onKeyDown={(e) => {
                      e.stopPropagation()
                      if (e.key === "Enter") setIsPlaying(true);
                    }}
                  >
                    <img src={video.thumbnail} alt={`YouTube thumbnail ${video.title}`} />
                    <div className="play-button">▶</div>
                  </div>
                )
              }
            </>
          ) 
      }
    </div>
  )
}