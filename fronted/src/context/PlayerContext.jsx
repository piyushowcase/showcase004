import React, { createContext, useRef, useState } from 'react'
// import { songsData } from '../src/assets/fullstack-spotify-assets/assets/frontend-assets/assets';
import axios from 'axios'
// import { toast } from 'react-toastify' 
import { useEffect } from 'react';
export const PlayerContext=createContext();
const PlayerContextProvider = (props) => {

  const audioRef=useRef()
  const seekBar=useRef()
  const seekBg=useRef()

  const url = "https://showcase004-2.onrender.com";
  const [songsData,setSongsData]=useState([])
  const [albumsData,setAlbumsData]=useState([])

  const [track,setTrack]=useState(null)
  const [playStatus,setPlayStatus]=useState(false)
  const [time,setTime]=useState({
    currentTime:{second:0,minute:0},
        totalTime:{second:0,minute:0}

  });
      const Play=()=>{
    audioRef.current.play()
setPlayStatus(true)
  }
  const Pause=()=>{
    audioRef.current.pause();
    setPlayStatus(false);

  }
  const playWithId= async(id) =>{
    await songsData.map((item)=>{
      if(id===item._id){
        setTrack(item);
      }
    })
   

await audioRef.current.play()
setPlayStatus(true)
  }
  const previous =async(id)=>{
    songsData.map(async(item,index)=>{
      if(track._id===item._id &&index>0){
          await setTrack (songsData[index-1])
    await audioRef.current.play()
    setPlayStatus(true)
      }
    })
    
    

  }
    const next =async(id)=>{
       songsData.map(async(item,index)=>{  
          if(track._id===item._id &&index<songsData.length-1){
          await setTrack (songsData[index+1])
    await audioRef.current.play()
    setPlayStatus(true)
      }}

    )
  }
      const seekSong= async(e)=>{
    console.log(e)
    audioRef.current.currentTime=((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)

  }
            const getSongsData =async()=>{
                try {
                    const response= await axios.get(`${url}/api/song/list`)
                    if(response.data.success){
                        setSongsData(response.data.songs)
                        setTrack(response.data.songs[0])
                    }
                    
                
                } catch (error) {
       
                    console.log(error)
                }
            }
                const getalbumData=async()=>{
        try {
            const response = await axios.get(`${url}/api/album/list`)

           if(response.data.success){

            setAlbumsData(response.data.message)          
           }
      
        } catch (error) {
            console.error(error);
        
            
        }
    }

  useEffect(()=>{
   setTimeout(() => {
    audioRef.current.ontimeupdate=()=>{
        seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%";

setTime({
      currentTime: {second:Math.floor(audioRef.current.currentTime % 60),minute:Math.floor(audioRef.current.currentTime / 60)},
        totalTime:{second:Math.floor(audioRef.current.duration % 60),minute:Math.floor(audioRef.current.duration / 60)},
})
    }
   }, 1000); 
  },[audioRef])

useEffect(()=>{
  getSongsData()
  getalbumData()
},[])

  const contextValue={
audioRef,seekBar,seekSong,playWithId,next,previous,seekBg,track,setTrack,playStatus,setPlayStatus,time,setTime,Play,Pause,songsData,albumsData  }
  return (
  <PlayerContext.Provider value={contextValue}>
    {props.children}
  </PlayerContext.Provider>
  )
}

export default PlayerContextProvider;

