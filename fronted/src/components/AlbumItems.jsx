// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const AlbumItems = ({image,name,desc,id}) => {
// console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
//     const navigate=useNavigate();
//   return (
    
//     <div onClick={()=>navigate(`/album/${id}`)} className='min-w-[180px] p-2 px-3 rounded cursr-pointer hover:bg-[#ffffff26]'>
//       <img className='rounded' src={image} alt="" />
//     <p className='font-bold mt-2 mb-1'>{name}</p>
// <p className='text-slate-200 text-sm '>{desc}</p>

//       </div>
//   )
// }

// export default AlbumItems
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumItems = React.memo(({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="w-[180px] shrink-0 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img
        className="w-full aspect-square object-cover rounded"
        src={image}
        alt={name || 'Album cover'}
      />
      <p className="font-bold mt-2 mb-1 truncate">{name}</p>
      <p className="text-slate-200 text-sm line-clamp-2">{desc}</p>
    </div>
  );
});

export default AlbumItems;

export default AlbumItems;
