import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import moment from 'moment';
import SearchResult from '../SearchResult/SearchResult';
import { withState } from '../../airbnb-context';
import { SET_ERROR } from '../../store/actionTypes';
/* import { Button, Select } from '@material-ui/core'; */
import './SearchPage.css';


function SearchPage(props) {
    console.log(props);
    const filter = props.location.state ? props.location.state.filter : null;

    const ref = React.createRef(null);
    const [result, setResult] = useState();
    const [price, setPrice] = useState(1);
    const [city, setCity] = useState(filter ? filter.city : '');
    const [cancellation, setCancellation] = useState(false);
    const [guests, setGuests] = useState();
    const startDate = filter ? filter.startDate : null;
    const endDate = filter ? filter.endDate : null;

    /* new Date().setMonth(startDate.getMonth()+1) */
    const keyword = new URLSearchParams(props.location.search).get('keyword') || '';

    useEffect(() => {


        axios.post('/search', {
            city: city,
            cancellation: cancellation,
            guests: guests,
            startDate: startDate,
            endDate: endDate,
            price: price
        })
            .then(res => {
                console.log(res);
                setResult(res.data.properties);
            })
            .catch(err => {
                console.log(err);
            })


        /*  axios.get(`/get-properties?keyword=${keyword}`)
              .then(res => {
                  setResult(res.data.properties);
              })
              .catch(e => {
                  dispatch({ type: SET_ERROR, error: e });
              }); */

        // eslint-disable-next-line
    }, [keyword, cancellation, price, city, guests])

    const onFullPropertyView = id => {
        props.history.push(`/explore/${id}`);
    }

    const cityHandler = (event) => {
        setCity(event.target.value);

    }

    const priceHandler = (event) => {
        setPrice(event.target.value);

    }

    const guestHandler = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        setGuests(event.target.value)
    }

    return (
        <div className="searchPage">
            <div className="searchPage__info">
                {startDate && <p> {moment(startDate).format('LL')} to {moment(endDate).format('LL')}</p>} 
                <h1>Stays nearby</h1>
                <div className="filter__options">
                    <div className={cancellation ? 'options active' : 'options'}>
                        <button type="button" onClick={() => setCancellation(!cancellation)}>Cancellation Flexibility
                        </button>
                    </div>
                    <div className="options">
                        <select name="city" className="option" onChange={cityHandler}>
                            <option value="">
                                All
                            </option>
                            <option value="ahmedabad">
                                Ahmedabad
                            </option>
                            <option value="surat">
                                Surat
                            </option>
                            <option value="gandhinagar">
                                Gandhinagar
                            </option>
                            <option value="mumbai">
                                Mumbai
                            </option>
                        </select>
                    </div>
                    <div className="options">
                        <select name="price" className="option" onChange={priceHandler}>
                            <option value={1}>
                                All
                            </option>
                            <option value={20}>
                                Above 20$
                            </option>
                            <option value={30}>
                                Above 30$
                            </option>
                            <option value={40}>
                                Above 40$
                            </option>
                            <option value={50}>
                                Above 50$
                            </option>
                        </select>
                    </div>
                    <div className="options">
                        <p>No of people</p>
                        <select name="guests" className="option" onChange={guestHandler}>
                            <option value="">
                                All
                            </option>
                            <option value={1} >
                                1
                            </option>
                            <option value={2}>
                                2
                            </option>
                            <option value={3}>
                                3
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            {result && result.map((result, index) => {
                return <SearchResult
                    onClick={() => onFullPropertyView(result._id)}
                    key={result._id}
                    img={`http://localhost:8080/${result.image}`}
                    title={result.title}
                    description={result.facilities}
                    star={result.star}
                    price={result.price + '$ / night'}
                />
            })}
        </div>
    );
}
export default withState(SearchPage);