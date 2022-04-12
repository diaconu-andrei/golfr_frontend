import useSWR from 'swr'
import { getToken } from './userAuth'

const useArticle = (id, postId) => {
  const ARTICLE_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/articles/${postId}`

  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('We cant find the resources you need...')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then( data => data.article )
  }

  const { data, error } = useSWR(ARTICLE_URL, fetcher)

  return {
    article: data,
    error: error && error.message,
  }
}

export default useArticle
