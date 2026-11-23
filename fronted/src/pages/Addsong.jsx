import React, { useEffect, useState } from 'react'
import { assets } from '../assets/fullstack-spotify-assets/assets/admin-assets/assets.js'
import axios from 'axios'
import {url} from './Admin.jsx'
import { toast } from 'react-toastify'
const Addsong = () => {
    const [image,setImage]=useState(false);
    const [song,setSong]=useState(false)
    const [name,setName]=useState('')
    const [desc,SetDesc]=useState('')
    const[loading,setLoading]=useState(false)
    const [album,setAlbum]=useState("none")
    const [albumData,setAlbumData]=useState([])
    const onSubmitHandler=async(e)=>{
        setLoading(true)
e.preventDefault()
try {
    const formData=new FormData()
    formData.append('name',name)
        formData.append('desc',desc)
    formData.append('image',image)

    formData.append('audio',song)
    formData.append('album',album)
// In Addsong.jsx
const response = await axios.post(`${url}/api/song/add`, formData, {
  withCredentials: true,
});
if(response.data.success){
    toast.success("Song added")
    setName("")
    SetDesc("")
setImage(false)
setAlbum("none")
setSong(false)


}
else{
    toast.error("something went wrong")
}
} catch (error) {
    toast.error("Error occured")
    
}
setLoading(false)
    }
    const loadalbumData=async()=>{
        try {
            const response = await axios.get(`${url}/api/album/list`)
            console.log(response)
           if(response.data.success){

            setAlbumData(response.data.message)
            console.log(response.data.albums)
            console.log("hi")
            console.log(albumData)
            toast.success(response.data.message)
           }
           else{
            toast.error("unable to load albums data")
           }
        } catch (error) {
            console.error(error);
            toast.error("Error Occured")
            
        }
    }
    useEffect(()=>{
        loadalbumData();
    },[])
  return loading?(
    <div className='grid place-items-center min-h-[80vh]'>
        <div className= 'w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
    </div>
  ) :(
<form onSubmit={onSubmitHandler} action="" className='flex flex-col items-start gap-8 text-gray-600'>
    <div className='flex gap-8'>
        <div className='flex flex-col gap-4 '>
            <p>Upload Song</p>
            <input onChange={(e)=>setSong(e.target.files[0])} type="file"  id='song' accept="audio/*" hidden/>
            <label htmlFor="song"><img src={song? assets.upload_added: assets.upload_song} className='w-24 cursor-pointer ' alt="" /></label>
        </div>
<div className='flex flex-col gap-4 '>
            <p>Upload Image</p>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} id='image' accept="image/*" hidden/>
            <label htmlFor="image"><img src={image?URL.createObjectURL(image) : assets.upload_area} className='w-24 cursor-pointer ' alt="" /></label>
        </div>
    </div>
    <div>
        <p>Song name</p>
        <input  onChange={(e)=>setName(e.target.value)} value={name} type="text" className='bg-transparent outline-green-600  border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required/>
    </div>
     <div>
        <p>Song description</p>
        <input onChange={(e)=>SetDesc(e.target.value)} value={desc} type="text" className='bg-transparent outline-green-600  border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required/>
    </div>
    <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select onChange={(e)=>setAlbum(e.target.value)}  value={album} name="" id=""  className='bg-transparent outline-green-600  border-2 border-gray-400 p-2.5 w-[150px]' >
            <option value="none">None</option>
            {albumData?.map((item,index)=>(

                            <option key={index}  value={item.name}>{item.name}</option>

            ))}
        </select>
        <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer  '>Add</button>
    </div>
</form>  )
}

export default Addsong
