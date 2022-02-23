import React from "react";
import Footer from "./Footer/footer";
import Header from './Header/header';
import AppRoutes from "./routes";
import Sidebar from "./Sidebar/Sidebar";
const App = () => (
    <div>
        <Header/>
        <div className="main-container">
            <AppRoutes/>
        <Sidebar/>
        </div>
        <Footer/>
    </div>
);

//add sidebar with recent pastes on every page

export default App;