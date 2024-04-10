import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser } = useAuthContext();

  const signup = async ({
    fullname,
    username,
    password,
    confirm_password,
    gender,
  }) => {
    const success = handleInputErrors({  
      fullname,
      username,
      password,
      confirm_password,
      gender,
    });
    if (!success) return;
    setLoading(true)

    try {
      const res = await fetch("/api/auth/signup", {

        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirm_password,
          gender,
        }),
      });
      const data = await res.json();

      if(data.error){
        throw new Error (data.error)
      }
      // localstorage
        localStorage.setItem("chat-user",JSON.stringify(data))
      //context
      setAuthUser(data)

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullname,
  username,
  password,
  confirm_password,
  gender,
}) {
  if (!fullname || !username || !password || !confirm_password || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (password !== confirm_password) {
    toast.error("Passwords don't match");
    return false;

  }
  if (password.length < 8) {
    toast.error("Password must be at least 8 characters");
    return false;
  }
  return true;
}

