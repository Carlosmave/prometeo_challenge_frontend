import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices'

test('renders login page', () => {
  const store = configureStore({ reducer: rootReducer })
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/¡Bienvenido al portal de Prometeo!/i)).toBeInTheDocument();
});
