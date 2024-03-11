import React, { useEffect } from 'react'

interface Props {
  // TODO: Define the component props
  notificationMessage: string
  setNotificationMessage: React.Dispatch<React.SetStateAction<string>>
  isError: boolean
}

export const Notification: React.FC<Props> = ({ notificationMessage, setNotificationMessage, isError }) => {
  const styleNotification = {
    color: isError ? 'red' : 'green',
    fontSize: 15,
    marginBottom: 10
  }

  if (notificationMessage === null) {
    return null
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Timeout')
      setNotificationMessage('')
    }, 5000)
    return (): void => { clearTimeout(timer) }
  }, [notificationMessage])

  return (
    <div style={styleNotification}>
      <p>{notificationMessage}</p>
    </div>
  )
}

export default Notification
