'use strict'

const React = require('react')
const { FormattedMessage } = require('react-intl')
const { Popup } = require('./popup')
const { OptionList } = require('./option')
const { blank, last, shallow } = require('../common/util')
const { translate } = require('../common/math')
const { bounds, viewport } = require('../dom')
const collate = require('../collate')
const cx = require('classnames')

const {
  array, arrayOf, bool, func, instanceOf, number, oneOfType, string
} = require('prop-types')

const {
  INPUT: { BORDER_WIDTH, FOCUS_SHADOW_WIDTH },
  POPUP: { PADDING }
} = require('../constants/sass')

const MARGIN = BORDER_WIDTH + FOCUS_SHADOW_WIDTH

const Highlight = ({ text, matchData }) => (
  (!Array.isArray(matchData)) ? text : (
    <>
      {text.slice(0, matchData[0])}
      <strong>{text.slice(...matchData)}</strong>
      {text.slice(matchData[1])}
    </>
  )
)

Highlight.propTypes = {
  text: string.isRequired,
  matchData: oneOfType([
    arrayOf(number),
    bool
  ])
}


class Completions extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getStateFromProps(props)
  }

  componentWillReceiveProps(props) {
    if (!shallow(props, this.props)) {
      this.setState(this.getStateFromProps(props))
    }
  }

  componentDidUpdate(_, state) {
    if (state.options.length !== this.state.options.length) {
      if (this.props.onResize != null) {
        this.props.onResize({
          rows: this.state.options.length
        })
      }
    }
  }

  getStateFromProps({
    completions,
    isAdvisory,
    isExactMatchHidden,
    isSelectionHidden,
    match,
    query,
    selection,
    toId,
    toText
  } = this.props) {
    let q = query.trim().toLowerCase()
    let matchAll = blank(q)
    let options = []
    let active = (matchAll && !isSelectionHidden) ? last(selection) : null
    options.idx = {}

    completions.forEach((value, idx) => {
      let id = toId(value)
      let isSelected = selection.includes(id)
      let isHidden = (isSelectionHidden && isSelected) ||
        (isExactMatchHidden && id === query)

      if (!isHidden) {
        let m = matchAll || match(value, q)
        if (m != null && m !== false) {
          options.idx[id] = options.length
          options.push({
            id, idx, value, text: toText(value, { isSelected, matchData: m })
          })
        }
      }
    })

    if (!active && !isAdvisory && options.length > 0) {
      active = options[0].id
    }

    return { active, options }
  }

  getPopupBounds() {
    if (this.props.parent == null) return

    let bnd = bounds(this.props.parent)
    let height = this.getOptionsHeight() + PADDING + BORDER_WIDTH

    let [anchor, clip] = (bnd.bottom + height <= viewport().height) ?
      ['top', translate(bnd, { bottom: -MARGIN })] :
      ['bottom', translate(bnd, { top: MARGIN })]

    return {
      anchor,
      clip,
      height,
      left: bnd.left,
      top: Math.round((anchor === 'top') ? bnd.bottom : bnd.top - height),
      width: bnd.width
    }
  }

  getOptionsHeight(rows = this.state.options.length) {
    return OptionList.getHeight(rows || 1, { maxRows: this.props.maxRows })
  }

  get isActive() {
    return this.state.active != null
  }

  get isBlank() {
    return this.state.options.length === 0
  }

  get isEmpty() {
    return this.props.completions.length === 0
  }

  get isVisible() {
    return (this.props.isVisibleWhenBlank || !this.isBlank) &&
      this.props.minQueryLength <= this.props.query.length
  }

  get active() {
    let idx = this.state.options.idx[this.state.active]
    return (idx == null) ? null : this.state.options[idx]
  }

  select() {
    let { active } = this
    if (active != null) this.props.onSelect(this.props.completions[active.idx])
  }

  next(k = 1) {
    return this.activate(this.ol && this.ol.next(k))
  }

  prev(k = 1) {
    return this.activate(this.ol && this.ol.prev(k))
  }

  first() {
    return this.activate(this.ol && this.ol.first())
  }

  last() {
    return this.activate(this.ol && this.ol.last())
  }

  activate(option, scrollIntoView = true) {
    if (option != null) this.handleActivate(option, scrollIntoView)
    else if (this.props.isAdvisory) this.setState({ active: null })
    return option
  }

  handleActivate = ({ id }, scrollIntoView) => {
    this.setState({ active: id })
    if (scrollIntoView && this.ol != null) this.ol.scrollIntoView({ id }, false)
  }

  handleSelect = (option) => {
    this.props.onSelect(this.props.completions[option.idx])
  }

  handleResize = () => {
    this.forceUpdate()
  }

  setOptionList = (ol) => {
    this.ol = ol
  }

  renderCompletions() {
    if (this.isEmpty) return this.renderNoCompletions()
    if (this.isBlank) return this.renderNoMatches()

    return (
      <OptionList
        active={this.state.active}
        onActivate={this.handleActivate}
        onSelect={this.handleSelect}
        ref={this.setOptionList}
        restrict={this.props.isAdvisory ? 'none' : 'wrap'}
        selection={this.props.selection}
        values={this.state.options}/>
    )
  }

  renderNoCompletions() {
    return (
      <FormattedMessage id="completions.empty"/>
    )
  }

  renderNoMatches() {
    return (
      <div className="option no-matches">
        <FormattedMessage id="completions.noMatches"/>
      </div>
    )
  }

  render() {
    if (!this.isVisible) return null
    const content = this.renderCompletions()

    if (!this.props.popup) {
      const height = this.getOptionsHeight()
      return (
        <div
          className={cx('option-container', this.props.className)}
          style={{ height }}>
          {content}
        </div>
      )
    }

    const { anchor, clip, ...style } = this.getPopupBounds()
    return (
      <Popup
        anchor={anchor}
        className={this.props.className}
        clip={clip}
        fadeIn={this.props.fadeIn}
        style={style}
        onClickOutside={this.props.onClickOutside}
        onResize={this.handleResize}>
        {content}
      </Popup>
    )
  }

  static propTypes = {
    className: string,
    completions: array.isRequired,
    fadeIn: bool,
    isAdvisory: bool,
    isExactMatchHidden: bool,
    isSelectionHidden: bool,
    isVisibleWhenBlank: bool,
    match: func.isRequired,
    maxRows: number.isRequired,
    minQueryLength: number.isRequired,
    onClickOutside: func,
    onResize: func,
    onSelect: func.isRequired,
    parent: instanceOf(HTMLElement),
    popup: bool,
    query: string.isRequired,
    selection: array.isRequired,
    toId: func.isRequired,
    toText: func.isRequired,
  }

  static defaultProps = {
    match(value, query) {
      return collate.match(value.name || String(value), query)
    },
    maxRows: 10,
    minQueryLength: 0,
    popup: true,
    selection: [],
    toId(value) {
      return (value.id || String(value))
    },
    toText: (value, { matchData } = {}) =>
      <Highlight text={value.name || String(value)} matchData={matchData}/>
  }
}

module.exports = {
  Completions,
  Highlight
}
