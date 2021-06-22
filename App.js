import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';

import SplashScreen from './src/components/splashscreen/SplashScreen';
import Login from './src/components/login/Login';
import Dashboard from './src/components/dashboard/Dashboard';
import Settings from './src/components/settings/Settings';
import EfficiencyDialy from './src/components/efficiency/EfficiencyDialy';
import EfficiencyWeek from './src/components/efficiency/EfficiencyWeek';
import EfficiencyMonth from './src/components/efficiency/EfficiencyMonth';
import {openDatabase} from 'react-native-sqlite-storage';
import {Database} from './src/database/Database';

var db = openDatabase({name: 'SQLite.db'});

Database.CreateTableUsers(db)
Database.CreateTableRecords(db)

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
            
          }}
        />
        <Stack.Screen
          name="EfficiencyDialy"
          component={EfficiencyDialy}
          options={{
            headerShown: false,
            
          }}
        />
        <Stack.Screen
          name="EfficiencyWeek"
          component={EfficiencyWeek}
          options={{
            headerShown: false,
            
          }}
        />
        <Stack.Screen
          name="EfficiencyMonth"
          component={EfficiencyMonth}
          options={{
            headerShown: false,
        
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
