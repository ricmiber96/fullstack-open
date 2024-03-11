import React from 'react'
import { type DiaryEntry } from '../utils/types'
import DiaryItem from './DiaryItem'

interface Props {
  // TODO: Define the component props
  diaries: DiaryEntry[]
}

export const DiaryList: React.FC<Props> = ({ diaries }) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weather</th>
            <th>Visibility</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {diaries.map((diary) => (
            <DiaryItem key={diary.id} DiaryEntry={diary} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DiaryList
