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


class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {

    fetch('https://localhost:44303/api/Drivers/GetAllDrivers' )


    .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    
    // .then(function(response) {
    //   // The response is a Response instance.
    //   // You parse the data into a useable format using `.json()`
    //   return response.json();
    // }).then(function(data) {
    //   this.setState({
    //            isLoaded: true,
    //           items: data 
    //          });
    // }); 


      // .then(
      //   (result) => {
      //     this.setState({
      //       isLoaded: true,
      //       items: result.data 
      //     });
      //   },
      //   // Note: it's important to handle errors here
      //   // instead of a catch() block so that we don't swallow
      //   // exceptions from actual bugs in components.
      //   (error) => {
      //     this.setState({
      //       isLoaded: true,
      //       error
      //     });
      //   }
      // )
  }


  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (items)
    {
      return (
        <ul>
          {items.map(item => (
             <li key={item.ID}>
                           {item.DriverName} {item.Age}
                      </li>
          ))}
        </ul>
      );
    }

  }
}






class MyComponentRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {

    fetch('https://api.ratesapi.io/api/latest' )


    .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.rates
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    
    
  }


  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (items)
    {
      var tifOptionsForEach = []
		Object.keys(items).forEach(function(key) {
    	tifOptionsForEach.push(<li>{key} {items[key]} {items[key]}</li>);
		});
      return (
        <div>
	  		
				<ul>{tifOptionsForEach}</ul>
      
    	</div>
      );
    }

  }
}






class App extends Component {
  render() {
    return (
      <Router>
        <div style={{width: 1000, margin: '0 auto'}}>
          <ul>
            <li><Link to='/public'> Public </Link></li>
            <li><Link to='/private'> Private </Link></li>
            <li><Link to='/mycomponent'> MyComponent </Link></li>
            <li><Link to='/rates'> Rates </Link></li>
          </ul>

          <hr/>

          <Route path='/login' component={Login} />
          <Route path='/public' component={Public} />
          <SecretRoute path='/private' component={Private} />
          <SecretRoute path='/mycomponent' component={MyComponent} />
          <SecretRoute path='/rates' component={MyComponentRates} />

        </div>
      </Router>
    );
  }
}
export default App;