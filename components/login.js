import React from 'react'
import Link from 'next/link'
import UsersManagement from '../model/usersManagament'

function checkCanSubmit (state) {
  return state.email.length > 0 && state.password.length >= 6
}

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      canSubmit: false,
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  async handleSubmit (event) {
    // event.preventDefault()

    console.log('Current location: ', window.location)
    console.log('origin = ', window.location.origin)
    console.log('pathname = ', window.location.pathname)

    let isLoggedIn = await UsersManagement.login(
      this.state.email,
      this.state.password
    )
    console.log('handleSubmit.isLoggedIn: ', isLoggedIn)
    if (isLoggedIn) {
      window.location = window.location.origin
    }

    // else stay on login and display error
  }

  handleInputChange (event) {
    var update = this.state
    const value = event.target.type === 'checkbox'
      ? event.target.checked
      : event.target.value
    update[event.target.id] = value
    update.canSubmit = checkCanSubmit(update)
    this.setState(update)
  }

  render () {
    return (
      <div className='login-block'>
        <section>
          <h2>Log In</h2>
          <form action='#' onSubmit={this.handleSubmit}>
            <div className='field-holder'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                onChange={this.handleInputChange}
                value={this.state.password}
                id='password'
                placeholder=''
                className='showpassword'
              />
              <span className='error-text'>WRONG PASSWORD</span>
            </div>
            <input
              type='submit'
              disabled={!this.state.canSubmit}
              value='Log In'
            />
            <div className='links'>
              <Link href='/forgotPassword'>
                <a>Forgot password ?</a>
              </Link>
						</div>
						<div className='links'>
              <Link href='/register'>
                <a>Register</a>
              </Link>
            </div>
          </form>
        </section>
        <style jsx>{`
          .login-block {
            overflow: hidden;
            width: 100%;
						padding: 0px 5px 5px 20px;
            color: #d4d7e0;
          }
          label {
            display: block;
            margin: 0 0 5px;
            color: #304271;
            font-size: 11px;
            line-height: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          form .field-holder.error:after {
            font-family: 'FontAwesome';
            content: '\f00c';
            position: absolute;
            right: 19px;
            bottom: 14px;
            font-size: 20px;
            line-height: 20px;
            color: #1ad881;
          }
          .field-holder {
            margin: 0 0 10px;
            position: relative;
          }
          .field-holder.success:after,
          .field-holder.error:after {
            color: #ff4242;
            content: '\f00d';
          }
          .field-holder .error-text {
            display: none;
          }
          .field-holder.error .error-text {
            display: block;
            position: absolute;
            right: 10px;
            bottom: -5px;
            color: #ff4242;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 11px;
            line-height: 15px;
            background: #4f5359;
            padding: 0 7px;
          }
          .links {
            overflow: hidden;
            padding-top: 20px;
          }
          .links a {
            font-size: 14px;
            line-height: 17px;
            color: #6d85ff;
            float: left;
          }
          .links a.forgot {
            float: right;
          }
          .links a:hover {
            color: #fff;
          }
          .popup-holder {
            overflow: hidden;
            position: relative;
            height: 0;
          }
          input[type='text'],
          input[type='search'],
          input[type='tel'],
          input[type='email'],
          textarea,
          input[type='number'],
          input[type='password'],
          input[type='url'] {
            background: #fff;
            width: 85%;
            height: 34px;
            outline: none;
            padding: 0 10px;
            margin: 0 0 10px;
            display: block;
            border: 1px solid #606c77;
            border-radius: 5px;
            color: #374484;
            font-size: 16px;
            line-height: 20px;
          }
          input[type='submit'],
          button[type='submit'] {
            background: #212529;
            width: 91%;
            height: 44px;
            outline: none;
            padding: 0 10px;
            display: block;
            border: 0;
            font-size: 13px;
            line-height: 44px;
            text-align: center;
            cursor: pointer;
            transition: background 0.5s ease 0s;
            overflow: hidden;
            color: #fff;
            border-radius: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          input[type='submit']:hover,
          button[type='submit']:hover {
            background: #606c77;
          }
          input[type='checkbox'] {
            left: -999em;
            position: absolute;
          }
        `}</style>
      </div>
    )
  }
}
