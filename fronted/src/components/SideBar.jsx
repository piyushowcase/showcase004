import React from 'react';
import { assets } from '../assets/fullstack-spotify-assets/assets/frontend-assets/assets.js';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/User';
import PlayListCard from './PlaylistCard.jsx.jsx';

const SideBar = () => {
  const navigate = useNavigate();
  const { isAuth, user } = UserData();

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
          <img className="w-6" src={assets.home_icon} alt="Home" />
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="Search" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      <div className="bg-[#121212] h-[85%] rounded overflow-y-auto">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="Your Library" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5 cursor-pointer" src={assets.arrow_icon} alt="Expand" />
            <img className="w-5 cursor-pointer" src={assets.plus_icon} alt="Add" />
          </div>
        </div>

       <div onClick={() => navigate("/playlist")}>
          <PlayListCard />
        </div>

        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light text-sm">We'll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer">
            Browse Podcasts
          </button>
        </div>

        {isAuth && user?.role === 'admin' && (
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
            <h1>Admin</h1>
            <p className="font-light text-sm">Manage app songs</p>
            <button
              onClick={() => navigate('/admin/add-song1')}
              className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer"
            >
              Admin Power
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;