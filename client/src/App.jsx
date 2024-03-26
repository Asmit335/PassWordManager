import React from "react";
import Navbar from "./components/Navbar";
import PassManager from "./components/PassManager";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[83vh]">
        <PassManager />
      </div>
      <Footer />
    </>
  );
};
export default App;
