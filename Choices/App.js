/* Imports: */
import React from 'react';
import { GameProvider } from './src/context/GameContext'; // Importa o contexto do jogo
import AppNavigator from './src/navigation/AppNavigator'; // Importa a interface do jogo

/* Função inicial do projeto */
export default function App() {
  /*
    O "GameProvider", contexto do jogo ( componente/estado raiz da aplicação ), envolve o "App Navigator",
    interface do jogo, para que todas as telas e a lógica de navegação tenham acesso aos dados do jogo, e 
    que esses dados persistam até o fim de uma "partida".
  */
  return (
    <GameProvider>
      <AppNavigator />
    </GameProvider>
  );
  
}