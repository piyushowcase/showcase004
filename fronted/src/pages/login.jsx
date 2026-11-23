import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/User";
import { SongData } from "../context/Songs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, btnLoading } = UserData();

  const { fetchSongs, fetchAlbums } = SongData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
console.log(email, password)
    loginUser(email, password, navigate, fetchSongs, fetchAlbums);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 via-black to-black px-4 py-8">
      <div className="bg-[#121212] border border-neutral-800/80 text-white p-8 sm:p-10 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
          Login to Spotify
        </h2>

        <form className="space-y-5" onSubmit={submitHandler}>
          <div>
            <label className="block text-sm font-semibold text-neutral-200 mb-2">
              Email or username
            </label>
            <input
              type="email"
              placeholder="Email or Username"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-200 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="pt-2">
            <button
              disabled={btnLoading}
              className="auth-btn"
            >
              {btnLoading ? "Please Wait..." : "Login"}
           
            </button>
          </div>
        </form>

        <div className="border-t border-neutral-800 mt-8 pt-6 text-center">
          <Link
            to="/register"
            className="text-sm font-medium text-neutral-400 hover:text-white underline-offset-4 hover:underline transition"
          >
            don't have accont?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;