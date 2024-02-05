import React, { useEffect } from 'react'

export default function Test (props) {
  useEffect(() => {
    console.log('Test component mounted')
  }, [])

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}
