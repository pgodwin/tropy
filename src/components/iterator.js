'use strict'

const React = require('react')
const { PureComponent, PropTypes } = React
const { STYLE } = require('../constants')
const { bounds, on, off } = require('../dom')
const { times } = require('../common/util')
const { number } = PropTypes


class Iterator extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      cols: 1, maxCols: 1
    }
  }

  componentDidMount() {
    if (this.constructor.isGrid) {
      on(window, 'resize', this.handleResize)
      this.handleResize()
    }
  }

  componentWillUnmount() {
    if (this.constructor.isGrid) {
      off(window, 'resize', this.handleResize)
    }
  }

  componentWillReceiveProps(props) {
    if (this.constructor.isGrid) {
      if (this.props.size !== props.size) {
        const { width } = bounds(this.container)

        this.setState({
          cols: this.getColumns(width, props.size)
        })
      }
    }
  }

  get isVertical() {
    return this.state.cols === 1
  }

  get isHorizontal() {
    return !this.isVertical
  }

  get isEmpty() {
    return this.size === 0
  }

  get size() {
    return this.iteration.length
  }

  get orientation() {
    return this.isVertical ? 'vertical' : 'horizontal'
  }

  get tabIndex() {
    return this.isEmpty ? null : STYLE.TABS[this.constructor.name]
  }

  getColumns(width, size = this.props.size) {
    return Math.floor(width / (size * STYLE.TILE.FACTOR))
  }

  setContainer = (container) => {
    this.container = container
  }

  fill(count) {
    return times(count, (i) => (
      <li key={`filler-${i}`} className="filler tile"/>
    ))
  }

  handleResize = () => {
    const { width } = bounds(this.container)
    const maxCols = this.getColumns(width, STYLE.TILE.MIN)

    this.setState({
      cols: this.getColumns(width), maxCols
    })

    if (this.constructor.isGrid) {
      this.filler = this.fill(maxCols)
    }
  }


  static get isGrid() {
    return false
  }

  static get props() {
    return Object.keys(this.propTypes)
  }

  static propTypes = {
    size: number.isRequired
  }
}

module.exports = {
  Iterator
}