import { createComponent, html, renderer } from './util/ficus.mjs'
import { createFooterComponent } from './components/footer.mjs'
import { createHeaderComponent } from './components/header.mjs'
import './util/fonts.mjs'
import { createNavComponent } from './components/nav.mjs'
import { createTagComponent } from './components/tag.mjs'

createFooterComponent({ createComponent, html, renderer })
createHeaderComponent({ createComponent, html, renderer })
createNavComponent({ createComponent, html, renderer })
createTagComponent({ createComponent, html, renderer })