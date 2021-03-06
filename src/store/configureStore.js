import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import stockDataReducer from '../reducers/stockData';
import stockReducer from '../reducers/stocks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            stockData: stockDataReducer,
            stocks: stockReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};