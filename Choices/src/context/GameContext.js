/* Imports: */
import React, { createContext, useState } from 'react';
/*
  ContextAPI: cria o "contexto" do jogo, onde serão salvas as informações de uma partida e
  essas ficarão disponíveis para todas as telas da aplicação.
*/

// Cria e exporta o contexto para o resto do sistema
export const GameContext = createContext();

/* Exporta o Componente Provedor que envolverá os "filhos" ( AppNavigator, no App.js ), fornecendo acesso aos dados. */
export const GameProvider = ({ children }) => {
  
  // Guarda a quantidade de participantes
  const [participantes, setParticipantes] = useState(2);
  // Guarda as opções configuradas
  const [opcoes, setOpcoes] = useState([]);
  // Registra de qual jogador é o turno atual
  const [jogadorAtual, setJogadorAtual] = useState(1);
  // Flag para quando o jogo acaba
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  // Flag para quando o jogo está ocorrendo
  const [jogoEmAndamento, setJogoEmAndamento] = useState(false);

  // Adiciona uma nova opção ( input do usuário ) à  lista de opções
  const adicionarOpcao = (texto) => {
    const novaOpcao = { id: Date.now().toString(), texto, likes: 0 };
    setOpcoes([...opcoes, novaOpcao]);
  };

  // Se a opção tiver obtido um like, atualiza o contador de likes da opção na lista
  const computarVoto = (idOpcao, gostou) => {
    if (gostou) {
      const novasOpcoes = opcoes.map(op => 
        op.id === idOpcao ? { ...op, likes: op.likes + 1 } : op
      );
      setOpcoes(novasOpcoes);
    }
  };

  // Prepara o novo jogo ao resetar todas as variáveis de estado
  const resetarJogo = () => {
    setOpcoes([]);
    setParticipantes(2);
    setJogadorAtual(1);
    setJogoFinalizado(false);
    setJogoEmAndamento(false);
  };

  // Exporta todas as informações para o sistema ter acesso
  return (

    <GameContext.Provider value={{
      participantes,
      setParticipantes,
      opcoes, 
      adicionarOpcao,
      jogadorAtual, 
      setJogadorAtual,
      jogoFinalizado, 
      setJogoFinalizado,
      jogoEmAndamento, 
      setJogoEmAndamento,
      computarVoto, 
      resetarJogo
    }}>
      {children}
    </GameContext.Provider>

  );
  
};