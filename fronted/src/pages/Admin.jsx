
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Addsong from './Addsong';
import AddAlbum from './AddAlbum';
import ListSong from './ListSong';
import ListAlbum from './ListAlbum';
import Sidebar from '../components/components1/Sidebar1';
import Navbar from '../components/components1/Navbar1';

export const url='http://localhost:5000'
const Admin = () => {
  return (
    <div className=' h-screen flex items-start'>

      <ToastContainer/>
          <Sidebar/>
      <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
        <Navbar/>
        <div className='pt-8 pl-5 sm:pt-12 sm:pl-12'>
          <Routes>
            <Route path='/add-song1' element={<Addsong/>} />
                 <Route path='/add-album1' element={<AddAlbum/>} />
                 <Route path='/list-song1' element={<ListSong/>} />
                 <Route path='/list-album1' element={<ListAlbum/>} />

          </Routes>
        </div>

      </div>
    </div>
  )
}

export default Admin;
