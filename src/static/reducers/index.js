import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import categoryReducer from './category';
import itemReducer from './item';
import dateReducer from './date';
import bookREducer from './book';
import contactFormReducer from './contactForm';
import accountInfoReducer from './accountInfo';
import usersReducer from './users';

export default combineReducers({
    auth: authReducer,
    routing: routerReducer,
    category: categoryReducer,
    item: itemReducer,
    date: dateReducer,
    book: bookREducer,
    contactForm: contactFormReducer,
    accountInfo: accountInfoReducer,
    users: usersReducer
});
