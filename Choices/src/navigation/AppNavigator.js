import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importação das telas (Vamos criar o código delas na próxima etapa)
import ConfigScreen from '../screens/ConfigScreen';
import VoteScreen from '../screens/VoteScreen';
import ResultScreen from '../screens/ResultScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Configuração" component={ConfigScreen} />
      <Tab.Screen name="Votação" component={VoteScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* A tela principal é o conjunto de abas */}
        <Stack.Screen name="Home" component={TabNavigator} options={{ title: 'DecisionMatch' }} />
        
        {/* A tela de resultado fica "por cima" das abas */}
        <Stack.Screen name="Resultado" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}