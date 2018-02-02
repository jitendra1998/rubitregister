import React, { Component } from 'react';
import { RegistrationErrors } from './RegistrationErrors';
import './Registration.css';

class Registration extends Component {
  constructor (props) {
    super(props);
    this.state = {
      uname: '',
      email: '',
      phone: '',
      password: '',
      address: '',
      formErrors: {uname: '', phone: '', email: '', password: '', address: ''},
      nameValid: false,
      phoneValid: false,
      emailValid: false,
      passwordValid: false,
      addressValid: false,
      formValid: false,
      isDetailsPage: false,
      isRegistrationPage: true
    };
    this.isDetailsPage  = this.isDetailsPage.bind(this);
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let phoneValid = this.state.phoneValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let addressValid = this.state.addressValid;


    switch(fieldName) {
      case 'uname':
        nameValid = value.match(/^[a-z A-Z]+$/);
        fieldValidationErrors.name = nameValid ? '' : ' is invalid';
        break;
      case 'phone':
        phoneValid = value.match(/^[0-9]+$/);
        fieldValidationErrors.phone = phoneValid ? '' : ' is invalid';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      case 'address':
        addressValid = value.match(/^[a-zA-Z0-9\s,.'-/]{3,}$/);
        fieldValidationErrors.address = addressValid ? '': ' is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    phoneValid: phoneValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    addressValid: addressValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.phoneValid && this.state.emailValid && this.state.passwordValid && this.state.addressValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  isDetailsPage() {
    this.setState({
      isDetailsPage : true,
      isRegistrationPage: false
    });
  }


  detailspage(){
    return(
      <div className="register">
        <h2>Details Page</h2>


        <div>
          <label>Name</label>
          <p className="form-control">             
            {this.state.uname} </p>
        </div>

        <div>
          <label>Phone Number</label>
          <p className="form-control">             
            {this.state.phone} </p>
        </div>

        <div>
          <label>Email address</label>
          <p className="form-control">             
            {this.state.email} </p>
        </div>

        <div>
          <label>Password</label>
          <p className="form-control"> 
            {this.state.password} </p>
        </div>
        
        <div>
          <label>Address</label>
          <p className="form-control"> 
            {this.state.address} </p>
        
        </div>
      </div>
    );
  };

  render () {
    var registrationForm = (
      <form className="register">

        <h2>Registration</h2>

        <div className="panel panel-default">
          <RegistrationErrors formErrors={this.state.formErrors} />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.uname)}`}>
          <label htmlFor="name">Name</label>
          <input type="name" required className="form-control" name="uname"
            placeholder="Name"
            value={this.state.uname}
            onChange={this.handleUserInput}  />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.phone)}`}>
          <label htmlFor="phone">Phone Number</label>
          <input type="phone" required className="form-control" name="phone"
            placeholder="Phone"
            value={this.state.phone}
            onChange={this.handleUserInput}  />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`}>
          <label htmlFor="address">Address</label>
          <input type="address" className="form-control" name="address"
            placeholder="Address"
            value={this.state.address}
            onChange={this.handleUserInput}  />
        </div>

        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid} onClick={this.isDetailsPage}>Register</button>
      </form>
    );

    return (
      <div>
        {this.state.isRegistrationPage ? registrationForm: null}
        {this.state.isDetailsPage ? this.detailspage() : null}
      </div>
    );
  }
}

export default Registration;