/* Imports: */
import React, { useContext } from 'react';
import { Alert, Platform } from 'react-native'; // Importações para o Alerta
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GameContext } from '../context/GameContext';
// Importação das telas
import ConfigScreen from '../screens/ConfigScreen';
import VoteScreen from '../screens/VoteScreen';
import ResultScreen from '../screens/ResultScreen';

// Inicialização dos objetos de navegação ( BottomTab e Stack )
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* Gerenciador das abas inferiores ( BottomTab ) */
function TabNavigator() {

  // Utiliza o contexto para receber as opções configuradas e a informação de andamento do jogo
  const { 
    opcoes, 
    jogoEmAndamento, 
    setJogoEmAndamento, 
    setJogadorAtual, 
    setJogoFinalizado 
  } = useContext(GameContext);

  return (

    // Configurações visuais para todas as abas
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

      {/* Configurações para a tela de configuração do jogo */}
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
      
      {/* Configurações para a tela de votação */}
      <Tab.Screen 
        name="Votação" 
        component={VoteScreen} 
        listeners={{
          tabPress: (e) => {
            if (opcoes.length < 2) {
              e.preventDefault();

              if (Platform.OS === 'web') {
                alert('Erro: Adicione pelo menos 2 opções antes de votar!');
              } else {
                Alert.alert('Erro: ', 'Adicione pelo menos 2 opções antes de votar!');
              }
            } else {
              if (!jogoEmAndamento) {
                setJogoEmAndamento(true);  
                setJogadorAtual(1);        
                setJogoFinalizado(false);  
              }
            }
          },
        }}
      />
    </Tab.Navigator>
  );
}

/* Componete principal da navegação */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* O Stack separa a tela home e resultado, para que as abas inferiores fiquem ocultas na tela de resultado */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigator} options={{ title: 'Choices', headerTitleAlign: 'center'}} />
        <Stack.Screen name="Resultado" component={ResultScreen} options={{headerTitleAlign: 'center'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}