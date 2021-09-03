import React from 'react';
import { withRouter } from 'react-router-dom';
import { withState } from '../airbnb-context';
import { Button, Input, FormLabel } from '@material-ui/core';
import axios from '../axios';
import { AUTH_SUCCESS, AUTH_FAIL } from '../store/actionTypes';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signupForm: {
                email: '',
                password: ''
            }
        }
    }

    inputChangeHandler = (event) => {
        this.setState(prevState => {
            const updatedForm = { ...prevState.signupForm, [event.target.name]: event.target.value }
            return { signupForm: updatedForm }

        })
    }

    onSignup = (event) => {
        event.preventDefault();
        axios.post('/signup', { email: this.state.signupForm.email, password: this.state.signupForm.password })
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

    gotoLoginPage = () => {
        this.props.history.replace('/login');
    }

    authCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="auth__form">
                <form onSubmit={this.onSignup}>
                    <div className="form__control">
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="text"
                            name="email"
                            placeholder="Email Here"
                            onChange={this.inputChangeHandler}
                            value={this.state.signupForm.email}
                        />
                    </div>
                    <div className="form__control">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="text"
                            name="password"
                            placeholder="Password"
                            onChange={this.inputChangeHandler}
                            value={this.state.signupForm.password}
                        />
                    </div>
                    <Button type="submit" variant="outlined" color="primary">Signup</Button>
                </form>
                <Button variant="contained" color="primary" onClick={this.gotoLoginPage}>Don't have an account? Sign up here.</Button>
                <Button variant="contained" color="secondary" onClick={this.authCancelHandler}>cancel</Button>
            </div>
        )
    }
};

export default withRouter(withState(Signup));