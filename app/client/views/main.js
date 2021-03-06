const html = require('choo/html')
const css = require('csjs-inject')
const C = require('../lib/constants')

const style = css`

.main {
  position: absolute;
  top: 30px;
  width: 100%;
  bottom: 0;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  background: ${C.BLUE};
  -webkit-app-region: no-drag;
}

`

module.exports = (state, prev, send) => {
  if (!(state.tags.loaded)) {
    send('collection_scan')
  }

  return html`

  <div class="${style.main}">
    ${require('./initialise')(state, prev, send)}
    ${require('./search')(state, prev, send)}
    ${require('./results')(state, prev, send)}
    ${require('./message')(state, prev, send)}
    ${require('./detail')(state, prev, send)}
    ${require('./footer')(state, prev, send)}
    ${require('./datasource_selector')(state, prev, send)}
    ${require('./notify')(state, prev, send)}
  </div>

  `
}
