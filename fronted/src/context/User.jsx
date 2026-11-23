import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const api = axios.create({
  baseURL: "https://showcase004-2.onrender.com",
  withCredentials: true,
});

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function registerUser(
    name,
    email,
    password,
    navigate,
    fetchSongs,
    fetchAlbums
  ) {
    setBtnLoading(true);
    try {
      const { data } = await api.post("/api/user/register", {
        name,
        email,
        password,
      });

      toast.success(data.message);
      setUser(data.user ?? data);
      setIsAuth(true);

      navigate("/");
      fetchSongs?.();
      fetchAlbums?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setBtnLoading(false);
    }
  }

  async function loginUser(email, password, navigate, fetchSongs, fetchAlbums) {
    setBtnLoading(true);
    try {
      const { data } = await api.post("/api/user/login", {
        email,
        password,
      });

      toast.success(data.message);
      setUser(data.user ?? data);
      setIsAuth(true);

      navigate("/");
      fetchSongs?.();
      fetchAlbums?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await api.get("/api/user/me");
      setUser(data.user ?? data);
      setIsAuth(true);
    } catch (error) {
      setUser(null);
      setIsAuth(false);
      if (error.response?.status !== 401) {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  async function logoutUser() {
    try {
      await api.get("/api/user/logout");
      setUser(null);
      setIsAuth(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  }

  async function addToPlaylist(id) {
    try {
      const { data } = await api.post(`/api/user/song/${id}`);
      toast.success(data.message);
      await fetchUser();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not update playlist"
      );
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        user,
        isAuth,
        btnLoading,
        loading,
        loginUser,
        logoutUser,
        addToPlaylist,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
