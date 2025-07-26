"use client";

import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconBrandSpotify, IconBrandSpotifyFilled } from "@tabler/icons-react";

// Interfaces, fetcher, and icons (no changes here)
interface FormattedTrackData {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  previewUrl: string | null;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PlayIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
  </svg>
);
const PauseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" fill="currentColor" />
  </svg>
);

export default function NowPlaying() {
  const { data, error, isLoading } = useSWR<FormattedTrackData>(
    "/api/now-playing",
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null); // Ref to measure text width
  const [isHovered, setIsHovered] = useState(false);

  // Logic to handle audio playback and state reset (no changes here)
  const togglePreview = () => {
    if (audioRef.current) {
      if (isPreviewPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPreviewPlaying(!isPreviewPlaying);
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPreviewPlaying(false);
    }
  }, [data?.songUrl]);

  if (error) return <div className="text-sm">Failed to load</div>;
  if (isLoading || !data) return <>{""}</>;

  // NEW: Decide to use marquee based on title length
  const isLongTitle = data.title.length > 30;

  // Calculate the distance to animate for the marquee
  const animationDistance = -(titleTextRef.current?.scrollWidth ?? 0) - 16;

  return (
    <div
      className="relative flex items-center gap-3 p-2 border rounded-lg max-w-xs w-full bg-white/80 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {data.previewUrl && <audio ref={audioRef} src={data.previewUrl} />}

      {/* Album Art & Play Button */}
      <div className="relative flex-shrink-0">
        <Image
          src={data.albumImageUrl}
          alt={data.title}
          width={60}
          height={60}
          className="rounded-md w-14 h-14 shadow-lg"
          unoptimized
        />
        {data.previewUrl && (
          <button
            onClick={togglePreview}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-md transition-opacity opacity-0 hover:opacity-100"
          >
            {isPreviewPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        )}
      </div>

      {/* Song Info & Marquee */}
      <div className="flex-grow min-w-0 overflow-hidden">
        <motion.div
          className="whitespace-nowrap"
          // Animate based on hover and if the title is long
          animate={{ x: isHovered && isLongTitle ? animationDistance : 0 }}
          // Dynamic transition for smooth hover and unhover
          transition={{
            x: {
              repeat: isHovered && isLongTitle ? Infinity : 0,
              repeatType: "loop",
              duration: isHovered && isLongTitle ? 10 : 2,
              ease: isHovered && isLongTitle ? "linear" : "easeOut",
            },
          }}
        >
          <Link
            href={data.songUrl}
            target="_blank"
            className="font-semibold text-sm hover:!underline underline"
          >
            <span ref={titleTextRef} className="inline-block">
              {data.title}
              {isLongTitle && <span className="px-8">{data.title}</span>}
            </span>
          </Link>
        </motion.div>
        <p className="text-xs text-slate-600 truncate">{data.artist}</p>
        <p
          className={`text-xs scale-95 origin-left ${data.isPlaying ? "text-green-500" : "text-slate-500"}`}
        >
          {data.isPlaying ? "Now Playing" : "Recently Played"}
        </p>
      </div>

      {/* NEW: Absolutely Positioned Spotify Icon */}
      <div className="absolute bottom-2 right-2">
        <Link href={data.songUrl} target="_blank">
          <IconBrandSpotifyFilled
            stroke={1.25}
            className="w-5 h-5 text-slate-300 hover:text-green-500 transition-colors"
          />
        </Link>
      </div>
    </div>
  );
}
