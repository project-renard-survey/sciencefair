const html = require('choo/html')
const css = require('csjs-inject')
const C = require('../lib/constants')
const numeral = require('numeral')
const stat = require('./datasource_stat')
const entry = require('./datasource_checklist_entry')

const style = css`

.list {
  width: 100%;
  padding: 10px 16px;
  margin: 0;
  color: ${C.DARKBLUE};
  flex-direction: column;
}

`

module.exports = (state, prev, send) => {
  if (!state.datasources.loaded) {
    return html`<div class="${style.list}"><p>loading datasources...</p></div>`
  }

  const list = html`

  <div class="${style.list}">
    ${state.datasources.list.length === 0
      ? 'No datasources yet'
      : state.datasources.list.map(source => entry(source, state, prev, send))}
  </div>

  `

  return list
}
