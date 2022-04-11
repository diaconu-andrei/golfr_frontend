import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import useArticles from '../../../lib/useArticles'
import ArticlePostWidget from '../../../components/ArticlePostWidget'
import { getUserId } from '../../../lib/userAuth'
import ArticleCard from '../../../components/ArticleCard'

const Articles = () => {
  const router = useRouter()
  const golferId = router.query.id

  const { golfer, error } = useArticles(golferId)

  if (!golferId) {
    return null
  }

  return (
    <Layout>
      <>
        {error ? (
          error
        ) : (
          <>
            <h1 className="text-blue-800 font-medium tracking-wide text-lg pt-4 ">
              {golfer && (golfer.id === getUserId() ?
                'Your articles' : `${golfer.name}'s articles`)}
            </h1>
            {golfer && golferId === `${getUserId()}` ? <ArticlePostWidget /> : <></>}
            {golfer && golfer.articles.length === 0 &&
              <div className="text-center font-bold">There is no article...</div>}
            {golfer && golfer.articles.map(article => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                createdAt={article.created_at}
                userName={article.user_name}
                description={article.description}
              />
            ))}
          </>
        )}
      </>
    </Layout>
  )
}

export default Articles
