import { useState } from "react";
import { imageUrl } from "../api";
import Star from "./Star";

/**
 * <img> that falls back to a girih-pattern panel when the source is
 * missing, broken, or the backend has no file for it.
 */
export default function SmartImage({
  src,
  alt,
  className,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);
  const url = imageUrl(src);

  if (!url || broken) {
    return (
      <div className={`fallback-media ${className ?? ""}`} role="img" aria-label={alt}>
        <Star className="h-16 w-16" main="#f0d38a" accent="#0e1a40" />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
}
