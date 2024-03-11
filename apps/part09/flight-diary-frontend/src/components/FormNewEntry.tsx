import React, { useState } from 'react'
import { addEntry } from '../services/diaryService'
import { Visibility, Weather, type NewDiaryEntry, type DiaryEntry } from '../utils/types'
import Notification from './Notification'

interface Props {
  // TODO: Define the component props
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

export const FormNewEntry: React.FC<Props> = ({ setDiaries }) => {
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    date: '',
    visibility: Visibility.Great,
    weather: Weather.Sunny,
    comment: ''
  })

  const [notificationMessage, setNotificationMessage] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const { name, value } = event.target
    setNewEntry({ ...newEntry, [name]: value })
  }
  const addNewEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    addEntry(newEntry).then((response) => {
      console.log('Response:', response)
      setDiaries((prevDiaries) => [...prevDiaries, response])
    }).catch((error: Error) => {
      setNotificationMessage(`Error: ${error.message}`)
      setIsError(true)
    })
    setNewEntry({
      date: '',
      visibility: Visibility.Great,
      weather: Weather.Sunny,
      comment: ''
    })
    setNotificationMessage('New entry added')
    setIsError(false)
    console.log('Adding new entry:', newEntry)
  }

  return (
    <div>
      <h2>New Entry</h2>
      <Notification notificationMessage={notificationMessage} setNotificationMessage={setNotificationMessage} isError={isError}/>
      <form onSubmit={addNewEntry}>
        <div>
          <label>Date</label>
          <input type="date" name='date' value={newEntry.date} onChange={(e) => { handleInputChange(e) }} />
        </div>
        <div>
          <label>Visibility</label>
          <select name="visibility" value={newEntry.visibility} onChange={handleInputChange}>
            <option value={Visibility.Great}>Great</option>
            <option value={Visibility.Good}>Good</option>
            <option value={Visibility.Ok}>Ok</option>
            <option value={Visibility.Poor}>Poor</option>
          </select>
        </div>
        <div>
          <label>Weather</label>
          <select name="weather" value={newEntry.weather} onChange={handleInputChange}>
            <option value={Weather.Sunny}>Sunny</option>
            <option value={Weather.Rainy}>Rainy</option>
            <option value={Weather.Cloudy}>Cloudy</option>
            <option value={Weather.Stormy}>Stormy</option>
            <option value={Weather.Windy}>Windy</option>
          </select>
        </div>
        <div>
          <label>Comment</label>
          <input type="text" name='comment' value={newEntry.comment} onChange={handleInputChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default FormNewEntry
