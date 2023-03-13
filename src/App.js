import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';

function App() {
  return (
    <Router>
      <div className="App bg-light">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
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
