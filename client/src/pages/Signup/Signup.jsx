import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirm_password: "",
    gender: "",
  });

  const {loading,signup} = useSignup(); // custom hook


const handleGenderCheck = (gender)=>{
  setInputs({...inputs,gender})
}
  const handleSubmit= async (e)=>{
    e.preventDefault();
    console.log(inputs);
    setInputs({   // clears input fields after submit
      fullname: "",
      username: "",
      password: "",
      confirm_password: "",
      gender: "",
    });

    await signup(inputs)
  
  }
  return (
    <div className="absolute">
      <div className="flex flex-col items-center  justify-center min-w-96 mx-auto">
        <div className="w-full p-6 absolute rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">
        <div className="relative mb-10">
      <h1 className="md:text-4xl text-3xl font-bold text-white text-center">
        SIGN UP
      </h1>
      <div className="absolute top-full left-0 w-full border-t-2 border-white    opacity-25">
      <h1 className="md:text-4xl text-3xl font-bold text-center">
        SIGN UP
      </h1>
      </div>
    </div>
          <div className="w-full  max-w-xs">
            <form onSubmit={handleSubmit} className="shadow-md relative  rounded px-8 pt-6 mb-3">
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Full Name
                </label>
                <input
                  
                  className="shadow appearance-none border text-white rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="fullname"
                  type="text"
                  placeholder="Full Name"
                  value={inputs.fullname}
                  onChange={(e) =>
                    setInputs({ ...inputs, fullname: e.target.value })
                  }
                />
              </div>
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
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2 "
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    
                    className="shadow appearance-none border border-red-500 text-white rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="**************"
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs({ ...inputs, password: e.target.value })
                    }
                  />
                </div>
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Confirm Password
                </label>
                <input
                  
                  className="shadow appearance-none border border-red-500 text-white rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm_password"
                  type="password"
                  placeholder="**************"
                  value={inputs.confirm_password}
                  onChange={(e) =>
                    setInputs({ ...inputs, confirm_password: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Gender
                  <span className="text-xs"> (Choose Only One)</span>
                </label>
                <div className="flex ">
                  <div className="flex items-center me-4">
                    <input
                      
                      checked={inputs.gender === 'male'}
                      onChange={() => handleGenderCheck('male')}
                      id="male-checkbox"
                      name="male"
                      type="checkbox"
                      
                      className="w-4 h-4 text-blue-600  rounded focus:ring-blue-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="red-checkbox"
                      className="ms-2 text-sm font-medium text-blue-600"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center me-4">
                    <input
                    
                     checked={inputs.gender === 'female'}
                      onChange={() => handleGenderCheck('female')}
                      id="female-checkbox"
                      name="female"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="green-checkbox"
                      className="ms-2 text-sm text-pink-600 font-medium"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={loading} // will be disabled if loading satate is true
                >
                  Sign Up 
                </button>
                <Link
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  to="/login"
                >
                  Been Here? Log In.
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

export default Signup;
