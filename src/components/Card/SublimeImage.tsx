/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { SublimeImageContent } from "@/models/Card";

interface SublimeImageProps {
  sublimeImage: SublimeImageContent;
}

export default function SublimeImage({ sublimeImage }: SublimeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!sublimeImage.url || hasError) return null;

  return (
    <img
      className="card-image"
      src={sublimeImage.url}
      alt={sublimeImage.title}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}