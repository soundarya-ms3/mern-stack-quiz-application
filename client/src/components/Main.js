import React, { useRef } from 'react';
import {useFormik} from 'formik';
import { useNavigate} from 'react-router-dom';
import '../styles/Main.css';
import '../styles/App.css';
import { useDispatch } from 'react-redux';
import { setUserId } from '../redux/resultReducer';




function Main() {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch =  useDispatch();

    function startQuiz(){
      if(inputRef.current?.value){
        navigate('/quiz');
        dispatch(setUserId(inputRef.current?.value))
      }
      
      
    }
    const formik = useFormik({
      initialValues: {
        username : '',
      },
      validate: values => {
        let errors ={}
        if(!values.username){
          errors.username= 'Username Required!'
        }
        return errors;
      }
    })
  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      <ol>
        <li> Click on the ‘Start Test’ button to play the quiz</li>
        <li>The total time allowed for the online JavaScript quiz questions to be answered is 30 minutes. 
          Once the time is up, it will automatically be submitted.</li>
        <li>After answering the JavaScript MCQ questions, click on the ‘Submit Test’ button to see your score and correct answers.</li>
        <li>You will be asked 10 questions one after another</li>
        <li>Make sure that you do not refresh the questions page.</li>
      </ol>
      <form id='form' onSubmit={formik.handleSubmit}>
        <div>
        <input ref={inputRef} className="userid" name= 'username' type='text' placeholder='Username' onChange={formik.handleChange} value={formik.values.username} />
        {
          formik.errors.username ? <div className='error'>{formik.errors.username}</div> : null
        }
        </div>
        <div className='start'>
          <button className='btn' onClick={startQuiz}>Start Quiz
          </button>
          
        </div>
      </form>
    </div>
  )
}

export default Main
