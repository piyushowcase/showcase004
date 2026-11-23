// import React from 'react'
// import { assets } from '../assets/fullstack-spotify-assets/assets/frontend-assets/assets'
// import { useNavigate } from 'react-router-dom'

// const Navbar = () => {
//     const navigate=useNavigate()
//   return (
//   <>
//   <div className='w-full flex justify-between items-center font-semibold'>
//     <div className='flex items-center gap-2 '>
//         <img onClick={()=>navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
//         <img onClick={()=>navigate(+1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />

//     </div>
//     <div className='flex items-center gap-4'>
//         <p className='bg-white text-black text-[15px] py-1 px-4 rounded-2xl hidden md:block cursor-pointer '>Explore Premium</p>
//    <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer '>Install App</p>
//    <p className='bg-purple-500 text-black w-7 h-7 rounded-full flex itmes-center justify-center'>A</p>
//     </div>
//     </div>
//     <div className='flex items-center gap-2 mt-4 '>
//         <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
//         <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
//             <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>

//     </div>
//     </>
//   )
// }

// export default Navbar
// import React from "react";
// import { assets } from "../assets/fullstack-spotify-assets/assets/frontend-assets/assets";
// import { useNavigate } from "react-router-dom";
// import { UserData } from "../context/User";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { logoutUser } = UserData();
//   return (
//     <>
//       <div className="w-full flex justify-between items-center font-semibold">
//         <div className="flex items-center gap-2">
//           <img
//             src={assets.arrow_left}
//             className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
//             alt=""
//             onClick={() => navigate(-1)}
//           />
//           <img
//             src={assets.arrow_right}
//             className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
//             alt=""
//             onClick={() => navigate(+1)}
//           />
//         </div>
//         <div className="flex items-center gap-4">
//           <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
//             Explore Premium
//           </p>
//           <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
//             Install App
//           </p>
//           <p
//             className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer"
//             onClick={logoutUser}
//           >
//             Logout
//           </p>
//         </div>
//       </div>
//       <div className="flex items-center gap-2 mt-4">
//         <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
//           All
//         </p>
//         <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
//           Music
//         </p>
//         <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
//           Podcasts
//         </p>
//         <p
//           onClick={() => navigate("/playlist")}
//           className="bg-black px-4 py-1 rounded-2xl cursor-pointer  md:hidden"
//         >
//           PlayList
//         </p>
//       </div>
//     </>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { assets } from "../assets/fullstack-spotify-assets/assets/frontend-assets/assets";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = UserData();
  const [openMenu, setOpenMenu] = useState(false);

  const initial = (
    user?.name?.trim()?.[0] ||
    user?.email?.trim()?.[0] ||
    "U"
  ).toUpperCase();

  const handleLogout = () => {
    setOpenMenu(false);
    logoutUser();
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            src={assets.arrow_left}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            alt=""
            onClick={() => navigate(-1)}
          />
          <img
            src={assets.arrow_right}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            alt=""
            onClick={() => navigate(+1)}
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>
      <a
  href="https://spotify.com"
  target="_blank"
  rel="noopener noreferrer"
  className="hidden md:block"
>
  <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer">
    Install App
  </p>
</a>
          {/* User Alphabet Avatar + Dropdown Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((prev) => !prev)}
              className="w-8 h-8 rounded-full bg-green-500 text-black font-bold text-sm flex items-center justify-center cursor-pointer select-none"
              title={user?.email || "User profile"}
            >
              {initial}
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#242424] text-white rounded-md shadow-lg border border-neutral-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-neutral-700">
                  <p className="text-xs text-neutral-400">Signed in as</p>
                  <p className="text-sm font-medium truncate">
                    {user?.email || "No email"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-neutral-700 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
          Music
        </p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hidden md:block">
          Podcasts
        </p>
        <p
          onClick={() => navigate("/playlist")}
          className="bg-black px-4 py-1 rounded-2xl cursor-pointer md:hidden"
        >
          PlayList
        </p>
      </div>
    </>
  );
};

export default Navbar;