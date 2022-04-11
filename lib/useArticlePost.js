import { mutate } from 'swr'
import { getToken } from './userAuth'
import { ARTICLES_URL } from './useArticles'

const url = id => `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/articles`

const useArticlePost = id => {

  const postArticle = async (title, description) => {
    fetch(url(id), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
        },
      }),
    }).then(res => res.json())
      .then(data => {
        if (data.errors){
          alert(data.errors[0])
        } else {
          mutate(ARTICLES_URL(id))
        }
      })
      .catch(e => {
        alert(e)
      })
  }

  return {
    postArticle,
  }
}

export default useArticlePost
