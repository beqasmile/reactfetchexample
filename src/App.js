import React, { Component } from 'react';
import {
  Route,
  Link,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';


class Login extends React.Component {
  state = {
    redirectToPreviousRoute: false
  };

  login = () => {
    AuthService.authenticate(() => {
      this.setState({ redirectToPreviousRoute: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToPreviousRoute } = this.state;

     if (redirectToPreviousRoute) {
     return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

const AuthService = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  logout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
};

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    AuthService.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);


const Public = () => (
  <div> This is a public page </div>
);

const Private = () => (
  <div> This is a private page </div>
);





// class Login extends React.Component {
//   state = {
//     redirectToPreviousRoute: false
//   };

//   login = () => {
//     AuthService.authenticate(() => {
//       this.setState({ redirectToPreviousRoute: true });
//     });
//   };

//   render() {
//     const { from } = this.props.location.state || { from: { pathname: "/" } };
//     const { redirectToPreviousRoute } = this.state;

//     if (redirectToPreviousRoute) {
//       return <Redirect to={from} />;
//     }

//     return (
//       <div>
//         <p>You must log in to view the page at {from.pathname}</p>
//         <button onClick={this.login}>Log in</button>
//       </div>
//     );
//   }
// }





class App extends Component {
  render() {
    return (
      <Router>
        <div style={{width: 1000, margin: '0 auto'}}>
          <ul>
            <li><Link to='/public'> Public </Link></li>
            <li><Link to='/private'> Private </Link></li>
          </ul>

          <hr/>

          <Route path='/login' component={Login} />
          <Route path='/public' component={Public} />
          <SecretRoute path='/private' component={Private} />
          <SecretRoute path='/bank' component={Private} />

        </div>
      </Router>
    );
  }
}
export default App;