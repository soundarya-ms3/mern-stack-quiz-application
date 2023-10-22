import React from 'react'
import '../styles/Result.css';
import '../styles/Main.css';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAction } from '../redux/questionReducer';
import { resetResultAction } from '../redux/resultReducer';
import { attempts_Number, earnPoints_Number, flagResult} from '../helper/helper';
import { usePublishResult } from '../hooks/setResult';


function Result() {
    const dispatch = useDispatch();
    const {questions: {queue, answers}, result : {result, userId}} =  useSelector(state => state);
    const totalPoints = queue.length * 10;
    const attempts = attempts_Number(result);
    const earnPoints =  earnPoints_Number(result, answers, 10);
    const flag =  flagResult(totalPoints, earnPoints);

    usePublishResult({
        result,
        username: userId,
        attempts,
        points: earnPoints,
        achived : flag ? "Passed" : "Failed"
    })

    const onRestart = () => {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }
    return (
        <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>
        <div className='result flex-center'>
            <div className='flex'>
                <span className=''>Username</span>
                <span className='bold'>{userId}</span>
            </div>
            <div className='flex'>
                <span className=''>Total Quiz Points :</span>
                <span className='bold'>{totalPoints}</span>
            </div>
            <div className='flex'>
                <span className=''>Total Questions :</span>
                <span className='bold'>{queue.length}</span>
            </div>
            <div className='flex'>
                <span className=''>Total Attempts :</span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span className=''>Total Earn Points :</span>
                <span className='bold'>{earnPoints}</span>
            </div>
            <div className='flex'>
                <span className=''>Quiz Result</span>
                <span style = {{ color: `${flag ? '#2aff95': '#ff2a66'}`}} className='bold'>{flag ? 'Passed' : 'Failed'}</span>
            </div>
        </div>

        <div className='start'>
            <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div>
        <div className='container'>
            <ResultTable />
        </div>
        </div>
    )
}

export default Result
