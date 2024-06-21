import './css/sidenav.css';
import React, { useState,useEffect} from "react";
import axios from '../../config/index';
import {Link, useNavigate} from 'react-router-dom';
import { useLocation } from "react-router-dom";







function SideNav(props){


    
const navigate = useNavigate();
const [showUserOptions, setShowUserOptions] = useState(false);
const [user, setUser] = useState('');
const location = useLocation();

const [userDataLoaded, setUserDataLoaded] = useState(false); // New state variable




axios.defaults.withCredentials = true;


const logout = () => {
    axios
    .get('logout')
    .then((res) => {
        if (res.data.logout) {
            props.setSessionExists(false);
        navigate('/admin-login');

        } else {
        navigate('/admin-login');
        }
    })
    .catch((err) => console.log(err));
};


const handleUserOptionsClick = () => {
    setShowUserOptions(!showUserOptions);
};

const getUser = (userId) => {
    console.log(userId);
    axios
    .post('user', { userId })
    .then((res) => {
        if (res.data.message) {
            console.log(res.data.message);

        } else {
            setUser(res.data);
            setUserDataLoaded(true); 

        }
    })
    .catch((err) => console.log(err));

};


const openCloseNav = ()=>{
    let SideNav = document.querySelector(".sidenav");
    let searchBar = document.querySelector(".search-bar");
    let dashboard = document.querySelector(".dashboard");

    if(SideNav.classList.contains("active")){
        SideNav.classList.remove("active");
        searchBar.classList.remove("active");
        dashboard.classList.remove("active");
    }else{
        SideNav.classList.add("active");
        searchBar.classList.add("active");
        dashboard.classList.add("active");
    }
    

}


useEffect(() => {
    axios
    .get('session')
    .then((res) => {
        if (res.data.valid) {
            props.setSessionExists(true);
            getUser(res.data.userId);
            setUserDataLoaded(true); 


            console.log(userDataLoaded);

        } else {
            props.setSessionExists(false);
            getUser(0);
            console.log(userDataLoaded);

        }
    })
    .catch((err) => console.log(err));
}, [props.sessionExists]);











    return(
        <>
            
            <div  className={`${props.className} sidenav`}>
                <button onClick={openCloseNav} className='open-close-nav'> <i class="las la-bars"></i> </button>
                <div className="sidenav-content">
                    <div className="user-info">
                    {userDataLoaded && props.sessionExists ? (
                        <>
                            <img src={`/uploads/${user.image}`} alt="" />
                                <h1> Welcome Back : {user.name} </h1>
                        </>
                            ):null}
                    </div>
                


                <div className='sidenav-elements'>
                    <ul>
                    

                        <li className={location.pathname === "/dashboard"? 'active':null}>
                            <Link to="/dashboard">
                            <i class="las la-home"></i>
                                Dashboard
                            </Link>
                        </li>


                        <li className={location.pathname === "/all-users"? 'active':null}>
                            <Link to="/all-users">
                                <i class="las la-users-cog"></i>
                                Users
                            </Link>
                        </li>

                        <li className={location.pathname === "/all-waiting-users"? 'active':null}>
                            <Link to="/all-waiting-users">
                                <i class="las la-pause-circle"></i>
                                Waiting Users
                            </Link>
                        </li>

                        <li className={location.pathname === "/all-questions"? 'active':null}>
                            <Link to="/all-questions">
                                <i class="las la-list"></i>
                                Questions
                            </Link>
                        </li>

                        <li className={location.pathname === "/all-results"? 'active':null}>
                            <Link to="/all-results">
                                <i class="las la-poll-h"></i>
                                Users Results
                            </Link>
                        </li>

                        <li>
                            <button onClick={logout}>
                                <i class="las la-sign-out-alt"></i>
                                Logout
                            </button>
                        </li>

                        <li>
                            <Link to="/">
                                <i class="las la-search"></i>
                                View Website
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        
        </>
    )
}

export default SideNav;