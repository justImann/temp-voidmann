import { NextResponse } from "next/server";

// Type definitions - Allow 'item' to be null
interface SpotifyTrack {
  is_playing: boolean;
  item: {
    name: string;
    artists: { name: string }[];
    album: {
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
    preview_url: string | null;
  } | null; // <-- Allow item to be null
}

interface FormattedTrackData {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  previewUrl: string | null;
}

// Environment variables and other constants (no changes)
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;

const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token!,
    }),
    cache: "no-store",
  });
  return response.json();
};

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // Handle case where a song OR an ad is playing
    if (nowPlayingResponse.status === 200) {
      const song: SpotifyTrack = await nowPlayingResponse.json();

      // THE FIX: Check if song.item is not null. If it is, an ad is playing.
      if (song.item) {
        const data: FormattedTrackData = {
          isPlaying: song.is_playing,
          title: song.item.name,
          artist: song.item.artists.map((artist) => artist.name).join(", "),
          albumImageUrl: song.item.album.images[0]?.url ?? "/placeholder.png",
          songUrl: song.item.external_urls.spotify,
          previewUrl: song.item.preview_url,
        };
        return NextResponse.json(data);
      }
    }

    // FALLBACK: If nothing is playing (204) or an ad is playing (200 with null item),
    // get the most recently played track.
    const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!recentlyPlayedResponse.ok) {
      throw new Error("Failed to fetch recently played track");
    }

    const recentJson = await recentlyPlayedResponse.json();
    const recentTrack = recentJson.items[0].track;

    const data: FormattedTrackData = {
      isPlaying: false,
      title: recentTrack.name,
      artist: recentTrack.artists
        .map((artist: { name: string }) => artist.name)
        .join(", "),
      albumImageUrl: recentTrack.album.images[0]?.url ?? "/placeholder.png",
      songUrl: recentTrack.external_urls.spotify,
      previewUrl: recentTrack.preview_url,
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
