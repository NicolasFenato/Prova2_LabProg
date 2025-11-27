import React, { useContext } from 'react';
import { Alert, Platform } from 'react-native'; // Importações para o Alerta
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Importação do Contexto para verificar as opções
import { GameContext } from '../context/GameContext';

import ConfigScreen from '../screens/ConfigScreen';
import VoteScreen from '../screens/VoteScreen';
import ResultScreen from '../screens/ResultScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  // AQUI É A MÁGICA: Pegamos as opções direto do contexto
  const { opcoes } = useContext(GameContext);

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        // NOVA CONFIGURAÇÃO DE ÍCONES:
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Configuração') {
            // Ícone de engrenagem (cheio se selecionado, contorno se não)
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Votação') {
            // Ícone de cartas ou check (cheio se selecionado, contorno se não)
            iconName = focused ? 'layers' : 'layers-outline';
          }

          // Retorna o componente de ícone
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4a90e2', // Cor azul quando ativo
        tabBarInactiveTintColor: 'gray',  // Cor cinza quando inativo
      })}
    >
      <Tab.Screen name="Configuração" component={ConfigScreen} />
      
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