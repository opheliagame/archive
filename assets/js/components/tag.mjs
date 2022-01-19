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
        <a href="/tags/${this.props.name.toLowerCase()}/">
          <div class="pr-2 text-xs md:text-sm font-extralight">
            <span class="bg-lime-200 px-1 rounded-full border border-green-300">
              ${this.props.name}
            </span>
          </div>
        </a>
      `
    }
  })
}