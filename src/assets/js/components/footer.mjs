export function createFooterComponent ({ createComponent, html, renderer }) {
  createComponent('main-footer', {
    renderer,
    render () {
      return html`
        <footer>
          <ul class="markdown-list list-inside self-start">
            <li><a class="link-primary" href="https://www.instagram.com/ophelia.game/">instagram</a></li>
            <li><a class="link-primary" href="https://twitter.com/anushkatr">twitter</a></li>
          </ul>
        </footer>
      `
    }
  })
}
