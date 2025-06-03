/* eslint-disable @next/next/no-img-element */
import { SocialContent } from "@/models/Card";

interface SocialProps {
  social: SocialContent;
  disableClick?: boolean;
  disableUserSelect?: boolean;
  getHostname: (link: string) => string
}

export default function Social({ social, disableUserSelect, getHostname }: SocialProps) {
  const firstVideo = social.videos?.[0];

  return (
    <>
      {
        (social.images && social.images.length > 0) && (
          <img className="card-image" src={social.images[0]} alt={social.title} loading="lazy" />
        )
      }
      {
        firstVideo?.video_url && (
          <video
            className="social-video"
            controls
            poster={firstVideo.thumbnail}
            preload="metadata"
            width="100%"
          >
          <source src={firstVideo.video_url} type="video/mp4" />
          <track kind="captions" label="English captions" srcLang="en" src="" default />
          Your browser does not support the video tag.
        </video>
        )
      }
      {
        social.text && (
          <p className={`card-description ${disableUserSelect ? "disable-user-select" : ""}`}>{social.text}</p>
        )
      }
      {
        social.url && (
          <a 
            href={social.url} target="_blank" rel="noreferrer"
            className={`card-url ${disableUserSelect ? "disable-user-select" : ""}`} 
            onClick={(e) => e.stopPropagation()}
          >
            {getHostname(social.url)}
          </a>
        )
      }
    </>
  );
}