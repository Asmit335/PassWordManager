import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import {
  FaCopy,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaUserEdit,
  FaUserPlus,
} from "react-icons/fa";

const PassManager = () => {
  const [form, setForm] = useState({
    userUrl: "",
    webiteName: "",
    passWord: "",
  });
  const [show, setShow] = useState(false);
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const togglePass = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const AddData = () => {
    if (
      form.userUrl.trim() === "" ||
      form.passWord.trim() === "" ||
      form.webiteName.trim() === ""
    ) {
      return;
    }

    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    setForm({
      userUrl: "",
      webiteName: "",
      passWord: "",
    });
    toast.success("Saved Successfully");
  };

  const isDataEmpty =
    form.userUrl.trim() === "" ||
    form.webiteName.trim() === "" ||
    form.passWord.trim() === "";

  const editPassword = (id) => {
    setForm(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((e) => e.id !== id));
    console.log("Editing the id :", id);
  };

  const deletePassword = (id, webiteName) => {
    let confirmm = confirm(`Are you sure to delete ${webiteName}?`);
    if (confirmm) {
      setPasswordArray(passwordArray.filter((e) => e.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((e) => e.id !== id))
      );
      console.log("Deleting data with ID:", id);
      toast.success("Deleted Successfully");
    }
  };

  const copyText = (text) => {
    toast.success("Copied to Clipboard");
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <main className="md:container mx-auto text-center ">
        <div className="mt-8">
          <h1 className="  font-bold text-3xl text-green-700">
            <span className="text-gray-900">&lt;</span>PassWord Manager
            <span className="text-gray-900">/&gt;</span>
          </h1>
        </div>

        <div className="mt-4">
          <p className="text-gray-600">Your own PassWord Manager</p>
        </div>

        <div className="md:container mx-auto p-4">
          <input
            type="text"
            name="userUrl"
            value={form.userUrl}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="p-3 mb-4 rounded-full border border-green-700 w-full"
          />
          <div className="flex justify-center">
            <div className="max-w-lg flex w-full sm:flex">
              <input
                type="text"
                name="webiteName"
                value={form.webiteName}
                onChange={handleChange}
                className="flex-1 p-3 mr-2 rounded-full border border-green-700"
                placeholder="Enter username"
              />
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={form.passWord}
                  name="passWord"
                  onChange={handleChange}
                  className="flex p-3 rounded-full border  border-green-700"
                  placeholder="Enter Password"
                />

                {form.passWord && (
                  <span
                    className="absolute right-[7px] top-[15px]  cursor-pointer"
                    onClick={togglePass}
                  >
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className={`hover:text-gray-900 flex items-center bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow ${
              isDataEmpty && "cursor-not-allowed opacity-50"
            } `}
            onClick={AddData}
          >
            <FaUserPlus className="mr-2 text-2xl" />
            Save
          </button>
        </div>

        <main>
          {passwordArray.length === 0 ? (
            <h2 className="font-bold">No passwords to show.</h2>
          ) : (
            <div>
              <h2 className="font-bold font-serif text-2xl mt-3 ml-32">
                Your Passwords
              </h2>

              <div className="passwordTable flex justify-center ">
                <table className="w-full md:w-[79rem] mt-4 text-center rounded-md overflow-hidden">
                  <thead className="bg-green-800 text-white">
                    <tr>
                      <th className="py-3">Website URL</th>
                      <th className="py-3">Username</th>
                      <th className="py-3">Password</th>
                      <th className="py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-green-100">
                    {passwordArray.map((password, index) => (
                      <tr key={index} className="hover:bg-green-200">
                        <td className="py-3 relative">
                          <a
                            href={`https://www.${password.userUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {password.userUrl}
                          </a>
                          <p
                            className="absolute right-0 bottom-0 mr-1 mb-5"
                            onClick={() => copyText(password.userUrl)}
                          >
                            <FaCopy className="text-gray-700 hover:text-gray-600 cursor-pointer" />
                          </p>
                        </td>
                        <td className="py-3 relative">
                          {password.webiteName}
                          <p
                            className="absolute right-0 bottom-0 mr-1 mb-5"
                            onClick={() => copyText(password.webiteName)}
                          >
                            <FaCopy className="text-gray-700 hover:text-gray-600 cursor-pointer" />
                          </p>
                        </td>
                        <td className="py-3 relative">
                          <span>{password.passWord}</span>
                          <p
                            className="absolute right-0 bottom-0 mr-1 mb-5"
                            onClick={() => copyText(password.passWord)}
                          >
                            <FaCopy className="text-gray-700 hover:text-gray-600 cursor-pointer" />
                          </p>

                          <button
                            className="ml-2 text-green-600 hover:text-green-900"
                            // onClick={() => togglePassVisibility(index)}
                          >
                            {/* {passwordVisibility[index] ? (
                              <FaEyeSlash />
                            ) : (
                              <FaEye />
                            )} */}
                          </button>
                        </td>
                        <td className="py-3">
                          <button
                            className="text-blue-600 text-2xl hover:underline hover:text-black "
                            onClick={() => editPassword(password.id)}
                          >
                            <FaUserEdit />
                          </button>
                          <button
                            className="ml-2 text-gray-900 hover:underline text-xl hover:text-red-600 "
                            onClick={() =>
                              deletePassword(password.id, password.webiteName)
                            }
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </main>
    </>
  );
};

export default PassManager;
