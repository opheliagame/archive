// animate river in whitespace.njk
function animateRiver(river) {
  const first = river.children[0]
  river.removeChild(first)
  river.appendChild(first)
}