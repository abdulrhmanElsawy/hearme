import './css/dashboardtable.css';
import React, { useState,useEffect} from "react";
import axios from '../../config/index';
import { Link, useNavigate } from 'react-router-dom';




function AllUsersPage(){


        
    useEffect(() => {
        axios
    .get('session-admin')
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
    const [AllUsers, setAllUsers] = useState([]);

    axios.defaults.withCredentials = true;


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


    const deleteItem = (id) => {
        axios
        .delete(`delete-item/${id}`, {
            data: {
            table: 'users',
            },
        })
        .then((response) => {
            if (response.data.message === 'Item deleted successfully') {
            GetAllUsers();
            } else {
            console.error('Failed to delete result:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Error deleting result:', error);
        });
    };
    
    const activateItem = (id) => {
        axios
        .put(`/activate-item/${id}`, {
            table: 'users',
        })
        .then((response) => {
            if (response.data.message === 'Item Activating successfully') {
            GetAllUsers();
            } else {
            console.error('Failed to activate result:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Error activating result:', error);
        });
    };
    


useEffect(() => {

    GetAllUsers();
    getIfLogin();

}, []);




    

    return(
        <>
            <section className='dashboard'>



                <div className='results-table'>
                <Link className='new-item' to='/add-user'> + NEW USER </Link>
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
                    {AllUsers.length ? (

                    AllUsers.map(user => {
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
                            <td><Link className='edit' to={`/edit-user?id=${user.id}`}> <i class="las la-edit"></i> </Link></td>
                            <td><button className='delete' onClick={() => deleteItem(user.id)}> <i class="las la-trash-alt"></i> </button></td>
                            {user.status === "in-active"?(<><td><button className='activate' onClick={() => activateItem(user.id)}> <i class="las la-thumbs-up"></i> </button></td></>):null}
                            
                            </tr>
                        );
                        })): (
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