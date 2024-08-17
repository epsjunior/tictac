import Score from './score.js';
import Board from './board.js';
import Message from './message.js';
import PlayAgain from './playAgain.js';

export default {
  template: `
    <div class="game">
      <Score :player1="score.player1" :player2="score.player2" />
      <Board :board="board" :currentPlayer="currentPlayer" @tile-clicked="handleTileClick" />
      <Message :text="message" />
      <PlayAgain v-if="gameOver" @click="resetGame" />
    </div>
  `,
  components: {
    Score,
    Board,
    Message,
    PlayAgain,
  },
  data() {
    return {
      board: Array(9).fill(''),
      currentPlayer: this.randomPlayer(),
      score: {
        player1: 0,
        player2: 0,
      },
      message: '',
      gameOver: false,
      playerMapping: {
        'o': '1',
        'x': '2'
      }
    };
  },
  methods: {
    randomPlayer() {
      return Math.random() < 0.5 ? 'o' : 'x';
    },
    handleTileClick(index) {
      if (this.board[index] !== '' || this.gameOver) {
        return;  // Tile already filled or game over
      }

      // Directly update the board array
      this.board[index] = this.currentPlayer;

      if (this.checkWin()) {
        this.message = `Player ${this.playerMapping[this.currentPlayer]} wins!`;
        this.gameOver = true;
        if (this.currentPlayer === 'o') {
          this.score.player1 += 1;
        } else {
          this.score.player2 += 1;
        }
      } else if (this.board.every(tile => tile !== '')) {
        this.message = "It's a draw!";
        this.gameOver = true;
      } else {
        this.currentPlayer = this.currentPlayer === 'o' ? 'x' : 'o';
        this.message = `It's player ${this.playerMapping[this.currentPlayer]}'s turn`;
      }
    }
    ,
    checkWin() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
      ];

      return winningCombinations.some(combination =>
          combination.every(index => this.board[index] === this.currentPlayer)
      );
    },
    resetGame() {
      this.board = Array(9).fill('');
      this.currentPlayer = this.randomPlayer();
      this.message = `It's player ${this.playerMapping[this.currentPlayer]}'s turn`;
      this.gameOver = false;
    }
  },
  created() {
    this.message = `It's player ${this.playerMapping[this.currentPlayer]}'s turn`;
  }
};
