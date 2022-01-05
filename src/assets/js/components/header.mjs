export function createHeaderComponent ({ createComponent, html, renderer }) {
  createComponent('main-header', {
    renderer,
    render () {
      return html`
        <header class="flex justify-between lg:justify-center items-center py-4 md:py-8 px-2">
          <a class="text-black no-underline" href="/">
            <h1 class="text-2xl md:text-3xl font-bold">
              opheliagame
            </h1>
          </a>
        </header>
      `
    }
  })
}
