import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import PageNotFound from './Components/PageNotFound';
import Login from './Components/Login';
import Register from './Components/Regsiter';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import Employees from './Components/Employees';

function App() {
  return (
    <Router>
      <div className="App bg-light">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/header" element={<Header />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee-list" element={<Employees />} />
        </Routes>
        <ToastContainer
          position="top-right"
          theme="light"
          hideProgressBar={true}
        />
      </div>
    </Router>
  );
}

export default App;
