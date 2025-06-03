import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const { session, signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInUser(email, password);
      if (result.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24" action="">
        <h2 className="font-bold pb-2">Sign in!</h2>
        <p>
          Don't have an account? <Link to="/signup">Sign up!</Link>
        </p>
        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 mt-4 bg-black text-white"
            type="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 mt-4 bg-black text-white"
            type="password"
          />
          <button type="submit" disabled={loading} className="mt-4 w-full">
            Sign in
          </button>
          {error && <p className="text-red-600 text-center pt-4"> {error} </p>}
        </div>
      </form>
    </div>
  );
};

export default Signin;
