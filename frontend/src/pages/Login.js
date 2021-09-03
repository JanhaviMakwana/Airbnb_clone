import React from 'react';
import { withRouter } from 'react-router-dom';
import { withState } from '../airbnb-context';
import { Button,  Input,  FormLabel} from '@material-ui/core';
import axios from '../axios';
import { AUTH_SUCCESS, AUTH_FAIL } from '../store/actionTypes';
import './auth.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginForm: {
                email: 'abc@123.com',
                password: 'abc123'
            }
        }
    }

    inputChangeHandler = (event) => {
        this.setState(prevState => {
            const updatedForm = { ...prevState.loginForm, [event.target.name]: event.target.value }
            return { loginForm: updatedForm }

        })
    }

    onLogin = (event) => {
        event.preventDefault();
        axios.post('/login', { email: this.state.loginForm.email, password: this.state.loginForm.password })
            .then(({ data }) => {
        
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data._id);
                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                this.props.dispatch({ type: AUTH_SUCCESS, token: data.token, userId: data._id })
                localStorage.setItem('expiryDate', expiryDate.toISOString());
                this.props.onLogout(remainingMilliseconds);
                this.props.history.goBack();
        
            })
            .catch(err => {
                this.props.dispatch({ type: AUTH_FAIL, error: err });
            })
        
    }

    gotoSignupPage = () => {
        this.props.history.replace('/signup');
    }

    authCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (

            <div className="auth__form">
                <form onSubmit={this.onLogin}>
                    <div className="form__control">
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="text"
                            name="email"
                            placeholder="Email Here"
                            onChange={this.inputChangeHandler}
                            value={this.state.loginForm.email}
                        />
                    </div>
                    <div className="form__control">
                    <FormLabel>Password</FormLabel>
                        <Input
                            type="text"
                            name="password"
                            placeholder="Password"
                            onChange={this.inputChangeHandler}
                            value={this.state.loginForm.password}
                        />
                    </div>
                    <Button type="submit"  variant="outlined" color="primary">Login</Button>
                </form>
                <Button  variant="contained" color="primary" onClick={this.gotoSignupPage}>Don't have an account? Sign up here.</Button>
                <Button  variant="contained" color="secondary" onClick={this.authCancelHandler}>Cancel</Button>
            </div>

        )
    }
};

export default withRouter(withState(Login));
