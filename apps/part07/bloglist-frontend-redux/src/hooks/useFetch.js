import axios from 'axios'
import { useState, useEffect } from 'react'

function useFetch (url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  console.log('url:', url)

  useEffect(() => {
    console.log('url:', url)
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        setData(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetch
