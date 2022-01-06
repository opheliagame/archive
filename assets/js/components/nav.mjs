export function createNavComponent ({ createComponent, html, renderer }) {
  createComponent('main-nav', {
    renderer,
    render () {
      return html`
        <div class="flex flex-wrap gap-y-2 py-2 lg:px-24 col-span-full justify-between items-center text-xl">
          <a class="py-1 px-2 md:py-2 md:px-4" href="/about">
            <span class="link-primary">about</span>
          </a>
        </div>
      `
    }
  })
}
