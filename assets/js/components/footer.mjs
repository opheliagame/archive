export function createFooterComponent ({ createComponent, html, renderer }) {
  createComponent('main-footer', {
    renderer,
    render () {
      return html`
        <footer class="text-sm md:text-lg">
          <ul class="markdown-list list-inside self-start">
            <li><a target="_blank" class="link-primary" href="https://www.instagram.com/ophelia.game/">instagram</a></li>
            <li><a target="_blank" class="link-primary" href="https://twitter.com/anushkatr">twitter</a></li>
          </ul>
        </footer>
      `
    }
  })
}
