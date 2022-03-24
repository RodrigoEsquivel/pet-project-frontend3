import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { configureAppStore } from './store/configureStore';
import { HelmetProvider } from 'react-helmet-async';
import { Grommet } from 'grommet';
import { ProviderAuth } from './utils/useAuth';
import { PersonalizedRoutes } from './routes/PersonalizedRoutes';


const store= configureAppStore();

ReactDOM.render(
  <Provider store={store}>
    <Grommet>
      <HelmetProvider>
        <React.StrictMode>
          <ProviderAuth>
            <PersonalizedRoutes />
          </ProviderAuth>
        </React.StrictMode>
      </HelmetProvider>
    </Grommet>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
