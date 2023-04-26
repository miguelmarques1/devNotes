import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Store from './src/store';
import persistor from './src/persistor';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';

const App = () => {
  return(
    <Provider store={Store} >
      <PersistGate loading={null} persistor={persistor} >
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;