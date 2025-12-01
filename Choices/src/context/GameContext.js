import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  
  const [participantes, setParticipantes] = useState(2);
  const [opcoes, setOpcoes] = useState([]);
  const [jogadorAtual, setJogadorAtual] = useState(1);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [jogoEmAndamento, setJogoEmAndamento] = useState(false);

  const adicionarOpcao = (texto) => {
    const novaOpcao = { id: Date.now().toString(), texto, likes: 0 };
    setOpcoes([...opcoes, novaOpcao]);
  };

  const computarVoto = (idOpcao, gostou) => {
    if (gostou) {
      const novasOpcoes = opcoes.map(op => 
        op.id === idOpcao ? { ...op, likes: op.likes + 1 } : op
      );
      setOpcoes(novasOpcoes);
    }
  };

  const resetarJogo = () => {
    setOpcoes([]);
    setParticipantes(2);
    setJogadorAtual(1);
    setJogoFinalizado(false);
    setJogoEmAndamento(false);
  };

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