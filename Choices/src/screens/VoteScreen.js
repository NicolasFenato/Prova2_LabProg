import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native'; // <--- Importar Platform
import { Ionicons } from '@expo/vector-icons';
import { GameContext } from '../context/GameContext';
import CardOpcao from '../components/CardOpcao';

export default function VoteScreen({ navigation }) {
  const { opcoes, computarVoto, participantes, jogadorAtual, setJogadorAtual, setJogoFinalizado } = useContext(GameContext);
  const [indexAtual, setIndexAtual] = useState(0);
  
  const [backgroundColor, setBackgroundColor] = useState('#f0f2f5');

  useEffect(() => {
    setIndexAtual(0);
  }, [jogadorAtual]);

  const triggerFlash = (isLike) => {
    if (isLike) {
      setBackgroundColor('rgba(46, 204, 113, 0.3)');
    } else {
      setBackgroundColor('rgba(231, 76, 60, 0.3)');
    }

    setTimeout(() => {
      setBackgroundColor('#f0f2f5');
    }, 200);
  };

  const handleSwipe = (gostou) => {
    triggerFlash(gostou);
    
    const idParaVotar = opcoes[indexAtual].id;
    computarVoto(idParaVotar, gostou);

    if (indexAtual < opcoes.length - 1) {
      // Ainda há cartas para este jogador
      setIndexAtual(indexAtual + 1);
    } else {
      // Acabaram as cartas deste jogador
      if (jogadorAtual < participantes) {
        
        // CORREÇÃO AQUI: Lógica diferente para Web vs Mobile
        if (Platform.OS === 'web') {
            // Na Web, usamos o alert nativo que bloqueia a execução até fechar
            alert(`Fim do Turno! Passe para o Jogador ${jogadorAtual + 1}`);
            setJogadorAtual(jogadorAtual + 1);
        } else {
            // No Mobile, usamos o Alert.alert bonitinho com botão
            Alert.alert(
              "Fim do Turno!", 
              `Passe o celular para o Jogador ${jogadorAtual + 1}`,
              [{ text: "OK", onPress: () => setJogadorAtual(jogadorAtual + 1) }]
            );
        }

      } else {
        // Fim do Jogo
        setJogoFinalizado(true);
        navigation.navigate('Resultado');
      }
    }
  };

  if (opcoes.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: '#f0f2f5' }]}>
        <Text>Cadastre opções na tela de Configuração!</Text>
      </View>
    );
  }

  if (indexAtual >= opcoes.length) {
    return <View style={[styles.center, { backgroundColor: '#f0f2f5' }]}><Text>Aguardando...</Text></View>;
  }

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.turnText}>Vez do Jogador {jogadorAtual}</Text>
      <Text style={styles.progressText}>Opção {indexAtual + 1} de {opcoes.length}</Text>

      <View style={styles.indicatorsContainer}>
        {/* Lado Esquerdo: Lixeira (Rejeitar) */}
        <View style={styles.indicatorLeft}>
          <Ionicons name="trash-outline" size={50} color="rgba(231, 76, 60, 0.5)" />
          <Text style={styles.indicatorTextLeft}>Rejeitar</Text>
        </View>

        {/* Lado Direito: Check (Aceitar) */}
        <View style={styles.indicatorRight}>
          <Ionicons name="checkmark-circle-outline" size={50} color="rgba(46, 204, 113, 0.5)" />
          <Text style={styles.indicatorTextRight}>Aceitar</Text>
        </View>
      </View>
      
      <View style={styles.cardContainer}>
        <CardOpcao 
          key={opcoes[indexAtual].id} 
          item={opcoes[indexAtual]}
          onSwipeLeft={() => handleSwipe(false)}
          onSwipeRight={() => handleSwipe(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, transition: 'background-color 0.3s' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  turnText: { fontSize: 28, fontWeight: 'bold', color: '#4a90e2', marginBottom: 10 },
  progressText: { fontSize: 16, color: '#888', marginBottom: 30 },
  cardContainer: { flex: 1, width: '100%', justifyContent: 'flex-start', zIndex: 2 },
  indicatorsContainer: {
    position: 'absolute', // Fica solto na tela
    bottom: 30,
    flexDirection: 'row', // Um ao lado do outro
    width: '100%',        // Ocupa toda a largura
    justifyContent: 'space-between', // Joga um para cada ponta
    paddingHorizontal: 30,
    zIndex: 1             // Fica ATRÁS do cartão
  },
  indicatorLeft: {
    alignItems: 'center',
    opacity: 0.8
  },
  indicatorRight: {
    alignItems: 'center',
    opacity: 0.8
  },
  indicatorTextLeft: {
    color: 'rgba(231, 76, 60, 0.6)', // Vermelho claro
    fontWeight: 'bold',
    marginTop: 5
  },
  indicatorTextRight: {
    color: 'rgba(46, 204, 113, 0.6)', // Verde claro
    fontWeight: 'bold',
    marginTop: 5
  }
});