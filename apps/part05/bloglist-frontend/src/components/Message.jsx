import './message.css'

export default function Message ({ message, isError, isVisible }) {
  const notificationStyle = {
    fontStyle: 'bold',
    fontSize: 16,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 20
  }

  return (
    <>
    {isVisible
      ? <div style={notificationStyle} className={`${isError ? 'error' : 'success'}`}>
     <h3>{message}</h3>
     </div>
      : null
    }
    </>

  )
}
