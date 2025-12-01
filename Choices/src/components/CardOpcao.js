/* Imports: */
import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, PanResponder, Dimensions, Platform } from 'react-native';
/* API's utilizadas:

  - PanResponder: reconhecimento de gestos. É utilizada na aplicação para detectar a movimentação dos "cards" 
    de opção e definir ações dependentes dessa movimentação;
    
  - Animated: animações. É utilizada na aplicação em conjunto com a PanResponder para animar a movimentação 
    dos "cards";

  - Dimensions: dimensões da tela. É utilziada na aplicação para retornar o tamanho da tela e definir quando
    os "cards" devem sumir após um movimento;

  - Platform: distinção de plataformas. É utilizada na aplicação para distinguir o uso de dispositivos mobile
    ou web, e definir o comportamento do sistema dependendo disso.

*/

// Extrai a largura da tela.
const SCREEN_WIDTH = Dimensions.get('window').width;

/* Componente principal do sistema de votação. */
export default function CardOpcao({ item, onSwipeLeft, onSwipeRight }) {
  
  // Armazena coordenadas iniciais do card
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      // Inicia a captura de movimentação do card
      onStartShouldSetPanResponder: () => true,

      // Impede que o navegador web "roube" o gesto
      onPanResponderTerminationRequest: () => false,

      // Atualiza as coordenadas da variavel "pan" em tempo real conforme o card é arrastado
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),

      // Define o comportamento do sistema quando o usuário solta o card
      onPanResponderRelease: (e, gestureState) => {

        // Define a sensibilidade ao arrastar ( para web é menor que para mobile )
        const threshold = Platform.OS === 'web' ? 80 : 120;

        if (gestureState.dx > threshold) { 
          // Caso tenha arrastado muito para a direita -> Sinaliza o like e anima a saída
          Animated.timing(pan, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => onSwipeRight());
        } else if (gestureState.dx < -threshold) {
          // Caso tenha arrastado muito para a esquerda -> Sinaliza o dislike e anima a saída
          Animated.timing(pan, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => onSwipeLeft());
        } else {
          // Não arrastou o suficiente -> O card volta para a posição inicial
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  /* Interpolação para rotacionar o card de forma fluida. */
  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  /* Retorna a view do card para o usuário. */
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.card, 
        { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate: rotate }] },
        Platform.OS === 'web' && styles.webStyle
      ]}
    >
      <Text style={[styles.text, Platform.OS === 'web' && styles.webText]}>{item.texto}</Text>
      <Text style={[styles.instruction, Platform.OS === 'web' && styles.webText]}>
        Arraste para Esquerda ou Direita
      </Text>
    </Animated.View>
    
  );

}

/* Estilos: */
const styles = StyleSheet.create({

  card: {
    height: 300,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#ddd'
  },

  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20
  },

  instruction: {
    fontSize: 14,
    color: '#999',
    position: 'absolute',
    bottom: 20
  },
  
  webStyle: {
    userSelect: 'none',  
    cursor: 'grab',       
    touchAction: 'none'  
  },

  webText: {
    userSelect: 'none',   
  }

});