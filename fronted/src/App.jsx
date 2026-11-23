import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/Admin';
import { PlayerContext } from './context/PlayerContext';
import Login from './pages/login';
import Home from './pages/Home';
import Register from './pages/register';
import { UserData } from './context/User';
import Loading from './components/Loading';
import PlayList from './pages/Playelist';

export const url = "https://showcase004-2.onrender.com/";

const App = () => {
  const { audioRef, track, songsLoading } = useContext(PlayerContext);
  const { loading, isAuth, user } = UserData();

  if (loading) {
    return (
      <div className="bg-black h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-black h-screen">
      <Routes>
        <Route
          path="/admin/*"
          element={
            isAuth && user?.role === 'admin' ? (
              <Admin />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/login" element={isAuth ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={isAuth ? <Navigate to="/" replace /> : <Register />} />
          <Route
              path="/playlist"
              element={isAuth ? <PlayList user={user} /> : <Login />}
            />
        <Route
          path="/*"
          element={
            !isAuth ? (
              <Login />
            ) : songsLoading ? (
              <Loading />
            ) : (
              <Home />
            )
          }
        />
      </Routes>

      <audio
        ref={audioRef}
        src={track?.file || undefined}
        preload="auto"
      />
    </div>
  );
};

export default App;
