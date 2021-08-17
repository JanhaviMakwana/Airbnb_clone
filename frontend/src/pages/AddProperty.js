import React from 'react';
import { withRouter } from 'react-router-dom';
import { withState } from '../airbnb-context';
import { Button, Input, FormControl, FormLabel } from '@material-ui/core';
import axios from '../axios';
import './AddProperty.css';

class AddProperty extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addPropertyForm: {
                title: 'ihoew',
                description: 'wjkew',
                facilities: ['ewjwe'],
                price: 22,
                image: '',
                location: 'weiwehi',
                star: 'ewe'
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
        if (event.target.name === 'facility') {
            this.setState({ currentFacility: event.target.value });
            /*  console.log(this.state); */
        } else {
            this.setState(prevState => {

                let updatedForm = { ...prevState.addPropertyForm }

                if (event.target.name === 'image') {
                    updatedForm[event.target.name] = event.target.files[0];
                } else {
                    updatedForm[event.target.name] = event.target.value
                }
                /*   console.log(updatedForm); */
                return { addPropertyForm: updatedForm }

            });
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        /*  console.log(this.state.addPropertyForm); */
        const formData = new FormData();
        /*  console.log(this.props.state.token);  */
        console.log(localStorage.getItem('token'));
        formData.append('image', this.state.addPropertyForm.image);
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        axios.post('/post-image', formData, { headers: headers }).then(({ data }) => {
            console.log(data);
            this.setState({ image: data.filePath.replace("\\", '/') });
            const postData = {
                ...this.state.addPropertyForm,
                image: data.filePath.replace("\\", '/')
            }
            console.log(postData);
            axios.post('/add-property', postData, { headers: headers })
                .then(res => {
                    console.log(res);
                    this.props.history.replace('/');
                })
                .catch(err => {
                    console.log(err);
                })
        }).catch(err => {
            console.log(err);
        })

    }

    render() {

        return (
            <div className="addProperty" >
                
                    <FormControl onSubmit={this.onFormSubmit}>
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
                           
                            <Input 
                            fullWidth
                                type="number"
                                name="price"
                                onChange={this.inputChangeHandler}
                                value={this.state.addPropertyForm.price}
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
                        <Button variant="contained" color="primary">Add</Button>
                    </FormControl>
                
            </div>
        );
    }
}

export default withRouter(withState(AddProperty));