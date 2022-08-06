import React from "react";
import Header from './layout/header/Header';
import Footer from './layout/footer/Footer';
import { Navigate, Outlet, useLocation} from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header></Header>
      {location.pathname === "/"
        ? <Navigate to="/home" replace={true} />
        : <Outlet></Outlet>}
      <Footer></Footer>
    </div>
  );
}

export default App;
