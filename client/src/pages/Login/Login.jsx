import React, { useState } from "react";
import {Link} from "react-router-dom"
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs,setInputs] = useState({
    username:"",
    password:"",
    
  });
  const {login,loading} = useLogin();
  const handlesubmit = async (e)=>{
    e.preventDefault();
    await login({username:inputs.username,password:inputs.password});
  }
  return (
    <div className="absolute">
    <div className="flex flex-col items-center  justify-center min-w-96 mx-auto">
      <div className="w-full p-6 absolute rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-sm  bg-opacity-0">
        {/* <h1 className="sm:text-4xl text-3xl font-semibold text-center text-white">
          {" "}
          LOGIN 
        </h1> */}
        <div className="relative mb-10">
      <h1 className="md:text-5xl text-3xl font-bold text-white text-center">
        LOGIN
      </h1>
      <div className="absolute top-full left-0 w-full border-t-2 border-white    opacity-25">
      <h1 className="md:text-5xl text-3xl font-bold text-center">
        LOGIN
      </h1>
      </div>
    </div>

        <div className="w-full  max-w-xs">
          <form onSubmit={handlesubmit} className="shadow-md relative  rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border text-white rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={inputs.username}
                onChange={(e)=>setInputs({ ...inputs, username : e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 text-white rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="*************"
                value={inputs.password}
                onChange={(e)=>setInputs({ ...inputs, password: e.target.value })}
              />
              <p className="text-red-500 text-xs italic">
                Please  enter  password.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loading}
              >
                Log In
              </button>
              <Link
                to="/signup"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                
              >
                New Here? Sign Up.
              </Link>
            </div>
          </form>
          <p className="text-center text-white text-xs">
            &copy;2024 Dipesh Khaiju All rights reserved.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
