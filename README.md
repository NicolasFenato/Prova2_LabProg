#  Choices - Group Decision Maker

> Uma aplicação interativa no estilo "Pass-and-Play" para ajudar grupos a tomarem decisões democráticas e divertidas.

![Badge](https://img.shields.io/badge/Status-Finalizado-green)
![Badge](https://img.shields.io/badge/Platform-Mobile%20%7C%20Web-blue)
![Badge](https://img.shields.io/badge/Framework-React%20Native%20(Expo)-purple)

##  Sobre o Projeto

**Choices** é uma aplicação desenvolvida para resolver o dilema clássico de grupos de amigos ou casais: *"Onde vamos comer?"* ou *"Qual filme vamos assistir?"*.

Diferente de sorteios aleatórios, o aplicativo utiliza um sistema de votação gamificado. Os participantes cadastram opções e passam o dispositivo de mão em mão. Cada jogador vota arrastando cartões para a direita (Like) ou esquerda (Dislike). Ao final, o app processa os votos e exibe o vencedor ou empates.

O projeto foca em UX fluida com gestos nativos e uma arquitetura robusta de gerenciamento de estado.

##  Funcionalidades

- **Cadastro Dinâmico:** Adicione quantas opções e participantes desejar.
- **Sistema Pass-and-Play:** Interface otimizada para troca de turnos entre jogadores no mesmo dispositivo.
- **Votação por Gestos (Tinder-like):**
  - Arraste para a **Direita** 🟢 para aceitar.
  - Arraste para a **Esquerda** 🔴 para rejeitar.
- **Feedback Visual:** Animações fluídas, rotação de cartões e feedback de cores.
- **Ranking Inteligente:** Algoritmo que calcula o vencedor, trata empates e exibe o ranking completo.
- **Proteção de Rotas:** O sistema impede que configurações sejam alteradas durante uma partida ou que o jogo inicie sem dados suficientes.
- **Suporte Híbrido:** Funciona nativamente no Android/iOS e adaptado para Web (mouse).

##  Tecnologias e APIs Utilizadas

- **React Native (Expo):** Framework principal.
- **Context API:** Gerenciamento de estado global (Store) para persistência de dados e lógica de negócio.
- **React Navigation:**
  - `Native Stack`: Gerenciamento de histórico e telas sobrepostas.
  - `Bottom Tabs`: Navegação principal com *Route Guards* customizados.
- **Animated API & PanResponder:** Implementação manual da física de arrastar e soltar cartões (Swipe Logic).
- **Platform API:** Adaptação de comportamentos específicos para Web vs Mobile.

##  Estrutura do Projeto

O código foi organizado seguindo o padrão de *Separation of Concerns* (Separação de Responsabilidades):

```text
src/
├── components/      # Componentes visuais reutilizáveis (Ex: CardOpcao.js)
├── context/         # Lógica de estado global (GameContext.js)
├── navigation/      # Configuração de rotas e Route Guards (AppNavigator.js)
└── screens/         # Telas completas da aplicação (Config, Vote, Result)
App.js               # Ponto de entrada (Entry Point)

````
 
##  Como Rodar o Projeto

### Pré-requisitos
Você precisa ter o [Node.js](https://nodejs.org/) instalado.

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/choices.git](https://github.com/SEU-USUARIO/choices.git)

2. **Entre na pasta do projeto:**
   ```bash
   cd choices
   
3. **Instale as dependências:**
    ```bash
    npm install

4. **Execute o projeto:**
    ```bash
    npx expo start

5. **Teste:**

Use o aplicativo Expo Go no seu celular para ler o QR Code.

Ou pressione 'w' no terminal para abrir no navegador.

 
## Destaques Técnicos
1. PanResponder (Gestos Nativos)
O componente de cartões não utiliza bibliotecas de terceiros para o efeito de "swipe". Toda a lógica matemática de interpolação (transformar a distância X em graus de rotação) e os limites de tela (Dimensions) foram implementados manualmente.

## 2. Navegação Aninhada e Proteção
Foi utilizada uma estratégia de Nested Navigation (Tabs dentro de uma Stack). Além disso, foram implementados Route Guards via listeners no TabNavigator para interceptar ações do usuário e garantir a integridade do estado do jogo.

Desenvolvido por Nicolas Fenato.
