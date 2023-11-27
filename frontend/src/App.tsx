import './App.css';
import Security from './components/Security/Security';
import SecurityDetail from './components/SecurityDetail/SecurityDetail';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <Routes>
          <Route path='/securities' element={<Security />} />
          <Route path="/security/:ticker" element={<SecurityDetail />} />
          <Route path="/" element={<Navigate to="/securities" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
