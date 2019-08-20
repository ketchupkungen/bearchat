import React from "react";
import firebase from "../../firebase";
/*import {
  Form,
  Card,
} from "semantic-ui-react";*/
import { MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import { Link } from "react-router-dom";

import FooterPart from './FooterPart';

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser);
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

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <div>
        <div className="login-page-desk">
          <MDBCard className="login-card">
            <MDBCardBody>
              <h2>BearChat</h2>
                <p style={{ color: '#A9A9A9'}}>Speak with the bears!</p>
                <form
                  className="needs-validation"
                  onSubmit={this.handleSubmit}
                >
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
                  <MDBBtn
                    className="login-btn"
                    color="dark"
                    type="submit"
                    //disabled={loading}
                    //className={loading ? "loading" : "login-btn"}
                    >
                    Login
                  </MDBBtn>      
                </form>
                <hr/>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                {errors.length > 0 && (
                  <div>
                    <h3 className="loginError">Oh no!</h3>
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
                  name="email"
                  placeholder="Email Address"
                  onChange={this.handleChange}
                  value={email}
                  className={"form-control" + this.handleInputError(errors, "email")}
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
                  className={"form-control" + this.handleInputError(errors, "password")}
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
                Login
              </MDBBtn>      
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
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

export default Login;
