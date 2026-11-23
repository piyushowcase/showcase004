import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/fullstack-spotify-assets/assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { UserData } from "../context/User";
import { FaBookmark, FaPause, FaPlay } from "react-icons/fa";

function DisplayAlbum({ album }) {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);

  const {
    playWithId,
    albumsData,
    songsData,
    track,
    playStatus,
    Play,
    Pause,
    audioRef,
    setPlayStatus,
  } = useContext(PlayerContext) || {};

  const { addToPlaylist, user } = UserData() || {};

  useEffect(() => {
    if (Array.isArray(albumsData)) {
      const matchedAlbum = albumsData.find(
        (item) => String(item._id) === String(id)
      );
      setAlbumData(matchedAlbum || album || null);
    } else if (album) {
      setAlbumData(album);
    }
  }, [albumsData, id, album]);

  const activeAlbum = albumData || album;
  const albumName = activeAlbum?.name || "";

  const albumSongs = Array.isArray(songsData)
    ? songsData.filter(
        (item) =>
          item?.album === albumName ||
          (activeAlbum?._id && String(item?.albumId) === String(activeAlbum._id))
      )
    : [];

  const handleSavePlaylist = (e, songId) => {
    e.stopPropagation();
    if (!songId || typeof addToPlaylist !== "function") return;
    addToPlaylist(songId);
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

  if (!albumsData || !activeAlbum) {
    return null;
  }

  const savedIds = new Set(
    Array.isArray(user?.playlist)
      ? user.playlist.map((songId) => String(songId))
      : []
  );

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img
          className="w-48 h-48 object-cover rounded"
          src={activeAlbum.image}
          alt={activeAlbum.name || "Album cover"}
        />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {activeAlbum.name}
          </h2>
          <h4>{activeAlbum.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5 mr-1"
              src={assets.spotify_logo}
              alt="Spotify logo"
            />
            <b>Spotify</b>
            {" • "}1,323,153 likes
            {" • "}
            <b>{albumSongs.length} Songs,</b> about 2 hr 30 mins
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 mt-10 mb-2 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date added</p>
        <p className="text-center hidden sm:block">Duration</p>
        <p className="text-center">Actions</p>
      </div>
      <hr className="border-[#2a2a2a]" />

      {albumSongs.map((item, index) => {
        const isSaved = item?._id ? savedIds.has(String(item._id)) : false;
        const showPause = Boolean(
          item?._id &&
            track &&
            String(track._id) === String(item._id) &&
            playStatus
        );

        return (
          <div
            onClick={(e) => handlePlayPauseSong(e, item._id)}
            key={item._id || index}
            className="grid grid-cols-3 sm:grid-cols-5 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded transition"
          >
            <div className="text-white flex items-center min-w-0 pr-2">
              <b className="mr-4 text-[#a7a7a7] shrink-0">{index + 1}</b>
              {item.image && (
                <img
                  className="inline w-10 h-10 object-cover rounded mr-4 shrink-0"
                  src={item.image}
                  alt={item.name || "Song image"}
                />
              )}
              <span
                className={`truncate ${
                  showPause ? "text-[#1db954]" : "text-white"
                }`}
              >
                {item.name}
              </span>
            </div>

            <p className="text-[15px] truncate pr-2">{activeAlbum.name}</p>

            <p className="text-[15px] hidden sm:block">5 days ago</p>

            <p className="text-[15px] text-center hidden sm:block">
              {item.duration}
            </p>

            <div className="flex justify-center items-center gap-5">
              <button
                type="button"
                onClick={(e) => handleSavePlaylist(e, item._id)}
                className={`text-[15px] cursor-pointer transition ${
                  isSaved ? "text-[#1db954]" : "text-white hover:text-[#1db954]"
                }`}
                title={isSaved ? "Saved in playlist" : "Save to playlist"}
              >
                <FaBookmark />
              </button>

              <button
                type="button"
                onClick={(e) => handlePlayPauseSong(e, item._id)}
                className={`text-[15px] cursor-pointer transition ${
                  showPause
                    ? "text-[#1db954]"
                    : "text-white hover:text-[#1db954]"
                }`}
                title={showPause ? "Pause song" : "Play song"}
              >
                {showPause ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default DisplayAlbum;