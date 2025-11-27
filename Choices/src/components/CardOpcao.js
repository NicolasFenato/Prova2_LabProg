import React, { useRef } from 'react';
import { StyleSheet, Text, Animated, PanResponder, Dimensions, Platform } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CardOpcao({ item, onSwipeLeft, onSwipeRight }) {
  // O valor começa sempre zerado (0,0)
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false, //Para o navegador nao "roubar" o arrastar
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {

        const threshold = Platform.OS === 'web' ? 80 : 120;

        if (gestureState.dx > threshold) { // Direita
          Animated.timing(pan, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => onSwipeRight());
        } else if (gestureState.dx < -threshold) { // Esquerda
          Animated.timing(pan, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => onSwipeLeft());
        } else { // Reset
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.card, { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate: rotate }] }]}
    >
      <Text style={styles.text}>{item.texto}</Text>
      <Text style={styles.instruction}>Arraste para Esquerda ou Direita</Text>
    </Animated.View>
  );
}

// AQUI ESTÁ A PARTE QUE FALTOU:
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
  // ESTILOS EXCLUSIVOS PARA WEB (O React Native Web entende esses estilos)
  webStyle: {
    userSelect: 'none',   // Impede selecionar o texto (crucial para o arraste funcionar)
    cursor: 'grab',       // Mostra a "mãozinha" do mouse
    touchAction: 'none'   // Impede comportamentos padrão de toque do navegador
  },
  webText: {
    userSelect: 'none',   // Reforça a não-seleção nos textos
  }
});