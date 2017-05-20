import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import categoryReducer from './category';
import itemReducer from './item';
import dateReducer from './date';
import bookREducer from './book';
import contactFormReducer from './contactForm';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    routing: routerReducer,
    category: categoryReducer,
    item: itemReducer,
    date: dateReducer,
    book: bookREducer,
    contactForm: contactFormReducer
});
