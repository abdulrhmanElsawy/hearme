import './css/dashboard.css';
import './css/dashboardtable.css';
import React, { useState,useEffect} from "react";
import axios from '../../config/index';
import { Link, useNavigate } from 'react-router-dom';



function Dashboard(){


    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const [usersCount, setUsersCount] = useState(0);
    const [resultsCount, setresultsCount] = useState(0);
    const [questionsCount, setquestionsCount] = useState(0);
    const [AllUsers, setAllUsers] = useState([]);


    const getResultsCount = () => {
        axios.post('get-item-count', {
            table: "result_history",
        })
        .then((res) => {
            if (res.data) {
                console.log(res.data)
                setresultsCount(res.data.totalCount);
            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };



    
    useEffect(() => {
        axios
    .get('session')
    .then((res) => {
        if (res.data.valid) {

            if(res.data.type == "Admin"){
                navigate('/dashboard');
            }else{
                navigate('/admin-login');
            }

        } else {

        }
    })
    .catch((err) => console.log(err));
    },[]);




    const getUsersCount = () => {
        axios.post('get-item-count', {
            table: 'users',
        })
        .then((res) => {
            if (res.data) {
                setUsersCount(res.data.totalCount);
            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };

    const getQuestionsCount = () => {
        axios.post('get-item-count', {
            table: 'test_questions',
        })
        .then((res) => {
            if (res.data) {
                setquestionsCount(res.data.totalCount);

            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };


    const GetAllUsers = ()=>{
        axios.post('AllItems', {
            table: 'users',
        })
        .then((res) => {
            if (res.data) {
                console.log(res.data)
                setAllUsers(res.data);
            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };
    

    const getIfLogin= ()=>{
        
    axios
    .get('session')
    .then((res) => {
        if (!res.data.valid) {
            console.log(res.data.valid);
            navigate('/admin-login');

        }else{
            console.log(res.data.valid);

        }
    })
    .catch((err) => console.log(err));

    }

    
useEffect(() => {
    getUsersCount();
    getResultsCount();
    getQuestionsCount();
    GetAllUsers();
    getIfLogin();

    

}, []);




    

    return(
        <>
            <section className='dashboard'>
                <div className='stats-content'>
                    <Link to="/all-users">
                        <div className='stat'>
                            <i className="las la-users"></i>
                            <div className='info'>
                                <h1>{usersCount}</h1>
                                <h2> Users </h2>
                            </div>
                        </div>
                    </Link>
                    

                    <Link to="/all-questions">
                        <div className='stat'>
                        <i className="las la-question"></i>
                            <div className='info'>
                                <h1>{questionsCount}</h1>
                                <h2> Questions </h2>
                            </div>
                        </div>
                    </Link>


                    <Link to="/all-results">
                        <div className='stat'>
                        <i className="las la-poll-h"></i>
                            <div className='info'>
                                <h1>{resultsCount}</h1>
                                <h2> Results </h2>
                            </div>
                        </div>
                    </Link>

                    
                </div>




                <div className='results-table'>

                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Role</th>
                            <th>Date-created</th>
                            <th>Options</th>

                        </tr>
                    </thead>
                    <tbody>
                    {AllUsers.map(user => {
                        // Convert the date string to a Date object
                        const date = new Date(user.date);

                        // Format the date as "YYYY-MM-DD"
                        const formattedDate = date.toISOString().split('T')[0];

                        // Format the time as "(HH:mm)"
                        const hours = date.getHours().toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        const formattedTime = `(${hours}:${minutes})`;

                        return (
                            <tr key={user.id}>
                            <td><h6>{user.id}</h6></td>
                            <td><img src={`/uploads/${user.img}`} alt="User avatar"/></td>
                            <td><h2>{user.name}</h2></td>
                            <td><h3>{user.email}</h3></td>
                            <td><h5 className={user.status}>{user.status}</h5></td>
                            <td><h4 className={user.type}>{user.type}</h4></td>
                            <td><h3>{formattedDate} {formattedTime}</h3></td>
                            <td><Link to={`/edit-user?id=${user.id}`}> Edit </Link></td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>

                </div>
            </section>
        
        </>
    )
}

export default Dashboard;