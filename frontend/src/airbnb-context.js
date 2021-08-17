import { createContext, useReducer } from 'react';
import reducer, { initialState } from './store/reducer';

const AirbnbContext = createContext();

const Store = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AirbnbContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AirbnbContext.Provider>
    );
};

const withState = Child => props => (
    <AirbnbContext.Consumer>
        {(context) => <Child {...props} {...context} />}
    </AirbnbContext.Consumer>
);

export { Store, withState };