import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, Keyboard, Platform } from 'react-native'; 
import { GameContext } from '../context/GameContext';

export default function ConfigScreen({ navigation }) {

  const { participantes, setParticipantes, opcoes, adicionarOpcao, setJogadorAtual, setJogoFinalizado, setJogoEmAndamento } = useContext(GameContext);
  const [textoOpcao, setTextoOpcao] = useState('');

  const handleAdd = () => {
    if (textoOpcao.trim() === '') return;
    adicionarOpcao(textoOpcao);
    setTextoOpcao(''); 
    Keyboard.dismiss();
  };

  const alterarParticipantes = (quantidade) => {
    const novoValor = participantes + quantidade;
    if (novoValor >= 2) {
      setParticipantes(novoValor);
    }
  };

  const handleStart = () => {
    if (opcoes.length < 2) {
      if (Platform.OS === 'web') {
        alert('Erro: Adicione pelo menos 2 opções!');
      } else {
        Alert.alert('Erro', 'Adicione pelo menos 2 opções!');
      }
      return;
    }

    setJogadorAtual(1);
    setJogoFinalizado(false);
    setJogoEmAndamento(true);
    navigation.navigate('Votação');

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurar Opções</Text>

      <Text style={styles.label}>Número de Jogadores:</Text>
      
      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.counterBtn} onPress={() => alterarParticipantes(-1)}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        
        <Text style={styles.counterValue}>{participantes}</Text>
        
        <TouchableOpacity style={styles.counterBtn} onPress={() => alterarParticipantes(1)}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Adicionar Opção (Ex: Pizza):</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={textoOpcao}
          onChangeText={setTextoOpcao}
          placeholder="Digite uma opção..."
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={opcoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemOpcao}>
            <Text>{item.texto}</Text>
          </View>
        )}
        style={styles.list}
      />

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.btnText}>COMEÇAR JOGO</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20, 
    backgroundColor: '#f5f5f5', 
    paddingTop: 50 
  },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#444' 
  },

  label: { 
    fontSize: 16, 
    marginBottom: 5, 
    color: '#666' 
  },
  
  counterContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20 
  },

  counterBtn: { 
    backgroundColor: '#ddd', 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 20 
  },

  counterText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333' 
  },

  counterValue: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginHorizontal: 20 
  },

  input: { 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    marginBottom: 15 
  },

  inputRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
    
  addButton: { 
    backgroundColor: '#4a90e2', 
    padding: 15,
    borderRadius: 8, 
    marginLeft: 10, 
    marginBottom: 15 
  },

  startButton: { 
    backgroundColor: '#2ecc71', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 20 
  },

  btnText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },

  itemOpcao: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 5, 
    borderWidth: 1, 
    borderColor: '#eee' 
  },

  list: { maxHeight: 200 }

});