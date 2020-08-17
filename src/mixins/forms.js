export default {
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName)
    },

    scrollToError: function() {
      const errorFirst = this.$el.querySelector('.has-danger, .error')
      if (errorFirst) {
        errorFirst.scrollIntoView({ block: 'center' })
      }
    },
  }
}
