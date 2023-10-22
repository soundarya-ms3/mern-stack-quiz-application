import {combineReducers, configureStore} from '@reduxjs/toolkit'
import questionReducer from './questionReducer'
import  resultReducer  from './resultReducer.js'


const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer,

})

export default configureStore({reducer: rootReducer})