import React, { useContext } from 'react';
import { Alert, Platform } from 'react-native'; // Importações para o Alerta
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GameContext } from '../context/GameContext';
import ConfigScreen from '../screens/ConfigScreen';
import VoteScreen from '../screens/VoteScreen';
import ResultScreen from '../screens/ResultScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {

  const { opcoes, jogoEmAndamento } = useContext(GameContext);

  return (

    <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Configuração') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Votação') {
            iconName = focused ? 'layers' : 'layers-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: '#4a90e2', 
        tabBarInactiveTintColor: 'gray',  
      })}>

      <Tab.Screen 
        name="Configuração" 
        component={ConfigScreen}
        listeners={{
          tabPress: (e) => {
            if (jogoEmAndamento) {
              e.preventDefault();
              
              if (Platform.OS === 'web') {
                alert('Jogo em andamento! Termine a partida para reconfigurar.');
              } else {
                Alert.alert('Jogo em andamento', 'Você não pode alterar as configurações durante a partida.');
              }

            }
          },
        }}
      />
      
      <Tab.Screen 
        name="Votação" 
        component={VoteScreen} 
        listeners={{
          tabPress: (e) => {
            // LÓGICA DE PROTEÇÃO
            if (opcoes.length < 2) {
              // 1. Impede a navegação de acontecer
              e.preventDefault();

              // 2. Exibe o erro (Compatível Web e Mobile)
              if (Platform.OS === 'web') {
                alert('Erro: Adicione pelo menos 2 opções antes de votar!');
              } else {
                Alert.alert('Atenção', 'Adicione pelo menos 2 opções antes de votar!');
              }
            }
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigator} options={{ title: 'Choices', headerTitleAlign: 'center'}} />
        <Stack.Screen name="Resultado" component={ResultScreen} options={{headerTitleAlign: 'center'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}