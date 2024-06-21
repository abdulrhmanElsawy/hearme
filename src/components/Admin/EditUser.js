import './css/dashboardtable.css';
import './css/editform.css';
import React, { useState,useEffect} from "react";
import axios from '../../config/index';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import ShowButton from '../ShowButton';






function EditUser(){


        
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



    

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        uploadImage(selectedImage);
    };
    
    const uploadImage = (file) => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userId", id);

    
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        
        axios.post("upload-image", formData, config)
            .then((response) => {
                console.log("Image uploaded successfully!");
                return response.data;
                
            })
            .catch((error) => {
                console.error("Error uploading image: ", error);
                return null;
            });


    };
    



    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: name || "",
            email: email || "",
            password: password || "",
            phonenumber: phonenumber || "",
            status: status || "",
            type: type || "",
        };
        
        
        
        if (id) {
            data.userId = id;
        }



            axios
            .put("/edit-user", data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        
        


    };





    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
    };

    const handleChange = (event) => {
        setPassword(event.target.value);
    };

    axios.defaults.withCredentials = true;


    const getUser = (userId) => {
        axios
        .post('user', { userId })
        .then((res) => {
            if (res.data.message) {
                console.log(res.data.message);
            } else {
                setUser(res.data);

            }
        })
        .catch((err) => console.log(err));
    
    };

    const getIfLogin= ()=>{
        
    axios
    .get('session')
    .then((res) => {
        if (!res.data.valid || id <= 0 || id== null || id== "") {
            navigate('/admin-login');

        }else{
            getUser(id);

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
                    <h1> Edit the user :  {User.name}</h1>

                    <form onSubmit={handleSubmit}>

                    <div className='input'>
                        <label> Image  </label>
                        <input onChange={handleImageChange} type='file' name="image" accept="image/*"/>
                    </div>


                    <div className='input'>
                        <label> Name  </label>
                        <input  onChange={(event) => setName(event.target.value)} type='text' required="required" defaultValue={User.name} maxLength="100" name='name'/>
                    </div>

                    <div className='input'>
                        <label> Email  </label>
                        <input  onChange={(event) => setEmail(event.target.value)} type='email' required="required" defaultValue={User.email} maxLength="250" name='email'/>
                    </div>

                    <div className='input'>
                        <label> Password  </label>
                        <input onChange={(e) => {handleChange(e);setPassword(e.target.value);}} type={show ? 'text' : 'password'} placeholder="New Password" maxLength="100" name='password'/>
                        <ShowButton className="show-btn" show={show} handleToggle={handleToggle} />
                    </div>

                    
                    <div className='input'>
                        <label> Phone number  </label>
                        <input  onChange={(event) => setPhone(event.target.value)} type='tel' required="required" defaultValue={User.phonenumber} maxLength="250" name='phonenumber'/>
                    </div>

                    <div className='input'>
                        <label> Status  </label>
                        <select  onChange={(event) => setStatus(event.target.value)} required="required" name='status'>
                            <option selected defaultValue={User.status}> {User.status} </option>
                            
                            <option defaultValue="in-active"> in-active </option>
                            <option defaultValue="active"> active </option>
                        </select>
                    </div>
                
                    <div className='input'>
                        <label> User Role  </label>
                        <select  onChange={(event) => setType(event.target.value)} required="required" name='type'>
                            <option selected defaultValue={User.type}> {User.type} </option>
                            
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

export default EditUser;