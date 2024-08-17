export default {
  props: ['marker', 'index'],
  template: `
    <button class="tile" @click="handleClick">
      {{ marker }}
    </button>
  `,
  methods: {
    handleClick() {
      this.$emit('tile-clicked', this.index);
    }
  }
};
