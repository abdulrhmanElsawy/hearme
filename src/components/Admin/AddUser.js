import './css/dashboardtable.css';
import './css/editform.css';
import React, { useState,useEffect} from "react";
import axios from '../../config/index';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import ShowButton from '../ShowButton';






function AddUser(){


        
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
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phonenumber, setPhone] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [image, setImg] = useState();





    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = new FormData();
        data.append("name", name || "");
        data.append("email", email || "");
        data.append("password", password || "");
        data.append("phonenumber", phonenumber || "");
        data.append("status", status || "");
        data.append("type", type || "");
        
        if(image){
            console.log(image);
            data.append("image", image);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            
            
            axios.post("/add-user-admin", data , config)
            .then((response) => {
                let alertS = document.querySelector(".alert-success"); 
                alertS.classList.add("active");
                setTimeout(() => {
                    alertS.classList.remove("active");
                }, 3000);
            })
            .catch((error) => {
                let alertD = document.querySelector(".alert-danger"); 
                alertD.classList.add("active");
                setTimeout(() => {
                    alertD.classList.remove("active");
                }, 3000);
                console.log(error);
            });
        }else{
                        
            axios.post("/add-user-admin", data )
            .then((response) => {
                let alertS = document.querySelector(".alert-success"); 
                alertS.classList.add("active");
                setTimeout(() => {
                    alertS.classList.remove("active");
                }, 3000);
                    })
            .catch((error) => {
                let alertD = document.querySelector(".alert-danger"); 
                alertD.classList.add("active");
                setTimeout(() => {
                    alertD.classList.remove("active");
                }, 3000);
                console.log(error);
            });
        }


    }




    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
    };

    const handleChange = (event) => {
        setPassword(event.target.value);
    };

    axios.defaults.withCredentials = true;



    const getIfLogin= ()=>{
        
    axios
    .get('session')
    .then((res) => {
        if (!res.data.valid) {
            navigate('/admin-login');

        }
        
    })
    .catch((err) => console.log(err));

    }




    

    useEffect(() => {
        getIfLogin();
    }, []);
    




    

    return(
        <>
            <section className='dashboard'>



                <div className='edit-form'>

                    <div className='alert-success'>
                        <h1> Saved successfully  <i class="las la-check-circle"></i></h1>
                    </div>

                    <div className='alert-danger'>
                        <h1> Error happened please re-enter your data <i class="las la-exclamation-triangle"></i></h1>

                    </div>

                    <h1> Edit the user :  {User.name}</h1>

                    <form onSubmit={handleSubmit}>

                    <div className='input'>
                        <label> Image  </label>
                        <input onChange={(event) => setImg(event.target.files[0])} type='file' name="image" accept="image/*"/>
                    </div>


                    <div className='input'>
                        <label> Name  </label>
                        <input  onChange={(event) => setName(event.target.value)} type='text' required="required"  maxLength="100" name='name'/>
                    </div>

                    <div className='input'>
                        <label> Email  </label>
                        <input  onChange={(event) => setEmail(event.target.value)} type='email' required="required"  maxLength="250" name='email'/>
                    </div>

                    <div className='input'>
                        <label> Password  </label>
                        <input onChange={(e) => {handleChange(e);setPassword(e.target.value);}} type={show ? 'text' : 'password'} placeholder="New Password" maxLength="100" name='password'/>
                        <ShowButton className="show-btn" show={show} handleToggle={handleToggle} />
                    </div>

                    
                    <div className='input'>
                        <label> Phone number  </label>
                        <input  onChange={(event) => setPhone(event.target.value)} type='tel' required="required" maxLength="250" name='phonenumber'/>
                    </div>

                    <div className='input'>
                        <label> Status  </label>
                        <select  onChange={(event) => setStatus(event.target.value)} required="required" name='status'>              
                            <option defaultValue=""> Choose Status </option>
                            <option defaultValue="in-active"> in-active </option>
                            <option defaultValue="active"> active </option>
                        </select>
                    </div>
                
                    <div className='input'>
                        <label> User Role  </label>
                        <select  onChange={(event) => setType(event.target.value)} required="required" name='type'>             
                            <option defaultValue=""> Choose Role</option>
                            <option defaultValue="normal"> Normal </option>
                            <option defaultValue="admin"> Admin </option>
                        </select>
                    </div>
                
                    <button type='submit'> SAVE </button>

                    </form>
                </div>
            </section>
        
        </>
    )
}

export default AddUser;