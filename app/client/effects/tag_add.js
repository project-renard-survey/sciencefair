const includes = require('lodash/includes')
const keys = require('lodash/keys')

module.exports = (state, data, send, done) => {
  const alldone = require('../lib/alldone')(3, done)
  const newtag = !includes(keys(state.tags.tags), data.tag)

  send(newtag ? 'tag_createnew' : 'tag_addpaper', data, alldone)
  send('paper_addtag', data, alldone)
  send('tag_stopadd', null, alldone)
}
