import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import {clearAsyncStorage} from './src/backend/DataProcessing';

const App = () => {
  return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
  );
};
export default App;
