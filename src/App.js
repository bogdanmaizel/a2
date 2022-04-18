import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminAuth from "./pages/AdminAuth";
import CustomerAuth from "./pages/CustomerAuth";
import FrontPage from "./pages/FrontPage";
import AdminAddRestaurant from './pages/AdminAddRestaurant';
import AdminMainMenu from './pages/AdminMainMenu';
import CustomerMainMenu from './pages/CustomerMainMenu';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<FrontPage />} />
          <Route path='/admin-auth' element={<AdminAuth />} />
          <Route path='/customer-auth' element={<CustomerAuth />} />
          <Route path='/admin/create-restaurant' element={<AdminAddRestaurant />} />
          <Route path='/admin/restaurant' element={<AdminMainMenu />} />
          <Route path='/customer/welcome' element={<CustomerMainMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
