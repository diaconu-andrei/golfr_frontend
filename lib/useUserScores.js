import useSWR from 'swr'
import { getToken } from './userAuth'

const useUserScores = id => {
  const golferURL = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`

  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('The golfer was not found.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }

    return res.json().then( data => data.user)
  }

  const { data, error } = useSWR(golferURL, fetcher)

  return {
    golfer: data,
    error: error && error.message,
  }
}

export default useUserScores
