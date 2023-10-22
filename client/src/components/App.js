
import '../styles/App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import { CheckUserExist } from '../helper/helper';

const routes = createBrowserRouter([
  {
    path: 'https://mern-quiz-application-gt7g.vercel.app/',
    element: <Main />
  },
  {
    path: 'https://mern-quiz-application-gt7g.vercel.app/quiz',
    element: <CheckUserExist><Quiz /></CheckUserExist>
  },
  {
    path: 'https://mern-quiz-application-gt7g.vercel.app/result',
    element: <CheckUserExist><Result /></CheckUserExist>
  }
])

function App() {
  return (
    <>
    <RouterProvider router={routes}/>
    </>
  );
}

export default App;
