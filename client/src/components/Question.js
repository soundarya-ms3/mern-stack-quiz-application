import React, { useEffect, useState } from 'react';
import { useFetchQuestion } from '../hooks/fetchQuestion';
import { useDispatch, useSelector } from 'react-redux'; 
import { updateResult } from '../hooks/setResult';
import Timer from './Timer';

function Question({onChecked}) {
  const [checked, setChecked] = useState(undefined);
  const {trace} = useSelector(state => state.questions);
  const result = useSelector(state => state.result.result);
  const [{isLoading, serverError}] = useFetchQuestion();
  const question = useSelector(state => state.questions.queue[state.questions.trace]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({trace, checked}));
  },[checked])

  const onSelect = (i) => {
      onChecked(i)
      setChecked(i)
      dispatch(updateResult({trace, checked}));
  }
  if(isLoading) return <h3 className='text-light'>isLoading</h3>
  if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>
  return (
    <>
    <Timer />
    <div className='questions'>
      <h2 className='text-light'>{question?.question}</h2>
      <ul key={question?.id}>
        {
            question?.options.map((q,i) => (
                <li key={i}>
                    <input
                        type='radio'
                        value={false}
                        name='options'
                        id={`q${i}-option`}
                        onChange={() => onSelect(i)}
                    />
                    <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                    <div className={`check ${result[trace]=== i ? 'checked' : ''}`}></div>
                </li>
            ))
        }
      </ul>
    </div>
    </>
  )
}

export default Question
