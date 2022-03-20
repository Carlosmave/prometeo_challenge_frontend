import { combineReducers } from 'redux'

import loginFormReducer from './loginForm'

const rootReducer = combineReducers({
  loginForm: loginFormReducer
})

export default rootReducer
