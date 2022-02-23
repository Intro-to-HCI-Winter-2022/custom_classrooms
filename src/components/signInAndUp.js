import React, { Component } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signinUser, signupUser } from '../actions';

class SignInAndUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayWarning: 'none', // display warning when not all inputs are filled out
      displayPasswordWarning: 'none', // display warning when passwords not same
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    };
  }

  // making the input fields driven
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  }

  onUserNameChange = (event) => {
    if (event.target.value.length <= 30) {
      this.setState({ username: event.target.value });
    }
  }

  // function returns true if input fields are valid, i.e. they have something in them
  // the regular expression in the if statement I got online at:
  // https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces/50971250
  // basically it replaces every space character with an empty string which allows me to check if each of the inputs
  // is empty.
  isValidInput = (inputs) => {
    if ((inputs.username.replace(/\s/g, '').length) && (inputs.password.replace(/\s/g, '').length)) {
      if (this.props.match.path === '/signup') {
        return (inputs.email.replace(/\s/g, '').length) && (inputs.confirmPassword.replace(/\s/g, '').length);
      } else {
        return true;
      }
    }
    return false;
  }

  onConfirmPress = (event) => {
    const inputs = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      confirmPassword: this.state.confirmPassword,
    };
    if (this.isValidInput(inputs)) {
      this.setState({ displayWarning: 'none' });
      this.setState({ displayPasswordWarning: 'none' });
      // sign in the user
      if (this.props.match.path === '/signin') {
        this.props.signinUser({ username: this.state.username, password: this.state.password }, this.props.history);
      // attempt to sign up the user
      } else if (inputs.password === inputs.confirmPassword) {
        this.props.signupUser(inputs, this.props.history);
      } else {
        this.setState({ displayPasswordWarning: 'inline' });
      }
    // display warning message
    } else {
      this.setState({ displayWarning: 'inline' });
      this.setState({ displayPasswordWarning: 'none' });
    }
  }

  onSwitchPress = (event) => {
    if (this.props.match.path === '/signin') {
      this.props.history.push('/signup');
    } else {
      this.props.history.push('/signin');
    }
  }

  onBackPress = (event) => {
    this.props.history.push('/');
  }

  handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.onConfirmPress();
    }
  }

  renderSignInOrUpOrError() {
    // rendering error component if there was a bad sign in
    let buttonText = '';
    let switchButtonText = '';
    let switchTo = '';
    let switchText = '';
    let signUpFields = 'none';
    if (this.props.match.path === '/signup') {
      buttonText = 'Sign Up';
      switchButtonText = 'Sign In';
      signUpFields = 'inline';
      switchTo = 'signin';
      switchText = 'Already have an account?';
    } else {
      buttonText = 'Sign In';
      switchButtonText = 'Sign Up';
      switchTo = 'signup';
      switchText = 'Don\'t have an account yet?';
    }

    return (
      <div className="sign_in_up_container">
        <div className="logo" />
        <div className="sign_in_up">
          <div className="sign_in_up_form">
            <div className="form_input">
              <p>User Name:</p>
              <input onChange={this.onUserNameChange} onKeyDown={this.handleEnterPress} value={this.state.username} />
            </div>
            <div className="form_input">
              <p>Password:</p>
              <input onChange={this.onPasswordChange} onKeyDown={this.handleEnterPress} value={'*'.repeat(this.state.password.length)} />
            </div>
            <div style={{ display: signUpFields }} className="form_input">
              <p>Confirm Password:</p>
              <input onChange={this.onConfirmPasswordChange} onKeyDown={this.handleEnterPress} value={'*'.repeat(this.state.confirmPassword.length)} />
            </div>
            <div style={{ display: signUpFields }} className="form_input">
              <p>Email:</p>
              <input onChange={this.onEmailChange} onKeyDown={this.handleEnterPress} value={this.state.email} />
            </div>
            <button type="button" onClick={this.onConfirmPress} className="button">{buttonText}</button>
            <div className="switch_sign_in_and_up">
              <p>{switchText}</p>
              <Link to={switchTo}>{switchButtonText}</Link>
            </div>
            <div id="warning" style={{ display: `${this.state.displayWarning}` }}>Please fill out all fields.</div>
            <div id="warning" style={{ display: `${this.state.displayPasswordWarning}` }}>Passwords do not match.</div>
          </div>
          <ArrowBackIosIcon className="icon" onClick={this.onBackPress} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="sign_in_up_page_container">{this.renderSignInOrUpOrError()}</div>
    );
  }
}

export default withRouter(connect(null, {
  signinUser, signupUser,
})(SignInAndUp));
