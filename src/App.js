import { useState, useEffect } from 'react'

import { Switch, Route } from 'react-router-dom'

import './App.css'

import Header from './components/header/header.component'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth } from './firebase/firebase.utils'

const App = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    console.log(currentUser)
  })

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return () => {
      unsubscribeFromAuth()
    }
  }, [])

  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  )
}

export default App
