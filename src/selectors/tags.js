'use strict'

const { createSelector: memo } = require('reselect')
const { values } = Object
const { getSelectedItems } = require('./items')
const { seq, compose, filter, map, cat, keep } = require('transducers.js')
const { by, match } = require('../collate')

const byName = by('name')
const getTags = ({ tags }) => tags


const getAllTags = memo(
  getTags,
  (tags) => values(tags).sort(byName)
)

const getProjectTags = memo(
  getAllTags,
  ({ nav }) => nav.tagFilter,
  (tags, filter) => (!filter) ?
    tags :
    tags.reduce((ts, tag) => {
      let m = match(tag.name, filter, /\b\w/g)
      if (m) ts.push({ ...tag, matchData: m })
      return ts
    }, [])
)

const getItemTags = memo(
  getTags,
  getSelectedItems,

  (tags, items) => {
    const counts = {}

    return seq(items, compose(
        map(item => item.tags),
        cat,
        map(id => ((counts[id] = (counts[id] || 0) + 1), tags[id])),
        keep(),
        filter(tag => counts[tag.id] === 1)
      ))
      .map(tag => ({
        ...tag,
        count: counts[tag.id],
        mixed: counts[tag.id] < items.length
      }))
      .sort(byName)
  }
)

const getTagCompletions = memo(
  getAllTags,
  getItemTags,

  (tags, itemTags) => seq(tags,
    compose(
      filter(tag => !itemTags.find(t => !t.mixed && t.id === tag.id)),
      map(tag => tag.name)))
)


module.exports = {
  getAllTags,
  getItemTags,
  getProjectTags,
  getTagCompletions
}
