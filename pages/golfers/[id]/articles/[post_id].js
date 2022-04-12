import { useRouter } from 'next/router'
import useArticle from '../../../../lib/useArticle'
import Layout from '../../../../components/Layout'
import ArticleCard from '../../../../components/ArticleCard'

const Article = () => {

  const router = useRouter()
  const golferId = router.query.id
  const postId = router.query.post_id

  const { article, error } = useArticle(golferId, postId)

  if (!golferId || !postId){
    return null
  }

  return (
    <Layout>
      { error ? (
        error
      ) : (
        <div className="flex justify-center py-40">
          {article && <ArticleCard
            id={article.id}
            title={article.title}
            createdAt={article.created_at}
            userName={article.user_name}
            description={article.description}
          />}
        </div>
      )}
    </Layout>
  )
}

export default Article
