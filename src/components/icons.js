'use strict'

const React = require('react')
const { PropTypes } = React

const Icon = ({ children, name }) => (
  <span className={`icon icon-${name}`}>
    {children}
  </span>
)

Icon.propTypes = {
  children: PropTypes.element,
  name: PropTypes.string
}

module.exports = { Icon }


function i(name, svg) {
  const icon = () => (
    <Icon name={name.toLowerCase()}>{svg}</Icon>
  )

  icon.displayName = `Icon${name}`

  module.exports[icon.displayName] = icon
}

/* eslint-disable max-len */


/* 16 x 16 */

i('Chevron7', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <polygon points="5.707,10 8.5,7.207 11.293,10 12,9.293 8.5,5.793 5,9.293"/>
    </g>
  </svg>
))

i('Chevron16', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <polygon points="15.146,11.854 8,4.707 0.854,11.854 0.146,11.146 8,3.293 15.854,11.146"/>
    </g>
  </svg>
))

i('Folder', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <path d="M15,3H9L8.276,1.553C8.107,1.214,7.761,1,7.382,1H3.618C3.239,1,2.893,1.214,2.724,1.553L2,3H1C0.448,3,0,3.448,0,4v10c0,0.552,0.448,1,1,1h14c0.552,0,1-0.448,1-1V4C16,3.448,15.552,3,15,3z M15,14H1V6h14V14z M1,5V4h1c0.379,0,0.725-0.214,0.894-0.553L3.618,2h3.764v0l0.724,1.447C8.275,3.786,8.621,4,9,4h6v1H1z"/>
    </g>
    <g className="block" fill="currentColor">
      <path d="M15,15H1c-0.552,0-1-0.448-1-1V7c0-0.552,0.448-1,1-1h14c0.552,0,1,0.448,1,1v7C16,14.552,15.552,15,15,15z M16,5V4c0-0.552-0.448-1-1-1H9L8.276,1.553C8.107,1.214,7.761,1,7.382,1H3.618C3.239,1,2.893,1.214,2.724,1.553L2,3H1C0.448,3,0,3.448,0,4v1H16z"/>
    </g>
  </svg>
))

i('Grid', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <path d="M6,2v4H2V2H6 M6,1H2C1.448,1,1,1.448,1,2v4c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1V2C7,1.448,6.552,1,6,1L6,1z"/>
      <path d="M14,2v4h-4V2H14 M14,1h-4C9.448,1,9,1.448,9,2v4c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1V2C15,1.448,14.552,1,14,1L14,1z"/>
      <path d="M6,10v4H2v-4H6 M6,9H2c-0.552,0-1,0.448-1,1v4c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1v-4C7,9.448,6.552,9,6,9L6,9z"/>
      <path d="M14,10v4h-4v-4H14 M14,9h-4c-0.552,0-1,0.448-1,1v4c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1v-4C15,9.448,14.552,9,14,9L14,9z"/>
    </g>
  </svg>
))

i('GridSmall', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <path d="M6,3v3H3V3H6 M6,2H3C2.448,2,2,2.448,2,3v3c0,0.552,0.448,1,1,1h3c0.552,0,1-0.448,1-1V3C7,2.448,6.552,2,6,2L6,2z"/>
      <path d="M13,3v3h-3V3H13 M13,2h-3C9.448,2,9,2.448,9,3v3c0,0.552,0.448,1,1,1h3c0.552,0,1-0.448,1-1V3C14,2.448,13.552,2,13,2L13,2z"/>
      <path d="M13,10v3h-3v-3H13 M13,9h-3c-0.552,0-1,0.448-1,1v3c0,0.552,0.448,1,1,1h3c0.552,0,1-0.448,1-1v-3C14,9.448,13.552,9,13,9L13,9z"/>
      <path d="M6,10v3H3v-3H6 M6,9H3c-0.552,0-1,0.448-1,1v3c0,0.552,0.448,1,1,1h3c0.552,0,1-0.448,1-1v-3C7,9.448,6.552,9,6,9L6,9z"/>
    </g>
  </svg>
))

i('List', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <rect x="1" y="3" width="14" height="1"/>
      <rect x="1" y="6" width="14" height="1"/>
      <rect x="1" y="9" width="14" height="1"/>
      <rect x="1" y="12" width="14" height="1"/>
    </g>
  </svg>
))

i('ListSmall', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <rect x="2" y="3" width="12" height="1"/>
      <rect x="2" y="6" width="12" height="1"/>
      <rect x="2" y="9" width="12" height="1"/>
      <rect x="2" y="12" width="12" height="1"/>
    </g>
  </svg>
))

i('Maze', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <path d="M16,0v15H9v-1h4v-2h1v2h1v-3h-3v2h-1V8h1v2h3V5h-4V4h4V1h-5v1h4v1H9V0H16z M5,13h5V8H5v1h4v3H6v-1h2v-1H4V7h9v2h1V6h-4V4H8V0H1v15h7v-1H4v-2H3v2H2V1h5v3H6V2H5v3h4v1H4V2H3v9h2V13L5,13z"/>
    </g>
  </svg>
))

i('Metadata', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <path d="M13,10c-0.947,0-1.781,0.447-2.331,1.133L6.818,8.994C6.929,8.681,7,8.35,7,8S6.929,7.319,6.818,7.006l3.851-2.139C11.219,5.552,12.053,6,13,6c1.657,0,3-1.343,3-3s-1.343-3-3-3s-3,1.343-3,3c0,0.35,0.071,0.681,0.182,0.994L6.331,6.133C5.781,5.448,4.947,5,4,5C2.343,5,1,6.343,1,8s1.343,3,3,3c0.947,0,1.781-0.447,2.331-1.133l3.851,2.139C10.071,12.319,10,12.65,10,13c0,1.657,1.343,3,3,3s3-1.343,3-3S14.657,10,13,10z M13,1c1.103,0,2,0.897,2,2c0,1.103-0.897,2-2,2s-2-0.897-2-2C11,1.897,11.897,1,13,1z M4,10c-1.103,0-2-0.897-2-2c0-1.103,0.897-2,2-2s2,0.897,2,2C6,9.103,5.103,10,4,10z M13,15c-1.103,0-2-0.897-2-2c0-1.103,0.897-2,2-2s2,0.897,2,2C15,14.103,14.103,15,13,15z"/>
    </g>
  </svg>
))

i('Note', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <path d="M15,10.707V0L1,0v16h8.707L15,10.707z M10,14.293V11h3.293L10,14.293z M14,10H9v5H2V1h12V10z"/>
      <rect x="4" y="10" width="3" height="1"/>
      <rect x="4" y="7" width="8" height="1"/>
      <rect x="4" y="4" width="8" height="1"/>
    </g>
  </svg>
))

i('Photo', (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <g className="line" fill="currentColor">
      <path d="M12.5,3C13.327,3,14,3.673,14,4.5S13.327,6,12.5,6S11,5.327,11,4.5S11.673,3,12.5,3 M12.5,2C11.119,2,10,3.119,10,4.5S11.119,7,12.5,7S15,5.881,15,4.5S13.881,2,12.5,2L12.5,2z"/>
      <path d="M5.333,6.762l2.515,4.356L8.5,12.247l0.922-0.922l1.245-1.245L13.586,13h-2.919H5.333H1.732L5.333,6.762M5.333,4.762L0,14h5.333h5.333H16l-5.333-5.333l-1.952,1.952L5.333,4.762L5.333,4.762z"/>
    </g>
  </svg>
))

i('Plus', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <polygon points="16,7 9,7 9,0 8,0 8,7 1,7 1,8 8,8 8,15 9,15 9,8 16,8 "/>
    </g>
  </svg>
))

i('Search', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <path d="M15.824,14.977L11.5,10.652C12.436,9.526,13,8.079,13,6.5C13,2.91,10.09,0,6.5,0S0,2.91,0,6.5S2.91,13,6.5,13c1.579,0,3.026-0.564,4.152-1.5l4.324,4.324C15.094,15.941,15.247,16,15.4,16s0.307-0.059,0.424-0.176C16.059,15.591,16.059,15.21,15.824,14.977z M6.5,11.8c-2.922,0-5.3-2.378-5.3-5.3s2.378-5.3,5.3-5.3s5.3,2.378,5.3,5.3S9.422,11.8,6.5,11.8z"/>
    </g>
  </svg>
))

i('Spin', (
  <svg width="16" height="16">
    <g className="line" fill="none" stroke="currentColor">
      <path strokeWidth="1.5" d="M8,15c-3.866,0-7-3.134-7-7s3.134-7,7-7s7,3.134,7,7"/>
    </g>
  </svg>
))

i('Tag', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <path d="M6.086,1l8.5,8.5L9.5,14.586L1,6.086V1H6.086 M6.5,0h-6C0.224,0,0,0.224,0,0.5v6l9.146,9.146c0.098,0.098,0.226,0.146,0.354,0.146c0.128,0,0.256-0.049,0.354-0.146l5.793-5.793c0.195-0.195,0.195-0.512,0-0.707L6.5,0L6.5,0z"/>
      <circle cx="4" cy="4" r="1.25"/>
    </g>
  </svg>
))

i('Trash', (
  <svg width="16" height="16">
    <g className="line" fill="currentColor">
      <path d="M13,14.542C13,14.79,12.729,15,12.409,15H4.591C4.271,15,4,14.79,4,14.542V4H3v10.542C3,15.346,3.714,16,4.591,16h7.818C13.286,16,14,15.346,14,14.542V4h-1V14.542z"/>
      <path d="M12,2V1c0-0.552-0.448-1-1-1H6C5.448,0,5,0.448,5,1v1H2v1h3h7h3V2H12z M6,2V1h5v1H6z"/>
      <rect x="6" y="5" width="1" height="8"/>
      <rect x="10" y="5" width="1" height="8"/>
    </g>
  </svg>
))


/* 24 x 24 */

i('Item', (
  <svg viewBox="0 0 24 24">
    <g className="line" fill="currentColor">
      <path d="M16.5,10c1.381,0,2.5-1.119,2.5-2.5C19,6.119,17.881,5,16.5,5S14,6.119,14,7.5C14,8.881,15.119,10,16.5,10z M16.5,6C17.327,6,18,6.673,18,7.5S17.327,9,16.5,9S15,8.327,15,7.5S15.673,6,16.5,6z"/>
      <path d="M14.667,11.667l-1.952,1.952L9.333,7.762L4,17h5.333h5.333H20L14.667,11.667z M9.333,16H5.732l3.601-6.238l2.515,4.356l0.652,1.129l0.922-0.922l1.245-1.245L17.586,16h-2.919H9.333z"/>
    </g>
  </svg>
))
