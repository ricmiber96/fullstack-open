import { useEffect, useState } from 'react'
import './App.css'
import DiaryList from './components/DiaryList'
import FormNewEntry from './components/FormNewEntry'
import { getAllEntries } from './services/diaryService'
import { type DiaryEntry } from './utils/types'

function App () {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    void getAllEntries().then((entries) => {
      setDiaries(entries)
    })
    console.log('Fetching data')
  }, [])

  return (
    <>
      <FormNewEntry setDiaries={setDiaries}/>
      <DiaryList diaries={diaries}/>
    </>
  )
}

export default App
