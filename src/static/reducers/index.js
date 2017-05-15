import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import categoryReducer from './category';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    routing: routerReducer,
    category: categoryReducer
});
