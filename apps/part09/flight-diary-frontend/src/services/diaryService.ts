import { type NewDiaryEntry, type DiaryEntry } from '@/utils/types'
import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = async () => {
  return await axios.get<DiaryEntry[]>(baseUrl)
    .then(response => { return response.data })
    .catch((error: Error) => { throw new Error(`Error: ${error.message}`) })
}

export const addEntry = async (entry: NewDiaryEntry) => {
  return await axios
    .post<DiaryEntry>(baseUrl, entry)
    .then(response => { return response.data })
    .catch((error: Error) => { throw new Error(`Error: ${error.message}`) })
}
