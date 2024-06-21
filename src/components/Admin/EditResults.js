import './css/dashboardtable.css';
import './css/editform.css';
import React, { useState,useEffect} from "react";
import axios from '../../config/index';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';





function EditUser() {


        
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
    const [User, setUser] = useState({});
    const [Item, setItem] = useState({});
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [name, setName] = useState("");
    const [score, setScore] = useState("");

    const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        name: name || "",
        score: score || "",
    };
    

    if (id) {
        data.resultId = id;
    }

    console.log(data)


    axios
        .put("/edit-result", data)
        .then((response) => {
        console.log(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
    };

    axios.defaults.withCredentials = true;

    const getResult = (itemId) => {
    let table = "result_history";
    axios
        .post('get-item', {itemId,table})
        .then((res) => {
        if (res.data.message) {
            console.log(res.data.message);
        } else {
            setItem(res.data);
            if (res.data.userid) {
            getUser(res.data.userid);
            }
        }
        })
        .catch((err) => console.log(err));
    };

    const getUser = async (itemId) => {
    const table = "users";
    try {
        const response = await axios.post('get-item', { itemId, table });
        const user = response.data;
        setUser(user);
    } catch (error) {
        console.error(error);
    }
    };

    const getIfLogin = () => {
    axios
        .get('session')
        .then((res) => {
        if (!res.data.valid || id <= 0 || id == null || id == "") {
            navigate('/admin-login');
        } else {
            getUser(id);
        }
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
    getIfLogin();
    getResult(id);
    }, []);

    // Return null until Item has a value
    if (!Item || !Item.name || !Item.score) {
    return null;
    }


    

    return(
        <>
            <section className='dashboard'>



                <div className='edit-form'>
                    <h1> Edit the Item for :  {User.name}</h1>

                    <form onSubmit={handleSubmit}>


                    <div className='input'>
                        <label> Name  </label>
                        <input  onChange={(event) => setName(event.target.value)} type='text' required="required" defaultValue={Item.name} maxLength="100" name='name'/>
                    </div>

                    <div className='input'>
                        <label> Score  </label>
                        <input  onChange={(event) => setScore(event.target.value)} type='number' required="required" defaultValue={Item.score} maxLength="60" name='score'/>
                    </div>

                    <div className='input'>
                        <label> User info  </label>
                        <input
                        type="text"
                        defaultValue={
                            User && User.name && User.id
                            ? `${User.name} (${User.id})`
                            : null
                        }
                        readOnly
                        name="userid"
                        />                    
                        </div>

                
                    <button type='submit'> SAVE </button>

                    </form>
                </div>
            </section>
        
        </>
    )
}

export default EditUser;