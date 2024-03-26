import React from "react";
import Navbar from "./components/Navbar";
import PassManager from "./components/PassManager";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[83vh]">
        <PassManager />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};
export default App;
