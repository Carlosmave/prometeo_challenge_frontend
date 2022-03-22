import { combineReducers } from 'redux'

import accountReducer from './account'
import clientReducer from './client'
import creditCardReducer from './creditCard'
import profileReducer from './profile'
import providerReducer from './provider'
import sidebarReducer from './sidebar'
import transferDestinationReducer from './transferDestination'
import transferenceReducer from './transference'
import loginReducer from './login'

const rootReducer = combineReducers({
  account: accountReducer,
  client: clientReducer,
  creditCard: creditCardReducer,
  profile: profileReducer,
  provider: providerReducer,
  sidebar: sidebarReducer,
  transferDestination: transferDestinationReducer,
  transference: transferenceReducer,
  login: loginReducer
})

export default rootReducer
