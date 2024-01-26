import React from 'react'
import PropTypes from 'prop-types'
import { Button } from './ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    // <div>
    //   <div style={hidenWhenVisible}>
    //     <Button onClick={toggleVisibility}>
    //       {buttonLabel}
    //     </Button>
    //   </div>
    //   <div style={showWhenVisible} className='togglable-content'>
    //     <Button onClick={toggleVisibility}>
    //         Cancel
    //     </Button>
    //   </div>
    // </div>
    <Button onClick={toggleVisibility}>
      {visible ? <ChevronUp size={20} />  : <ChevronDown size={20} />}    
    </Button>
  )
}
