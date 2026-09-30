import { useState, useEffect } from 'react'

// custom hook: fetch data from a url
function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load data')
        return res.json()
      })
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}

export default useFetch
