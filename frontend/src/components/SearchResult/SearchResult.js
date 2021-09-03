import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import './SearchResult.css';


function SearchResult({ img, location, title, description, star, price, onClick }) {
    return (
        <div className="searchResult" onClick={onClick}>
            <img src={img} alt="" />
           
            <div className="searchResult__info">
                <div className="searchResult_infoTop">
                    <p>{location}</p>
                    <h3>{title}</h3>
                    <p>____</p>
                    <p>{description.map((d, index) => {
                        return index + 1 === description.length ? ` ${d} ` : ` ${d} -`
                    })}</p>
                </div>
                <div className="searchResult__infoBottom">
                    <div className="searchResult__stars">
                        <StarIcon className="searchResult__star" />
                        <p>
                            <strong>{star}</strong>
                        </p>
                    </div>
                    <div className="searchResults__price">
                        <h2>{price}</h2>
                        {/*  <p>{total}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;