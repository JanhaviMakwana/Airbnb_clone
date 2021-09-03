import React from 'react';
import { withRouter } from 'react-router-dom';
import { withState } from '../airbnb-context';
import { SET_ERROR } from '../store/actionTypes';
import { Button, Input, FormLabel, TextField, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import axios from '../axios';
import './AddProperty.css';

class AddProperty extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addPropertyForm: {
                title: '',
                description: '',
                facilities: [],
                price: 22,
                image: '',
                location: '',
                star: '',
                freeCancellation: false,
                guests: 1,
                city: ''
            },
            currentFacility: ''
        }
    }


    addFacilityHandler = (event) => {
        this.setState(prevState => {
            const updatedForm = {
                ...prevState.addPropertyForm
            }
            updatedForm['facilities'] = prevState.addPropertyForm.facilities.slice();

            updatedForm['facilities'].push(this.state.currentFacility);
            return { addPropertyForm: updatedForm, currentFacility: '' }
        })
    };

    inputChangeHandler = (event) => {
        console.log(event.target.name);
        console.log(typeof (event.target.value));
        if (event.target.name === 'facility') {
            this.setState({ currentFacility: event.target.value });

        } else {
            this.setState(prevState => {

                let updatedForm = { ...prevState.addPropertyForm }

                if (event.target.name === 'image') {
                    updatedForm[event.target.name] = event.target.files[0];
                } else {
                    updatedForm[event.target.name] = event.target.value
                }
                return { addPropertyForm: updatedForm }

            });
        }

    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.addPropertyForm.image);
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        axios.post('/post-image', formData, { headers: headers }).then(({ data }) => {
            this.setState({ image: data.filePath.replace("\\", '/') });
            const postData = {
                ...this.state.addPropertyForm,
                image: data.filePath.replace("\\", '/')
            }
            axios.post('/add-property', postData, { headers: headers })
                .then(res => {
                    this.props.history.replace('/');
                })
                .catch(err => {
                    this.props.dispatch({ type: SET_ERROR, error: err })
                })
        }).catch(err => {
            this.props.dispatch({ type: SET_ERROR, error: err })
        })

    }

    render() {
        console.log(this.state.addPropertyForm);
        return (
            <div className="addProperty" >

                <form onSubmit={this.onFormSubmit}>
                    <div className="property_form__control">
                        <FormLabel>Title</FormLabel>
                        <Input
                            fullWidth
                            type="text"
                            name="title"
                            onChange={this.inputChangeHandler}
                            value={this.state.addPropertyForm.title}

                        />
                    </div>
                    <div className="property_form__control">
                        <FormLabel>Description</FormLabel>
                        <Input
                            fullWidth
                            type="text"
                            name="description"
                            onChange={this.inputChangeHandler}
                            value={this.state.addPropertyForm.description}
                        />
                    </div>
                    <div className="property_form__control">
                        <FormLabel>Star</FormLabel>

                        <Input
                            fullWidth
                            type="text"
                            name="star"
                            onChange={this.inputChangeHandler}
                            value={this.state.addPropertyForm.star}
                        />
                    </div>
                    <div className="property_form__control">
                        <FormLabel>City</FormLabel>

                        <Input
                            fullWidth
                            type="text"
                            name="city"
                            onChange={this.inputChangeHandler}
                            value={this.state.addPropertyForm.city}
                        />
                    </div>
                    <div className="property_form__control">
                        <FormLabel>Free Cancellation</FormLabel>
                        <RadioGroup name="freeCancellation" value={this.state.addPropertyForm.freeCancellation} onChange={this.inputChangeHandler}>
                            <FormControlLabel value="true" control={<Radio />} label="YES" />
                            <FormControlLabel value="false" control={<Radio />} label="NO" />
                        </RadioGroup>
                    </div>

                    <div className="property_form__control">
                        <FormLabel>Image</FormLabel>

                        <Input fullWidth type="file" name="image"
                            onChange={this.inputChangeHandler} />
                    </div>
                    <div className="property_form__control">
                        <FormLabel>Facilities</FormLabel>

                        <Input fullWidth type="text" name="facility"
                            value={this.state.currentFacility}
                            onChange={this.inputChangeHandler} />
                        <Button variant="outlined" color="primary" size="small" fullWidth onClick={this.addFacilityHandler} type="button">Add Facility</Button>
                    </div>
                    <div className="property_form__control">
                        <FormLabel>Price</FormLabel>

                        <TextField
                            fullWidth
                            type="number"
                            name="price"
                            InputProps={{
                                max: 3, mix: 1
                            }}
                            onChange={this.inputChangeHandler}
                            value={this.state.addPropertyForm.price}
                        />
                    </div>
                    <div className="property_form__control">
                        <FormLabel>Guests</FormLabel>

                        <Input
                            fullWidth
                            type="number"
                            name="guests"
                            onChange={this.inputChangeHandler}
                            value={this.state.addPropertyForm.guests}
                            max="3"
                        />
                    </div>
                    <div className="form__control">
                        <FormLabel>location</FormLabel>

                        <Input
                            fullWidth
                            type="text"
                            name="location"
                            onChange={this.inputChangeHandler}
                            value={this.state.addPropertyForm.location}
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary">Add</Button>
                </form>

            </div>
        );
    }
}

export default withRouter(withState(AddProperty));