'use strict'

const { isSelected, select } = require('../selection')
const { merge, insert, splice } = require('../common/util')
const {
  DC, NAV, ITEM, LIST, TAG, NOTE, PHOTO, PROJECT
} = require('../constants')

const reset = {
  items: [],
  photo: null,
  selection: null,
  note: null
}

const init = {
  ...reset,
  mode: PROJECT.MODE.PROJECT,
  query: '',
  tagFilter: '',
  tags: [],
  sort: {},
  columns: [
    { width: 250, id: DC.title },
    { width: 100, id: DC.creator },
    { width: 100, id: DC.date },
    { width: 100, id: DC.type },
    { width: 190, id: NAV.COLUMN.CREATED.id }
  ],
}

module.exports = {
  // eslint-disable-next-line complexity
  nav(state = init, { type, payload, meta, error }) {
    switch (type) {
      case NAV.RESTORE:
        return merge(init, payload)
      case NAV.UPDATE:
        return { ...state, ...payload }

      case NAV.SEARCH:
        return {
          ...state,
          ...reset,
          ...payload
        }

      case NAV.SORT: {
        const { list, ...sort } = payload

        return {
          ...state,
          sort: {
            ...state.sort,
            [list || 0]: sort
          }
        }
      }

      case LIST.REMOVE: {
        return (state.list !== payload) ? state : {
          ...state,
          ...reset,
          list: null
        }
      }
      case LIST.COLLAPSE: {
        return !meta.select ? state : {
          ...state,
          ...reset,
          list: payload
        }
      }
      case LIST.ITEM.REMOVE: {
        return meta.done ? state : {
          ...state,
          ...reset
        }
      }

      case ITEM.DELETE:
      case ITEM.RESTORE:
      case ITEM.REMOVE:
        return meta.done || !isSelected(state.items, payload) ?
          state : {
            ...state,
            ...reset
          }

      case ITEM.SELECT:
        return {
          ...state,
          photo: payload.photo,
          selection: payload.selection,
          note: payload.note,
          items: select(state.items, payload.items, meta.mod)
        }

      case ITEM.OPEN: {
        const { id, photos, selection } = payload
        const photo = photos ?
          (photos.includes(state.photo) ? state.photo : photos[0]) : null

        return {
          ...state,
          mode: PROJECT.MODE.ITEM,
          photo,
          selection,
          items: select(state.items, [id], 'replace')
        }
      }

      case TAG.DELETE:
        return (!meta.done || error || !isSelected(state.tags, payload)) ?
          state : {
            ...state,
            tags: select(state.tags, [payload], 'remove')
          }

      case TAG.SELECT:
        return {
          ...state,
          ...reset,
          trash: null,
          imports: null,
          tags: select(state.tags, [payload], meta.mod)
        }

      case PHOTO.SELECT:
        return payload ? {
          ...state,
          photo: payload.photo,
          selection: payload.selection,
          note: payload.note,
          items: [payload.item]
        } : { ...state, photo: null, selection: null }

      case NOTE.SELECT:
        return payload ? {
          ...state,
          items: [payload.item],
          photo: payload.photo,
          selection: payload.selection,
          note: payload.note
        } : { ...state, note: null }

      case ITEM.PHOTO.REMOVE:
        return isSelected(state.items, payload.id) &&
          payload.photos.includes(state.photo) ?
          { ...state, photo: null, selection: null, note: null } : state


      case NAV.SELECT:
        return {
          ...state,
          ...reset,
          list: null,
          trash: null,
          imports: null,
          tags: [],
          ...payload
        }

      case NAV.COLUMN.INSERT:
        return {
          ...state,
          columns: insert(state.columns, meta.idx, payload)
        }
      case NAV.COLUMN.REMOVE:
        return {
          ...state,
          columns: state.columns.filter(col => col.id !== payload.id)
        }
      case NAV.COLUMN.ORDER: {
        const { order } = payload

        return {
          ...state,
          columns: state.columns.reduce((cols, c) =>
            ((cols[order[c.id]] = c), cols), [])
        }
      }
      case NAV.COLUMN.RESIZE: {
        const { column, width } = payload

        return {
          ...state,
          columns: splice(state.columns, column, 1, {
            ...state.columns[column], width
          })
        }
      }

      default:
        return state
    }
  }
}
