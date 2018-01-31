// Counter example reducers
import counter from './components/redux/counter/counter';
// Currency convertor example reducers
import amount from './components/redux/currency-convertor/reducers/amount';
import error from './components/redux/currency-convertor/reducers/error';
// Course example reducers
import courses from './components/redux/course-management/reducers/courseReducer';
import authors from './components/redux/course-management/reducers/authorReducer';
import ajaxCallsInProgress from './components/redux/course-management/reducers/ajaxStatusReducer';
// Todos
import { todos, visibilityFilter } from './components/redux/Todo';
// Shopping cart reducer
import { cart, products } from './components/redux/shopping-cart/reducers';

const exampleReducers = {
  counter,
  amount,
  error,
  courses,
  authors,
  ajaxCallsInProgress,
  todos,
  visibilityFilter,
  cart,
  products,
};

export default exampleReducers;
