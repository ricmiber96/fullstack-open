import React from 'react'
import PropTypes from 'prop-types'

export default function Togglable ({ visible, setVisibility, buttonLabel, children}) {
  const hidenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisibility(!visible)
  }

  Togglable.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisibility: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <div style={hidenWhenVisible}>
        <button onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className='togglable-content'>
        <button onClick={toggleVisibility}>
            Cancel
        </button>
      </div>
    </div>
  )
}
