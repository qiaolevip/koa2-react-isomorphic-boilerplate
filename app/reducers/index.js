/**
 * Created at 16/5/17.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import { combineReducers } from 'redux'
import indexApp from './indexapp'
import counter from './counter'

export default combineReducers({
  counter,
  indexApp
})
