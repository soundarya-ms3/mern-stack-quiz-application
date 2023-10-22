import React, { useState } from 'react'
import Question from './Question';
import { MoveNextAction, MovePrevAction} from '../hooks/fetchQuestion';
import {useSelector, useDispatch} from 'react-redux';
import { PushAnswer } from '../hooks/setResult';
import { Navigate } from 'react-router-dom';


function Quiz() {
  const [checked, setChecked] = useState(undefined);
  const {trace, queue} = useSelector(state => state.questions);
  const result = useSelector(state => state.result.result)
  const dispatch = useDispatch()
  

  const onNext = () =>{
      if(trace<queue.length){
        dispatch(MoveNextAction());
        if(result.length <= trace){
          dispatch(PushAnswer(checked));
        }
      }
      setChecked(undefined);

  }
  const onPrev = () =>{
      if(trace>0){
        dispatch(MovePrevAction());
        if(result.length <= trace){
          dispatch(PushAnswer(checked));
        }
      }
      setChecked(undefined);
  }
  const onChecked = (check) =>{
    setChecked(check)
  }
  if(result.length && result.length >= queue.length){
    return <Navigate to={'/result'} replace={true}></Navigate>
  }
  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      <Question onChecked={onChecked}/>
      <div className='grid'>
        { trace > 0 ? <button className='btn prev' onClick={onPrev}>Previous</button> : <div></div>}
        <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>
  )
}

export default Quiz
