import './css/dashboardtable.css';
import './css/editform.css';
import React, { useState,useEffect} from "react";
import axios from '../../config/index';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import ShowButton from '../ShowButton';






function AddQuestion(){

        
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
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);


    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [audio, setAudio] = useState("");
    const [image, setImg] = useState();


    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2]= useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");

    const [answer1Priority, setAnswer1Priority] = useState("");
    const [answer2Priority, setAnswer2Priority] = useState("");
    const [answer3Priority, setAnswer3Priority] = useState("");
    const [answer4Priority, setAnswer4Priority] = useState("");
    


    const [header, setHeader] = useState("");
    const [para, setPara] = useState("");



    axios.defaults.withCredentials = true;



    


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
    
        const data = new FormData();
    
        data.append("title", title ?? "");
        data.append("question", question ?? "");
        data.append("audio", audio ?? "");
        data.append("image", image ?? "");
        data.append("answer1", answer1 ?? "");
        data.append("answer2", answer2 ?? "");
        data.append("answer3", answer3 ?? "");
        data.append("answer4", answer4 ?? "");
        data.append("answer1Priority", answer1Priority ?? "");
        data.append("answer2Priority", answer2Priority ?? "");
        data.append("answer3Priority", answer3Priority ?? "");
        data.append("answer4Priority", answer4Priority ?? "");
        data.append("header", header ?? "");
        data.append("para", para ?? "");
    
        const config = {
        headers: {
            "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        },
        };
    
        axios.post("/add-question-admin", data, config)
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
    };
    



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

                    <h1> Edit the Question : </h1>

                    <form onSubmit={handleSubmit}>

                    <div className='input'>
                        <label> Title  </label>
                        <input onChange={(event) => setTitle(event.target.value)} type='text' name="title" />
                    </div>


                    <div className='input'>
                        <label> Question  </label>
                        <input  onChange={(event) => setQuestion(event.target.value)} type='text' required="required"  name='question'/>
                    </div>

                    <div className='input'>
                        <label> Image </label>
                        <input onChange={(event) => setImg(event.target.files[0])} type='file' required name='image' accept='image/*' />
                    </div>

                    <div className='input'>
                        <label> Audio </label>
                        <input onChange={(event) => setAudio(event.target.files[0])} type='file' required name='audio' accept='audio/mpeg, audio/wav, audio/mp3' />
                    </div>



                    <div className='input'>
                        <label> Answer (1)  </label>
                        <input onChange={(event) => setAnswer1(event.target.value)} type="text"  name='answer1'/>
                    </div>

                    
                    <div className='input'>
                        <label> Answer (1) Score </label>
                        <input placeholder='from 0 -> 10' onChange={(event) => setAnswer1Priority(event.target.value)} type="number"  name='answer1Priority'/>
                    </div>


                    
                    <div className='input'>
                        <label> Answer (2)  </label>
                        <input onChange={(event) => setAnswer2(event.target.value)} type="text"  name='answer2'/>
                    </div>

                    
                    <div className='input'>
                        <label> Answer (2) Score </label>
                        <input placeholder='from 0 -> 10' onChange={(event) => setAnswer2Priority(event.target.value)} type="number"  name='answer2Priority'/>
                    </div>

                    
                    <div className='input'>
                        <label> Answer (3)  </label>
                        <input onChange={(event) => setAnswer3(event.target.value)} type="text"  name='answer3'/>
                    </div>

                    
                    <div className='input'>
                        <label> Answer (3) Score </label>
                        <input placeholder='from 0 -> 10' onChange={(event) => setAnswer3Priority(event.target.value)} type="number"  name='answer3Priority'/>
                    </div>



                    
                    <div className='input'>
                        <label> Answer (4)  </label>
                        <input onChange={(event) => setAnswer4(event.target.value)} type="text"  name='answer4'/>
                    </div>

                    
                    <div className='input'>
                        <label> Answer (4) Score </label>
                        <input placeholder='from 0 -> 10' onChange={(event) => setAnswer4Priority(event.target.value)} type="number"  name='answer4Priority'/>
                    </div>

                    
                    <div className='input'>
                        <label> Header  </label>
                        <input onChange={(event) => setHeader(event.target.value)} type='text' name="header" />
                    </div>


                    <div className='input'>
                        <label> Question Text  </label>
                        <textarea  onChange={(event) => setPara(event.target.value)} required="required"  name='para'></textarea>
                    </div>

                
                    <button type='submit'> SAVE </button>

                    </form>
                </div>
            </section>
        
        </>
    )
}

export default AddQuestion;