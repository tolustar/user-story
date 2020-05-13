import currentUser from './currentUser'
import stories from './stories'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  currentUser,
  stories
})

export default rootReducer