import React from 'react'

interface Props {
  // TODO: Define the component props
  DiaryEntry: {
    id: number
    date: string
    weather: string
    visibility: string
    comment: string
  }
}

export const DiaryItem: React.FC<Props> = ({ DiaryEntry }) => {
  return (
    <>
      <tr>
        <td>{DiaryEntry.date}</td>
        <td>{DiaryEntry.weather}</td>
        <td>{DiaryEntry.visibility}</td>
        <td>{DiaryEntry.comment}</td>
      </tr>
    </>
  )
}

export default DiaryItem
