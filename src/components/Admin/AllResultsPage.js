import './css/dashboardtable.css';
import React, { useState,useEffect} from "react";
import axios from '../../config/index';
import { Link, useNavigate } from 'react-router-dom';




function AllUsersPage(){

        
    useEffect(() => {
        axios
    .get('session')
    .then((res) => {
        if (res.data.valid) {

            if(res.data.type == "Admin"){
            }else{
                navigate('/admin-login');
            }

        } else {

        }
    })
    .catch((err) => console.log(err));
    },[]);

    const navigate = useNavigate();
    const [AllResultsData, setAllResultsData] = useState([]);
    const [UserName, setUserName] = useState([]);

    axios.defaults.withCredentials = true;

    const getUser = (userId) => {
        console.log(userId);
        axios
        .post('user', { userId })
        .then((res) => {
            if (res.data.message) {
                console.log(res.data.message);
    
            } else {
                setUserName(res.data.name);

            }
        })
        .catch((err) => console.log(err));
    
    };
    

    

    const GetAllResults= ()=>{
        axios.post('AllItems', {
            table: 'result_history',
        })
        .then((res) => {
            if (res.data) {
                setAllResultsData(res.data);
            } else {
                console.log("Error happened");
            }
        })
        .catch((err) => console.log(err));
    };

    const deleteItem = (id) => {
        axios
        .delete(`delete-item/${id}`, {
            data: {
            table: 'result_history',
            },
        })
        .then((response) => {
            if (response.data.message === 'Item deleted successfully') {
                GetAllResults();
            } else {
            console.error('Failed to delete result:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Error deleting result:', error);
        });
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

    GetAllResults();
    getIfLogin();

}, []);




    

    return(
        <>
            <section className='dashboard'>



                <div className='results-table'>

                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Test Name</th>
                            <th>score</th>
                            <th>Date</th>

                            <th>Options</th>

                        </tr>
                    </thead>
                    <tbody>
                    {AllResultsData.length ? (
                        AllResultsData.map(result => {
                            getUser(result.userid)
                             // Convert the date string to a Date object
                                const date = new Date(result.date);

                                // Format the date as "YYYY-MM-DD"
                                const formattedDate = date.toISOString().split('T')[0];

                                // Format the time as "(HH:mm)"
                                const hours = date.getHours().toString().padStart(2, '0');
                                const minutes = date.getMinutes().toString().padStart(2, '0');
                                const formattedTime = `(${hours}:${minutes})`;

                            return(
                            <tr key={result.id}>
                            <td>
                                <h6>{result.id}</h6>
                            </td>
                            <td>
                                <h2>{UserName}</h2>
                            </td>
                            <td>
                                <h2>{result.name}</h2>
                            </td>
                            <td>
                                <h3>{result.score}</h3>
                            </td>

                            <td>
                                <h3>{formattedDate} {formattedTime}</h3>
                            </td>

                            <td>
                                <Link className="edit" to={`/edit-result?id=${result.id}`}>
                                <i class="las la-edit"></i>{" "}
                                </Link>
                            </td>
                                <td><button className='delete' onClick={() => deleteItem(result.id)}> <i class="las la-trash-alt"></i> </button></td>
                            </tr>
                            )
                            })
                        ) : (
                        <tr>
                            <td colSpan={5}>Loading...</td>
                        </tr>
                        )}

                    </tbody>
                </table>

                </div>
            </section>
        
        </>
    )
}

export default AllUsersPage;