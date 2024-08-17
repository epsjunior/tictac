import Tile from './tile.js';

export default {
  props: ['board', 'currentPlayer'],
  template: `
    <div class="board">
      <Tile v-for="(marker, index) in board"
            :key="index"
            :marker="marker"
            :index="index"
            @tile-clicked="handleTileClick(index)" />
    </div>
  `,
  components: {
    Tile,
  },
  methods: {
    handleTileClick(index) {
      this.$emit('tile-clicked', index);  // Emit event to parent Game component
    }
  }
};
