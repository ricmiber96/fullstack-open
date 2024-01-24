import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

export const useCountry = (name) => {

    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/name'

    const fetchCountry = async(name) => {
        try {
            if (name === '') {
                return
            }
            setLoading(true)
            const response = await axios.get(`${BASE_URL}/${name}`)
            setCountry(
                {
                    found: true,
                    data: response.data
                }
            )
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }finally {
            setLoading(false)
        }
    }

  
    useEffect(() => {
        fetchCountry(name)
    },[name])



  
    return {country, loading, error}
}
