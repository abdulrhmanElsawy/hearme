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
    const [AllQuestionsData, setAllQuestionsData] = useState([]);

    axios.defaults.withCredentials = true;


    

    const deleteItem = (id) => {
        axios
        .delete(`delete-item/${id}`, {
            data: {
            table: 'test_questions',
            },
        })
        .then((response) => {
            if (response.data.message === 'Item deleted successfully') {
                GetAllQuestions();
            } else {
            console.error('Failed to delete result:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Error deleting result:', error);
        });
    };

    const GetAllQuestions = ()=>{
        axios.post('AllItems', {
            table: 'test_questions',
        })
        .then((res) => {
            if (res.data) {
                setAllQuestionsData(res.data);
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

    GetAllQuestions();
    getIfLogin();

}, []);




    

    return(
        <>
            <section className='dashboard'>



                <div className='results-table'>
                <Link className='new-item' to='/add-question'> + NEW Question </Link>


                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Img</th>
                            <th>Question Title</th>
                            <th>Question Header</th>
                            <th>Options</th>

                        </tr>
                    </thead>
                    <tbody>
                    {AllQuestionsData.length ? (
                        AllQuestionsData.map((question) => (
                            <tr key={question.id}>
                            <td>
                                <h6>{question.id}</h6>
                            </td>
                            <td>
                                <img src={`/uploads/${question.img}`} alt="User avatar" />
                            </td>
                            <td>
                                <h2>{question.title}</h2>
                            </td>
                            <td>
                                <h3>{question.header}</h3>
                            </td>
                            <td><Link className='edit' to={`/edit-question?id=${question.id}`}> <i class="las la-edit"></i> </Link></td>

                            <td><button className='delete' onClick={() => deleteItem(question.id)}> <i class="las la-trash-alt"></i> </button></td>

                            </tr>
                        ))
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