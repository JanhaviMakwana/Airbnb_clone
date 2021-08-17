import React from 'react';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import { withState } from './airbnb-context';
import FullProperty from './components/FullProperty/FullProperty';
import AddPropertyPage from './pages/AddProperty';
import Book from './components/Book/Book';
import Orders from './components/Orders/Orders';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { LOGOUT, SET_AUTH_DATA } from './store/actionTypes';
import './App.css';


class App extends React.Component {

  componentDidMount() {
    window.onunload = () => {
      localStorage.clear();
    }

    const token = localStorage.getItem('token');
    console.log(token);
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      this.props.dispatch({ type: LOGOUT });
      this.logoutHandler();
      return;
    }

    const userId = localStorage.getItem('userId');
    const remainingMilliseconds = new Date(expiryDate).getDate() - new Date().getTime();
    this.props.dispatch({ type: SET_AUTH_DATA, userId: userId, token: token, isAuth: true });
    this.setAutoLogout(remainingMilliseconds);

  }

  logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiryDate');
  }

  setAutoLogoutHandler = millisecs => {
    setTimeout(() => {
      this.props.dispatch({ type: LOGOUT });
      this.logoutHandler();
    }, millisecs)
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Header />

          <Switch>
            <Route path="/host" component={AddPropertyPage} />
            <Route path="/book/:propertyId" exact component={Book} />
            <Route path="/explore/:propertyId" component={FullProperty} />
            <Route path="/orders" component={Orders} />
            <Route path="/signup" render={props => <SignupPage {...props} onLogout={(secs) => this.setAutoLogoutHandler(secs)} />} />
            <Route path="/login" render={props => <LoginPage {...props} onLogout={(secs) => this.setAutoLogoutHandler(secs)} />} />
            <Route path="/search" component={SearchPage} />

            <Route path="/" component={Home} />

          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default withState(App);
