import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import useUserScores from '../../lib/useUserScores'
import ScoreCard from '../../components/ScoreCard'
import { getUserId } from '../../lib/userAuth'

const Golfer = () => {
  const router = useRouter()
  const golferId = router.query.id

  const { golfer, error } = useUserScores(golferId)

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
              {golfer &&
                (golfer.scores.length > 0
                  ? golfer.id === getUserId()
                    ? 'Your scores'
                    : `${golfer.name}'s scores`
                  : `${golfer.name} has no scores yet`)}
            </h1>

            {golfer &&
              golfer.scores.map( score => (
                <ScoreCard
                  key={score.id}
                  id={score.id}
                  totalScore={score.total_score}
                  playedAt={score.played_at}
                  userId={score.user_id}
                  userName={score.user_name}
                />
              ))}
          </>
        )}
      </>
    </Layout>
  )
}

export default Golfer
