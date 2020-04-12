import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { AuthContext } from "./auth/auth";

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default function App (){



  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }


    return (
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
        </AuthContext.Provider>
      </ThemeProvider>
    );

}

/*
export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      authTokens:JSON.parse(localStorage.getItem("tokens"))
    }
  }

  // const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  // const [authTokens, setAuthTokens] = useState(existingTokens);

  setTokens(data){
    localStorage.setItem("tokens", JSON.stringify(data));
    this.setState({
      authTokens: data
    });
  }

  render() {

    const { authTokens } = this.state;
    
    return (
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ authTokens, setAuthTokens: this.setTokens }}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
        </AuthContext.Provider>
      </ThemeProvider>
    );
  }
}

*/
