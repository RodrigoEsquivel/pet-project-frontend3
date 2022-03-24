import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureAppStore } from './store/configureStore';
import { HelmetProvider } from 'react-helmet-async';
import { Grommet } from 'grommet';
import { ProviderAuth } from './utils/useAuth';


const store= configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    <Grommet>
      <HelmetProvider>
        <React.StrictMode>
          <ProviderAuth>
            <App />
          </ProviderAuth>
        </React.StrictMode>
      </HelmetProvider>
    </Grommet>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
