import React from 'react';

class Signin extends React.Component {
  constructor(props) { // have to pass the props passed in app.js
    super(props); // this instantializes a prototypical object
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  };
  
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  };

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  };

  onSubmitSignIn = () => {
    console.log('Process environment', process.env)
    const localUrl = "http://localhost:5000"
    const herokuUrl = "https://vast-wildwood-78447.herokuapp.com"
    let url ='';
    process.env.NODE_ENV==="development"? url = localUrl: url = herokuUrl;

    fetch(url+'/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        // checks if the server responded with an actual user before proceeding
        if (user.id){
          this.props.onRouteChange('home');
          this.props.loadUser(user);
        }
      })
  }

  render() {
    const {onRouteChange} = this.props;
    return (
      <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  onChange = {this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  onChange = {this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" name="password"  id="password"/>
              </div>
            </fieldset>
            <div className="">
              <input //have to use callback so that we dont just call the function immediately. 
                onClick = { this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in"/>
            </div>
            <div className="lh-copy mt3">
              <p onClick = { () =>onRouteChange('register') } className="f6 link dim black db pointer">Register</p>
            
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Signin;