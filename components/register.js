import React from 'react'
import UsersManagement from '../model/usersManagament'

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      canSubmit: false,
      name: '',
      email: '',
      password: '',
      rePassword: '',
      terms: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkCanSubmit = this.checkCanSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  checkCanSubmit () {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length >= 6 &&
      this.state.rePassword === state.password &&
      this.state.terms
    )
  }

  async handleSubmit (event) {
    event.preventDefault()

    console.log('Current location: ', window.location)
    console.log('origin = ', window.location.origin)
    console.log('pathname = ', window.location.pathname)

    let isRegistered = await UsersManagement.register(
      this.state.email,
      this.state.password,
      this.state.name
    )
    console.log('isRegistered: ', isRegistered)
    if (isRegistered) {
      window.location = window.location.origin
    }

    // else stay on register and display error
  }

  handleInputChange (event) {
    event.preventDefault()

    var update = this.state
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    update[event.target.id] = value
    update.canSubmit = checkCanSubmit(update)
    this.setState(update)
  }

  render () {
    return (
      <div className='register-block'>
        <section>
          <label><h2>Create account</h2></label>
          <form action='#' onSubmit={this.handleSubmit}>
            <div className='field-holder'>
              <label htmlFor='name'>Full Name</label>
              <input
                type='text'
                id='name'
                onChange={this.handleInputChange}
                value={this.state.name}
                placeholder=''
              />
            </div>
            <div className='field-holder'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                onChange={this.handleInputChange}
                value={this.state.email}
                placeholder=''
              />
            </div>
            <div className='field-holder'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                onChange={this.handleInputChange}
                value={this.state.password}
                placeholder=''
                className='showpassword'
              />
            </div>
            <div className='field-holder'>
              <label htmlFor='re-password'>Retype Password</label>
              <input
                type='password'
                id='rePassword'
                onChange={this.handleInputChange}
                value={this.state.rePassword}
                placeholder=''
                className='showpassword1'
              />
            </div>
            <div className='terms-block'>
              <input
                type='checkbox'
                id='terms'
                onChange={this.handleInputChange}
                checked={this.state.terms}
              />
              <label htmlFor='terms'>
                I AGREE TERMS & CONDITIONS AGREEMENT
              </label>
            </div>
            <input
              type='submit'
              value='CREATE ACCOUNT'
              // disabled={!this.state.canSubmit}
            />
          </form>
        </section>
        <style jsx>{`
          .register-block {
            overflow: hidden;
            width: 100%;
            padding: 0px 5px 5px 20px;
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
          .field-holder {
            margin: 0 0 10px;
            position: relative;
          }
          .field-holder.success:after,
          .field-holder.error:after {
            font-family: 'FontAwesome';
            content: '\f00c';
            position: absolute;
            right: 19px;
            bottom: 14px;
            font-size: 20px;
            line-height: 20px;
            color: #1ad881;
          }
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
