import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/Auth/LoginPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        {/* public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* private Routes */}
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
