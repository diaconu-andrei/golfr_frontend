import useSWR from 'swr'
import { getToken } from './userAuth'

export const ARTICLES_URL = id => `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/articles`

const useArticles = id => {

  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok){
      const error = new Error('We could not find that golfer')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.user)
  }

  const { data, error } = useSWR(ARTICLES_URL(id), fetcher)
  return {
    golfer: data,
    error: error && error.message,
  }
}

export default useArticles
