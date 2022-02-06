import { useEffect, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Switch, Route, Redirect } from 'react-router-dom'


import { GlobalStyle } from './global.styles'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))

const App = (props) => {
  const { currentUser, setCurrentUser } = props

  useEffect(() => {
    let unsubscribeFromUserRef = null
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        unsubscribeFromUserRef = userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })

    return () => {
      unsubscribeFromAuth()
      if (unsubscribeFromUserRef) {
        unsubscribeFromUserRef()
      }
    }
  }, [setCurrentUser])

  return (
    <div>
      <GlobalStyle />
      <Header/>
      <Switch>
        <Suspense fallback={<div>...Loading</div>}>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() => currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />}
          />
        </Suspense>
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
