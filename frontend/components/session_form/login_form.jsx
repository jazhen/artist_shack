import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const SessionErrors = ({ errors, field }) => {
  return errors.responseJSON ? <span>{errors.responseJSON[field]}</span> : null;
};

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username_or_password: '',
      password: '',
    };
  }

  handleSubmit(e) {
    const { login, history } = this.props;
    const user = { ...this.state };

    e.preventDefault();
    login(user);
    history.push('/');
  }

  handleFieldChange(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    const { usernameOrEmail, password } = this.state;
    const { formType, errors } = this.props;

    return (
      <div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <h1>{formType}</h1>
          <label htmlFor="username">
            <span>Username / email</span>
            <input
              type="text"
              className={errors.username ? 'invalid' : 'valid'}
              id="username"
              value={usernameOrEmail}
              onChange={this.handleFieldChange('username_or_password')}
            />
            <SessionErrors errors={errors} field="username" />
          </label>
          <label htmlFor="password">
            <span>password</span>
            <input
              type="password"
              className={errors.password ? 'invalid' : 'valid'}
              id="password"
              value={password}
              onChange={this.handleFieldChange('password')}
            />
            <SessionErrors errors={errors} field="password" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SessionForm;
