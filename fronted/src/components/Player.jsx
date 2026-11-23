import React, { useContext, useState } from 'react';
import { assets } from '../assets/fullstack-spotify-assets/assets/frontend-assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const formatTime = (minute, second) => {
  const min = minute ?? 0;
  const sec = String(second ?? 0).padStart(2, '0');
  return `${min}:${sec}`;
};

const Player = () => {
  const {
    audioRef,
    seekBar,
    track,
    seekBg,
    seekSong,
    playStatus,
    Play,
    Pause,
    time,
    previous,
    next,
  } = useContext(PlayerContext) || {};

  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef?.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!track) return null;

  const currentMin = time?.currentTime?.minute ?? 0;
  const currentSec = time?.currentTime?.second ?? 0;
  const totalMin = time?.totalTime?.minute ?? 0;
  const totalSec = time?.totalTime?.second ?? 0;

  return (
    <div className="h-[10%] min-h-[72px] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4 min-w-[180px]">
        <img
          className="w-12 h-12 object-cover rounded"
          src={track.image}
          alt={track.name || 'Track cover'}
        />
        <div className="min-w-0">
          <p className="truncate font-medium">{track.name}</p>
          <p className="text-sm text-gray-400 truncate">
            {track.desc?.slice(0, 24)}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex items-center gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt="Shuffle"
          />
          <img
            onClick={previous}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="Previous"
          />
          {!playStatus ? (
            <img
              onClick={Play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="Play"
            />
          ) : (
            <img
              onClick={Pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="Pause"
            />
          )}
          <img
            onClick={next}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="Next"
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.loop_icon}
            alt="Loop"
          />
        </div>

        <div className="flex items-center gap-5">
          <p className="text-xs text-gray-300 w-9 text-right">
            {formatTime(currentMin, currentSec)}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-600 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-[#1db954] rounded-full"
            />
          </div>
          <p className="text-xs text-gray-300 w-9">
            {formatTime(totalMin, totalSec)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 min-w-[100px]">
        <input
          type="range"
          className="w-16 md:w-28 accent-[#1db954] cursor-pointer"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Volume"
        />
      </div>
    </div>
  );
};

export default Player;