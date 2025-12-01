/* Imports: */
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native'; // <--- Importar Platform
import { Ionicons } from '@expo/vector-icons';
import { GameContext } from '../context/GameContext';
import CardOpcao from '../components/CardOpcao';

/* Tela de votação das opções */
export default function VoteScreen({ navigation }) {

  // Consome o contexto do jogo, para utilizar os estados e as funções
  const { opcoes, computarVoto, participantes, jogadorAtual, setJogadorAtual, setJogoFinalizado } = useContext(GameContext);
  // Estado local para saber qual card está sendo exibido
  const [indexAtual, setIndexAtual] = useState(0);
  // Estado para o feedback visual (piscar a tela verde / vermelho)
  const [backgroundColor, setBackgroundColor] = useState('#f0f2f5');

  // A cada novo turno, reseta o indice dos "cards", para mostrar o primeiro novamente
  useEffect(() => {
    setIndexAtual(0);
  }, [jogadorAtual]);

  // Feedback visual: pisca a tela em verde (like) ou vermelho (dislike) rapidamente após a ação
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

  // Lógica principal de votação
  const handleSwipe = (gostou) => {
    triggerFlash(gostou);
    
    // Registra o voto no contexto
    const idParaVotar = opcoes[indexAtual].id;
    computarVoto(idParaVotar, gostou);

    if (indexAtual < opcoes.length - 1) { // Ainda tem cards para este jogador -> Vai para o proximo card
      setIndexAtual(indexAtual + 1);
    } else { // Acabaram os cards para este jogador

      if (jogadorAtual < participantes) { // Não acabaram os jogadores -> Exibe um aviso e vai para o próximo
        
        if (Platform.OS === 'web') {
            alert(`Fim do Turno! Passe para o Jogador ${jogadorAtual + 1}`);
            setJogadorAtual(jogadorAtual + 1);
        } else {
            Alert.alert(
              "Fim do Turno!", 
              `Passe o celular para o Jogador ${jogadorAtual + 1}`,
              [{ text: "OK", onPress: () => setJogadorAtual(jogadorAtual + 1) }]
            );
        }

      } else {  // Acabaram os jogadores -> Finaliza o jogo e vai para a tela de resultado

        setJogoFinalizado(true);
        navigation.navigate('Resultado');

      }
    }

  };

  // Gerenciamento de erro caso o array de opções esteja vazio
  if (opcoes.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: '#f0f2f5' }]}>
        <Text>Cadastre opções na tela de Configuração!</Text>
      </View>
    );
  }

  // Estado de espera pela navegação
  if (indexAtual >= opcoes.length) {
    return <View style={[styles.center, { backgroundColor: '#f0f2f5' }]}><Text>Aguardando...</Text></View>;
  }

  return (

    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.turnText}>Vez do Jogador {jogadorAtual}</Text>
      <Text style={styles.progressText}>Opção {indexAtual + 1} de {opcoes.length}</Text>

      {/* Ícones de fundo para orientação */}
      <View style={styles.indicatorsContainer}>
        <View style={styles.indicatorLeft}>
          <Ionicons name="trash-outline" size={50} color="rgba(231, 76, 60, 0.5)" />
          <Text style={styles.indicatorTextLeft}>Rejeitar</Text>
        </View>

        <View style={styles.indicatorRight}>
          <Ionicons name="checkmark-circle-outline" size={50} color="rgba(46, 204, 113, 0.5)" />
          <Text style={styles.indicatorTextRight}>Aceitar</Text>
        </View>
      </View>
      
      {/* Container do Card */}
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

/* Estilos: */
const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    alignItems: 'center', 
    paddingTop: 60, 
    transition: 'background-color 0.3s' 
  },

  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  turnText: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#4a90e2', 
    marginBottom: 10 
  },

  progressText: { 
    fontSize: 16, 
    color: '#888', 
    marginBottom: 30 
  },

  cardContainer: { 
    flex: 1, 
    width: '100%', 
    justifyContent: 'flex-start', 
    zIndex: 2 
  },

  indicatorsContainer: {
    position: 'absolute', 
    bottom: 30,
    flexDirection: 'row', 
    width: '100%',        
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    zIndex: 1             
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
    color: 'rgba(231, 76, 60, 0.6)',
    fontWeight: 'bold',
    marginTop: 5
  },

  indicatorTextRight: {
    color: 'rgba(46, 204, 113, 0.6)',
    fontWeight: 'bold',
    marginTop: 5
  }

});