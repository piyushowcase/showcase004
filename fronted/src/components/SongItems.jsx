import React, { useContext, useEffect, useState } from "react";
import { FaBookmark, FaPause, FaPlay, FaRegBookmark } from "react-icons/fa";
import { UserData } from "../context/User";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ image, name, desc, id }) => {
  const [saved, setSaved] = useState(false);

  const {
    playWithId,
    track,
    playStatus,
    Play,
    Pause,
    audioRef,
    setPlayStatus,
  } = useContext(PlayerContext) || {};

  const { addToPlaylist, user } = UserData() || {};

  const playList = user?.playlist;

  useEffect(() => {
    if (Array.isArray(playList) && id) {
      setSaved(playList.some((songId) => String(songId) === String(id)));
    } else {
      setSaved(false);
    }
  }, [playList, id]);

  const savetoPlaylistHandler = (e) => {
    if (e) e.stopPropagation();
    if (!id) return;
    setSaved((prev) => !prev);
    if (typeof addToPlaylist === "function") {
      addToPlaylist(id);
    }
  };

  const handlePlayPauseSong = (e, songId) => {
    if (e) e.stopPropagation();
    if (!songId) return;

    const isSameTrack = track && String(track._id) === String(songId);
    const isPlaying = Boolean(playStatus);

    if (isSameTrack && isPlaying) {
      if (typeof Pause === "function") {
        Pause();
      } else if (audioRef?.current) {
        audioRef.current.pause();
        setPlayStatus?.(false);
      }
      return;
    }

    if (isSameTrack && !isPlaying) {
      if (typeof Play === "function") {
        Play();
      } else if (audioRef?.current) {
        audioRef.current.play().catch(() => {});
        setPlayStatus?.(true);
      }
      return;
    }

    if (typeof playWithId === "function") {
      playWithId(songId);
    }
  };

  const showPause = Boolean(
    track && String(track._id) === String(id) && playStatus
  );

  return (
    <div
      onClick={(e) => handlePlayPauseSong(e, id)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <div className="relative group">
        <img
          src={image}
          className="rounded w-[160px] h-[160px] object-cover"
          alt={name || "Song cover"}
        />

        <button
          type="button"
          className={`absolute bottom-2 right-12 bg-black/75 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer ${
            showPause
              ? "text-[#1db954]"
              : "text-white hover:text-[#1db954]"
          }`}
          onClick={(ev) => handlePlayPauseSong(ev, id)}
          title={showPause ? "Pause song" : "Play song"}
        >
          {showPause ? (
            <FaPause className="text-sm" />
          ) : (
            <FaPlay className="text-sm" />
          )}
        </button>

        <button
          type="button"
          className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          onClick={savetoPlaylistHandler}
          title={saved ? "Remove from playlist" : "Save to playlist"}
        >
          {saved ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      <p className="font-bold mt-2 mb-1 truncate">{name}</p>
      <p className="text-slate-200 text-sm truncate">{desc}</p>
    </div>
  );
};

export default SongItem;