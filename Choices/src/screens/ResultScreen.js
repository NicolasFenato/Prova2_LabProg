import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { GameContext } from '../context/GameContext';

export default function ResultScreen({ navigation }) {
  const { opcoes, resetarJogo } = useContext(GameContext);

  // 1. Ordena o ranking
  const ranking = [...opcoes].sort((a, b) => b.likes - a.likes);
  
  // 2. Descobre a maior pontuação
  const maiorPontuacao = ranking[0]?.likes || 0;

  // 3. Encontra quem empatou (quem tem a mesma pontuação do primeiro)
  const vencedores = ranking.filter(item => item.likes === maiorPontuacao);

  // 4. Verifica se houve empate OU se ninguém votou (maior pontuação = 0)
  const houveEmpate = vencedores.length > 1 || maiorPontuacao === 0;

  const handleReiniciar = () => {
    resetarJogo();
    navigation.navigate('Home', { screen: 'Configuração' });
  };

  // Configuração do Cabeçalho
  useLayoutEffect(() => {
    navigation.setOptions({
      // CORREÇÃO 1: Isso remove o botão "Retornar" padrão ou a seta nativa
      headerBackVisible: false, 
      
      headerLeft: () => (
        <TouchableOpacity onPress={handleReiniciar} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>{'<'} Início</Text>
        </TouchableOpacity>
      ),
      title: 'Resultado Final'
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      
      {/* RENDERIZAÇÃO CONDICIONAL DO RESULTADO */}
      {houveEmpate ? (
        <>
          <Text style={[styles.title, { color: '#e67e22' }]}>⚠️ Empate! ⚠️</Text>
          <View style={[styles.winnerCard, { backgroundColor: '#e67e22' }]}>
            <Text style={styles.winnerText}>
              {maiorPontuacao === 0 ? "Ninguém curtiu nada!" : "Opções empatadas:"}
            </Text>
            {maiorPontuacao > 0 && (
              <Text style={styles.tieNames}>
                {vencedores.map(v => v.texto).join(', ')}
              </Text>
            )}
            <Text style={styles.winnerVotes}>
              {maiorPontuacao} {maiorPontuacao === 1 ? 'Voto' : 'Votos'} cada
            </Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>🏆 O Vencedor é: 🏆</Text>
          <View style={styles.winnerCard}>
            <Text style={styles.winnerText}>{vencedores[0].texto}</Text>
            <Text style={styles.winnerVotes}>
              {vencedores[0].likes} {vencedores[0].likes === 1 ? 'Voto' : 'Votos'}
            </Text>
          </View>
        </>
      )}

      <Text style={styles.subtitle}>Ranking Completo:</Text>
      <FlatList
        data={ranking}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.rankItem}>
            <Text style={styles.rankText}>
              {index + 1}º - {item.texto} {item.likes === maiorPontuacao && !houveEmpate ? '👑' : ''}
            </Text>
            <Text style={styles.rankVotes}>{item.likes} 👍</Text>
          </View>
        )}
        style={{ width: '100%' }}
      />

      <TouchableOpacity style={styles.button} onPress={handleReiniciar}>
        <Text style={styles.btnText}>NOVO JOGO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginTop: 10, marginBottom: 20, color: '#f1c40f', textAlign: 'center' },
  
  headerButton: { marginLeft: 0, padding: 10 },
  headerButtonText: { fontSize: 17, color: '#007AFF', fontWeight: 'bold' },

  winnerCard: { 
    backgroundColor: '#4a90e2', padding: 20, borderRadius: 20, width: '100%', alignItems: 'center',
    marginBottom: 30, elevation: 10, minHeight: 150, justifyContent: 'center'
  },
  winnerText: { fontSize: 32, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  winnerVotes: { fontSize: 18, color: '#eef', marginTop: 10, fontStyle: 'italic' },
  
  // Estilo novo para lista de nomes empatados
  tieNames: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: 10 },

  subtitle: { fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 10, color: '#555' },
  rankItem: { 
    flexDirection: 'row', justifyContent: 'space-between', width: '100%', 
    padding: 15, borderBottomWidth: 1, borderColor: '#eee' 
  },
  rankText: { fontSize: 16, color: '#333' },
  rankVotes: { fontSize: 16, fontWeight: 'bold', color: '#444' },
  button: { backgroundColor: '#333', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});