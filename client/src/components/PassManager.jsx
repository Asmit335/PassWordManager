import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaPersonBooth,
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

    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    setForm({
      userUrl: "",
      webiteName: "",
      passWord: "",
    });
  };

  const isDataEmpty =
    form.userUrl.trim() === "" ||
    form.webiteName.trim() === "" ||
    form.passWord.trim() === "";

  return (
    <>
      <main className="container mx-auto text-center ">
        <div className="mt-8">
          <h1 className="  font-bold text-3xl text-green-700">
            <span className="text-gray-900">&lt;</span>PassWord Manager
            <span className="text-gray-900">/&gt;</span>
          </h1>
        </div>

        <div className="mt-4">
          <p className="text-gray-600">Your own PassWord Manager</p>
        </div>

        <div className="container mx-auto p-4">
          <input
            type="text"
            name="userUrl"
            value={form.userUrl}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="p-3 mb-4 rounded-full border border-green-700 w-full"
          />
          <div className="flex justify-center ">
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
            Add
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
                        <td className="py-3">
                          <a
                            href={`https://www.${password.userUrl}`}
                            target="_blank"
                            className="text-blue-600 hover:underline"
                          >
                            {password.userUrl}
                          </a>
                        </td>
                        <td className="py-3">{password.webiteName}</td>
                        <td className="py-3">
                          <span>{password.passWord}</span>
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
                            // onClick={() => editPassword(index)}
                          >
                            <FaUserEdit />
                          </button>
                          <button
                            className="ml-2 text-gray-900 hover:underline text-xl hover:text-red-600 "
                            // onClick={() => deletePassword(index)}
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
