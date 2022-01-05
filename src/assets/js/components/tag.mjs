export function createTagComponent ({ createComponent, html, renderer }) {
  createComponent('main-tag', {
    renderer, 
    props: {
      name: {
        type: String, 
        required: true
      }
    },
    mounted () {
      // console.log(this.textContent)
    },
    render() {
      return html`
        <span class="px-1 rounded-full border border-green-300">${this.props.name}</span>
      `
    }
  })
}