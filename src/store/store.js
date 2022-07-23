import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../redux/productApi';

import example from '../redux/Examplereducer';

/* Creating a store with the reducers and middleware. */
export const store = configureStore({
  /* Creating a reducer object with the reducerPath as the key and the reducer as the value. */
  reducer: {
    //example is a redux toolkit's reducer
    example: example,
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(productApi.middleware),
});
