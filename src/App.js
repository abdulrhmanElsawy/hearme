import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import UpperNavbar from "./components/UpperNavbar";
import Landing from "./components/Landing";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Steps from "./components/Steps";
import Footer from "./components/Footer";
import Login from "./components/Login";
import LoginAdmin from "./components/Admin/LoginAdmin";
import React, { useState, useRef } from "react";
import Signup from "./components/SignUp";
import Profile from "./components/Profile";
import Test from "./components/Test";
import Check from "./components/Check";
import StartTest from "./components/StartTest";
import SideNav from "./components/Admin/SideNav";
import './App.css';
import SearchBar from "./components/Admin/SearchBar";
import Dashboard from "./components/Admin/Dashboard";
import AllUsersPage from "./components/Admin/AllUsersPage";
import AllUsersWaitingPage from "./components/Admin/AllUsersWaitingPage";
import AllQuestionsPage from "./components/Admin/AllQuestionsPage";
import AllResultsPage from "./components/Admin/AllResultsPage";
import EditUser from "./components/Admin/EditUser";
import AddUser from "./components/Admin/AddUser";
import EditResults from "./components/Admin/EditResults";
import AddQuestion from "./components/Admin/AddQuestion";
import EditQuestion from "./components/Admin/EditQuestion";



function App() {
  const [sessionExists, setSessionExists] = useState("");
  const servicesRef = useRef(0);
  const location = useLocation();
  const hideHeaderFooter =
  location.pathname === "/dashboard" ||
  location.pathname === "/all-users" ||
  location.pathname === "/all-waiting-users" ||
  location.pathname === "/all-questions" ||
  location.pathname === "/all-results" ||
  location.pathname === "/edit-user" ||
  location.pathname === "/edit-result" ||
  location.pathname === "/add-question" ||
  location.pathname === "/edit-question" ||


  location.pathname === "/add-user";

  return (
    <div className="App">
        <SideNav
          className={hideHeaderFooter ? "" : "hide"}
          sessionExists={sessionExists}
          setSessionExists={setSessionExists}
        />
        <SearchBar 
            className={hideHeaderFooter ? "" : "hide"}
        />

        <UpperNavbar
          className={!hideHeaderFooter ? "" : "hide"}
          servicesRef={servicesRef}
          sessionExists={sessionExists}
          setSessionExists={setSessionExists}
        />
        <Navbar 
          className={!hideHeaderFooter ? "" : "hide"}
        />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />

              <About />
              <Steps />

              <Services servicesRef={servicesRef} />
              <Contact />
            </>
          }
        />

        <Route
          path="/login-user"
          element={
            <>
              <Login
                sessionExists={sessionExists}
                setSessionExists={setSessionExists}
              />
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <Signup />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />

        <Route
          path="/test"
          element={
            <>
              <Test />
            </>
          }
        />

        <Route
          path="/online-test-check"
          element={
            <>
              <Check />
            </>
          }
        />

        <Route
          path="/start-test"
          element={
            <>
              <StartTest />
            </>
          }
        />

        <Route
          path="/admin-login"
          element={
            <>
              <LoginAdmin
                sessionExists={sessionExists}
                setSessionExists={setSessionExists}
              />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
        />

    <Route
          path="/all-users"
          element={
            <>
              <AllUsersPage />
            </>
          }
        />

    <Route
          path="/all-waiting-users"
          element={
            <>
              <AllUsersWaitingPage />
            </>
          }
        />

        
    <Route
          path="/all-questions"
          element={
            <>
              <AllQuestionsPage />
            </>
          }
        />


<Route
          path="/all-results"
          element={
            <>
              <AllResultsPage />
            </>
          }
        />





<Route
          path="/edit-user"
          element={
            <>
              <EditUser />
            </>
          }
        />

        
<Route
          path="/add-user"
          element={
            <>
              <AddUser />
            </>
          }
        />

                
<Route
          path="/add-question"
          element={
            <>
              <AddQuestion />
            </>
          }
        />
        

      <Route
          path="/edit-result"
          element={
            <>
              <EditResults />
            </>
          }
        />

        
      <Route
          path="/edit-question"
          element={
            <>
              <EditQuestion />
            </>
          }
        />
        
      </Routes>


          <Footer className={!hideHeaderFooter ? "" : "hide"}/>

    </div>
  );
}

export default App;
