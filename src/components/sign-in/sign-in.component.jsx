import { useState } from 'react'

import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await auth.signInWithEmailAndPassword(email, password)
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          onInputChange={(e) => setEmail(e.target.value)}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          onInputChange={(e) => setPassword(e.target.value)}
          value={password}
          label='password'
          required
        />

        <div className="buttons">
          <CustomButton type='submit'>
            Sign in
          </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignIn
