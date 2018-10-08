'use strict'

const assert = require('assert')
const { dirname } = require('path')
const uuid = require('uuid/v4')
const { all } = require('bluebird')
const { update } = require('../common/query')
const { info } = require('../common/log')
const { PROJECT } = require('../constants')

module.exports = {
  async create(db, { name, id = uuid() }) {
    info(`creating project "${name}" #${id}`)
    await db.read(PROJECT.SCHEMA)
    await db.run(
      'INSERT INTO project (project_id, name) VALUES (?,?)', id, name
    )
  },

  async load(db) {
    const [project, items] = await all([
      db.get(`
        SELECT project_id AS id, name, base FROM project LIMIT 1`),
      db.get(`
        SELECT COUNT (id) AS total
          FROM items LEFT OUTER JOIN trash USING (id)
          WHERE deleted IS NULL`)
    ])

    assert(project != null, 'no project found')

    switch (project.base) {
      case 'project':
        project.base = dirname(db.path)
        break
      case 'documents':
      case 'pictures':
        project.base = ARGS[project.base]
        break
    }

    project.items = items.total

    return project
  },

  save(db, { id, ...props }) {
    return db.run(
      ...update('project').set(props).where({ project_id: id })
    )
  }
}
