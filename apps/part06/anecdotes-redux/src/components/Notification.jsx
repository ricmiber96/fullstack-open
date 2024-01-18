import { useSelector } from 'react-redux'

export default function Notification () {
  const notification = useSelector((state) => state.notification)
  console.log('Notification', notification)
  const notificationStyle = {
    display: notification ? 'block' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={notificationStyle}>
        {notification}
    </div>
  )
}
