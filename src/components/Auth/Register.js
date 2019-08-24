import React from "react";
import firebase from "../../firebase";
import md5 from "md5";

import { 
  MDBBtn, 
  MDBCard, 
  MDBCardBody 
} from "mdbreact";

import { Link } from "react-router-dom";

import FooterPart from './FooterPart';

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users")
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Seems you didn't fill in all the fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("user saved");
              });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;

    return (
      <div>
        <div className="login-page-desk">
          <MDBCard className="register-card">
          <MDBCardBody>
            <h2>BearChat</h2>
              <p style={{ color: '#A9A9A9'}}>Speak with the bears!</p>
                <form
                  className="needs-validation"
                  onSubmit={this.handleSubmit}
                >
                  <div className="login-field">
                    <input
                      name="username"
                      placeholder="Username"
                      onChange={this.handleChange}
                      value={username}
                      type="text"
                      spellCheck="false"
                    />
                  </div>

                  <div className="login-field">
                  <input
                    name="email"
                    placeholder="Email Address"
                    onChange={this.handleChange}
                    value={email}
                    className={this.handleInputError(errors, "email")}
                    type="email"
                    spellCheck="false"
                  />
                  </div>

                  <div className="login-field">
                  <input
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={password}
                    className={this.handleInputError(errors, "password")}
                    type="password"
                    spellCheck="false"
                  />
                  </div>

                  <div className="login-field">
                  <input
                    name="passwordConfirmation"
                    placeholder="Password Confirmation"
                    onChange={this.handleChange}
                    value={passwordConfirmation}
                    className={this.handleInputError(errors, "password")}
                    type="password"
                    spellCheck="false"
                  />
                  </div>

                  <MDBBtn
                  color="dark"
                  type="submit" 
                  className="login-btn"
                  //disabled={loading}
                  //className={loading ? "loading" : "login-btn"}
                  >
                  Register
                </MDBBtn> 
              </form>
              <hr/>
              <p>Already a user? <Link to="/login">Login</Link></p>
              
              {errors.length > 0 && (
                <div className="loginError">
                  <hr/>
                  <h3>Oh no!</h3>
                  {this.displayErrors(errors)}
                </div>
              )}
            </MDBCardBody>
          </MDBCard>
          
          
        </div>
        <div className="login-page-mobile">
            <h2>BearChat</h2>
            <p style={{ color: '#A9A9A9'}}>Speak with the bears!</p>
            <form
              className="needs-validation"
              onSubmit={this.handleSubmit}
            >
              <div className="login-field">
                <input
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={username}
                  type="text"
                  spellCheck="false"
                />
              </div>

              <div className="login-field">
              <input
                name="email"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type="email"
                spellCheck="false"
              />
              </div>

              <div className="login-field">
              <input
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password"
                spellCheck="false"
              />
              </div>

              <div className="login-field">
              <input
                name="passwordConfirmation"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, "password")}
                type="password"
                spellCheck="false"
              />
              </div>
              <MDBBtn
                color="dark"
                type="submit"
                className="login-btn"
                /*disabled={loading}
                className={loading ? "loading" : "login-btn"}*/
                >
                Register
              </MDBBtn>      
            </form>
            <p>Already a user? <Link to="/Login">Login</Link></p>
            {errors.length > 0 && (
              <div>
                <h3 className="loginError">Oh no!</h3>
                {this.displayErrors(errors)}
              </div>
            )}
          </div>
          <FooterPart/>
      </div>
    );
  }
}

export default Register;
