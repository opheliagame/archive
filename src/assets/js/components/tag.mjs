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
        <div class="pr-2">
          <span class="text-xs bg-lime-200 px-1 rounded-full border border-green-300">
            ${this.props.name}
          </span>
        </div>
      `
    }
  })
}