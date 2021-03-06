// this subscription updates every datasource's data at 1 second intervals
// it's necessary to maintain the unidirectional data flow model
// it also allows the datasource class to know nothing about the webapp

const datasource = require('../lib/getdatasource')
const update = () => datasource.all().map(ds => ds.data())
const err = err => { if (err) console.error('error updating datasources', err) }
const any = require('lodash/some')

module.exports = (send, done) => {
  setInterval(
    () => {
      const news = update()
      if (any(news, ds => ds.stats.metadataSync.finished)) {
        send('initialising_stop', true, () => {})
      } else {
        send('initialising_start', true, () => {})
      }
      send('datasources_setlist', update(), err => {
        if (err) return done(err)
      })
    }, 1000
  )
}
