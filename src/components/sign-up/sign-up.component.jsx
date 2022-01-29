import { useState } from 'react'

import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

const SignUp = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert("passwords don't match")
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      await createUserProfileDocument(user, { displayName })
      setDisplayName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='sign-up'>
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onInputChange={e => setDisplayName(e.target.value)}
          label='Display Name'
          required
        />
        <FormInput 
          type='email'
          name='Email'
          value={email}
          onInputChange={e => setEmail(e.target.value)}
          label='Email'
          required
        />
        <FormInput 
          type='password'
          name='Password'
          value={password}
          onInputChange={e => setPassword(e.target.value)}
          label='Password'
          required
        />
        <FormInput 
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onInputChange={e => setConfirmPassword(e.target.value)}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  )
}

export default SignUp
