import Link from 'next/link'
import { useRouter } from 'next/router'

const ArticleCard = ({ createdAt, title, description, userName, id }) => {

  const router = useRouter()
  const golferId = router.query.id
  const postId = router.query.post_id

  if (!golferId){
    return null
  }

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-md">
      <div className="px-6 py-4">
        <div className="italic text-gray-400">
          {userName} at: {createdAt.substring(0, 10)}
        </div>
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
          { !postId &&
          <Link href={`/golfers/${golferId}/articles/${id}`}>
            <a className="pl-10" size="2">
              ↪️
            </a>
          </Link>
          }
        </p>
      </div>
    </div>
  )
}

export default ArticleCard
