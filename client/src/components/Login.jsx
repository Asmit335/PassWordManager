import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Context1 from "../context/ContextApi";

//loading import
import { toast } from "react-toastify";
import Loader from "./Loader";
export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState(""); // State to store entered email

  const { setUserEmail1 } = useContext(Context1);
  axios.defaults.withCredentials = true;
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.message === "User not found") {
        throw new Error("User not found");
      }

      if (responseData.message === "Invalid credentials") {
        throw new Error("Invalid credentials");
      }

      // If no errors, navigate to the home page
      navigate("/");

      // Store responseData in localStorage
      localStorage.setItem("responseData", JSON.stringify(responseData));

      // Store token in localStorage
      localStorage.setItem("token", responseData.token);
      let data = localStorage.getItem("responseData");
      console.log("localstorageee", data);

      // Extract email and uid from responseData if available
      const { email: userEmail, uid } = responseData.user || {};

      // Store email, uid in localStorage if available
      if (userEmail && uid) {
        localStorage.setItem("email", userEmail);
        localStorage.setItem("uid", uid);
      }

      // Show success toast
      toast.success("Login Successful");
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      // Show error toast
      toast.error("Login Unsuccessful");
    } finally {
      // Reset form fields and loading state regardless of success or failure
      setLoading(false);
      reset();
    }
  };

  //extracting the user email address
  const handleEmailChange = (event) => {
    const userEmailemail = event.target.value;
    setEnteredEmail(userEmailemail);
    setUserEmail1(userEmailemail);
    console.log("Email entered:", userEmailemail); // Log email value
  };

  useEffect(() => {
    console.log("setupated email", enteredEmail);
  }, [enteredEmail]);

  return (
    <>
      <>
        {/* <h1>{myname}</h1> */}
        {/* <ProductList /> */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          {loading && <Loader></Loader>}

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/">
              <img
                className="mx-auto h-20 w-auto"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqoOmPOeeNtA34x1k68mrZzIDDuEee0ehvdQ&usqp=CAU"
                alt="Your Company"
              />
            </Link>
            <h2 className="mt-10 text-center  text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: "Email is not Valid",
                      },
                    })}
                    type="email"
                    required
                    onChange={handleEmailChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>

                  {/* <div className="text-sm">
                    <Link to="/forgetpass">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default behavior
                          // Add your custom logic here
                        }}
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </Link>
                  </div> */}
                </div>

                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `- at least 8 characters
                        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                        - Can contain special characters`,
                      },
                    })}
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </>
    </>
  );
}
