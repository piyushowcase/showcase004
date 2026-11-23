import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { assets } from "../assets/fullstack-spotify-assets/assets/frontend-assets/assets";
import { FaBookmark, FaMusic, FaPause, FaPlay } from "react-icons/fa";
import { UserData } from "../context/User";
import { PlayerContext } from "../context/PlayerContext";

const PlayList = ({ user }) => {
  const navigate = useNavigate();

  const {
    playWithId,
    Play,
    Pause,
    playStatus,
    setPlayStatus,
    track,
    audioRef,
    songsData,
  } = useContext(PlayerContext) || {};

  const { addToPlaylist } = UserData() || {};
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    if (Array.isArray(songsData) && user && Array.isArray(user.playlist)) {
      const playlistIds = new Set(user.playlist.map((id) => String(id)));
      const filteredSongs = songsData.filter(
        (e) => e?._id && playlistIds.has(String(e._id))
      );
      setMyPlaylist(filteredSongs);
    } else {
      setMyPlaylist([]);
    }
  }, [songsData, user, user?.playlist]);

  const handlePlayPauseSong = (e, id) => {
    if (e) e.stopPropagation();
    if (!id) return;

    const isSameTrack = track && String(track._id) === String(id);
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
      playWithId(id);
    }
  };

  const savePlayListHandler = (e, id) => {
    if (e) e.stopPropagation();
    if (!id || typeof addToPlaylist !== "function") return;
    addToPlaylist(id);
  };

  const hasSongs = myPlaylist.length > 0;
  const hasCustomCover = Boolean(hasSongs && myPlaylist[0]?.image);
  const coverImage = hasCustomCover
    ? myPlaylist[0].image
    : assets.spotify_logo;

  return (
    <Layout>
      <div className="mt-8 flex gap-6 md:gap-8 flex-col md:flex-row md:items-end">
        <img
          src={coverImage}
          className={`w-44 h-44 md:w-48 md:h-48 rounded-md shadow-lg shrink-0 ${
            hasCustomCover
              ? "object-cover bg-[#181818]"
              : "object-contain bg-[#282828] p-5"
          }`}
          alt={`${user?.name || "User"} Playlist cover`}
        />

        <div className="flex flex-col text-white">
          <p className="text-xs uppercase tracking-wider text-[#b3b3b3] mb-1">
            Playlist
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-3">
            {user?.name || "User"} PlayList
          </h2>
          <h4 className="text-sm text-[#b3b3b3]">
            {hasSongs
              ? "Your Favourate songs"
              : "No songs saved yet — your playlist is ready"}
          </h4>
          <div className="mt-3 flex items-center gap-2 text-xs text-[#b3b3b3]">
            <img
              src={assets.spotify_logo}
              className="inline-block w-5 h-5 object-contain"
              alt="Spotify logo"
            />
            <span className="font-semibold text-white">Spotify</span>
            {hasSongs && (
              <span>
                • {myPlaylist.length}{" "}
                {myPlaylist.length === 1 ? "song" : "songs"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1.5fr_1fr_auto] sm:grid-cols-[1.6fr_1fr_1.4fr_auto] gap-4 mt-8 pb-2 px-3 text-xs uppercase tracking-wider text-[#a7a7a7]">
        <p className="flex items-center">
          <span className="w-6 mr-3 text-center">#</span>
          <span>Title</span>
        </p>
        <p className="truncate">Artist</p>
        <p className="hidden sm:block truncate">Description</p>
        <p className="w-20 text-center">Actions</p>
      </div>
      <hr className="border-[#2a2a2a]" />

      {!hasSongs ? (
        <div className="mt-8 mb-8 p-8 rounded-lg bg-[#181818] border border-[#2a2a2a] flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#282828] flex items-center justify-center text-[#1db954] text-lg">
            <FaMusic />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Your playlist is empty
          </h3>
          <p className="text-sm text-[#a7a7a7] max-w-md">
            Click the bookmark icon on any song in an album or home list to save
            it to your playlist.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-2 px-5 py-2 rounded-full bg-[#1db954] text-black font-semibold text-sm hover:opacity-90 cursor-pointer transition"
          >
            Browse Songs
          </button>
        </div>
      ) : (
        <div className="mt-2 space-y-1">
          {myPlaylist.map((e, i) => {
            const titleText = e.name || e.title || "Untitled";
            const artistText = e.singer || e.artist || e.album || "none";
            const descText = e.desc || e.description || "";
            const isCurrentSong =
              track && String(track._id) === String(e._id);
            const showPause = Boolean(isCurrentSong && playStatus);

            return (
              <div
                onClick={(ev) => handlePlayPauseSong(ev, e._id)}
                className={`grid grid-cols-[1.5fr_1fr_auto] sm:grid-cols-[1.6fr_1fr_1.4fr_auto] gap-4 py-2.5 px-3 items-center text-sm rounded-md cursor-pointer transition group ${
                  isCurrentSong
                    ? "bg-[#ffffff1f] text-white"
                    : "text-[#b3b3b3] hover:bg-[#ffffff14]"
                }`}
                key={e._id || i}
              >
                <div className="flex items-center min-w-0">
                  <span className="w-6 mr-3 text-center text-xs text-[#a7a7a7] shrink-0">
                    {i + 1}
                  </span>
                  {e.image && (
                    <img
                      src={e.image}
                      className="w-10 h-10 object-cover rounded mr-3.5 shrink-0 bg-[#282828]"
                      alt={titleText}
                    />
                  )}
                  <span
                    className={`truncate font-medium ${
                      isCurrentSong ? "text-[#1db954]" : "text-white"
                    }`}
                  >
                    {titleText}
                  </span>
                </div>

                <p className="truncate text-[#b3b3b3]">{artistText}</p>

                <p className="hidden sm:block truncate text-[#a7a7a7]">
                  {descText.length > 28
                    ? `${descText.slice(0, 28)}...`
                    : descText}
                </p>

                <div className="w-20 flex justify-center items-center gap-2">
                  <button
                    type="button"
                    className="p-2 rounded-full text-[#1db954] hover:text-white hover:bg-white/10 cursor-pointer transition"
                    onClick={(ev) => savePlayListHandler(ev, e._id)}
                    title="Remove from playlist"
                  >
                    <FaBookmark className="text-sm" />
                  </button>
                  <button
                    type="button"
                    className={`p-2 rounded-full hover:bg-white/10 cursor-pointer transition ${
                      showPause
                        ? "text-[#1db954]"
                        : "text-white hover:text-[#1db954]"
                    }`}
                    onClick={(ev) => handlePlayPauseSong(ev, e._id)}
                    title={showPause ? "Pause song" : "Play song"}
                  >
                    {showPause ? (
                      <FaPause className="text-sm" />
                    ) : (
                      <FaPlay className="text-sm" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default PlayList;