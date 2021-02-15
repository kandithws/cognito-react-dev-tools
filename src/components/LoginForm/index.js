import React from 'react';
import TextInput from '../common/TextInput';

class LoginForm extends React.Component {
  state = { username: '', password: '' };

  updateStateField = (fieldName, val) => {
    this.setState((prevState) => {
      const st = Object.assign({}, prevState, { [fieldName]: val });

      return st;
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    await this.props.onSubmit({
      username: this.state.username,
      password: this.state.password,
    });
  };

  render() {
    return (
      <div className='box'>
        <form className='form' onSubmit={this.onSubmit}>
          <TextInput
            label='Username'
            value={this.state.username}
            onChange={(e) => {
              this.updateStateField('username', e.target.value);
            }}
          />

          <div className='field'>
            <label className='label'>Password</label>
            <div className='control'>
              <input
                className='input'
                type='password'
                placeholder='Password'
                value={this.state.password}
                onChange={(e) => {
                  this.updateStateField('password', e.target.value);
                }}
              />
            </div>
          </div>

          <button type='submit' className='button is-link'>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
