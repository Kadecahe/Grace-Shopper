import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import users from './users'
import products from './products'
import singleProduct from './single-product'
import cart from './cart'
import currentUser from './auth'
import user from './single-user'

const reducer = combineReducers({
  users,
  user,
  currentUser,
  products,
  singleProduct,
  cart
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
