import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  AllMasks,
  AllFaceshields,
  AllSanitizers,
  AllUsers,
  SingleUser,
  SingleProductPage,
  ProductUpdate,
  Cart,
  MyProfile
} from './components'
import {me} from './store'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/masks" component={AllMasks} />
        <Route exact path="/products/faceshields" component={AllFaceshields} />
        <Route exact path="/products/sanitizers" component={AllSanitizers} />
        <Route exact path="/products/:id" component={SingleProductPage} />

        {/*
        The below routes can only be accessed and rendered if the current user is admin
        */}
        <Route exact path="/products/:id/edit" component={ProductUpdate} />
        <Route exact path="/users" component={AllUsers} />
        <Route exact path="/users/:id" component={SingleUser} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/profile" component={MyProfile} />
          </Switch>
        )}

        {/* {isAdmin &&
          isAdmin === true && (
            <Switch> */}
        {/* Routes placed here are only available for admins after logging in*/}

        {/* </Switch>
          )} */}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  // console.log(state.users)
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    // conerced to boolean from the id number
    isLoggedIn: !!state.currentUser.id,
    isAdmin: state.currentUser.isAdmin
  }
}

const mapDispatch = dispatch => ({
  loadInitialData: () => {
    dispatch(me())
  }
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
  // isAdmin: PropTypes.bool.isRequired
}
