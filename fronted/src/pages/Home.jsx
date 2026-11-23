import React from 'react'
import SideBar from '../components/SideBar'
import Display from '../components/Display'
import Player from '../components/Player'

const Home = () => {
  return (

        <>
              <div className='h-[90%] flex'>
                <SideBar />
                <Display />
              </div>
              <Player />
            </>
    
  )
}

export default Home
