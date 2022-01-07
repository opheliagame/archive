export function createNavComponent ({ createComponent, html, renderer }) {
  createComponent('main-nav', {
    renderer,
    render () {
      return html`
        <div class="flex justify-between items-center text-xl">
          <a class="py-1 px-2 md:py-2 md:px-4" href="/about">
            <span class="px-1 rounded-full border-2 border-lime-200">about</span>
          </a>
        </div>
      `
    }
  })
}
