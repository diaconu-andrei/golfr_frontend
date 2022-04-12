import { useState, useCallback } from 'react'
import useArticlePost from '../lib/useArticlePost'
import { getUserId } from '../lib/userAuth'
import { Collapse } from 'react-collapse'


const ArticlePostWidget = () => {

  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ open, setOpen ] = useState(false)

  const onClick = useCallback(
    () => setOpen(!open),
    [ open, setOpen ]
  )

  const id = getUserId()

  const { postArticle } = useArticlePost(id)

  const onSubmit = useCallback( e => {
    e.preventDefault()
    postArticle(title, description)
    setOpen(false)
    setTitle('')
    setDescription('')
  }, [ title, description, postArticle ]
  )


  return (
    <div>
      <div
        className="underline cursor-pointer"
        onClick={onClick}
        role="switch"
      >
        Want to post an article ?
      </div>
      <Collapse isOpened={open}>
        <form onSubmit={onSubmit}>
          <div className="border border-dashed border-gray-300 p-3 my-1 lg:w-1/3 md:w-1/2">
            <div>
              Title
              <input
                type="text"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="What's the title?"
                className="form-input h-8 w-50 ml-3 my-2"
              />
            </div>
            <div>
              Description
              <input
                type="text"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe your article"
                className="form-input ml-3 my-2 "
              />
            </div>
            <button className="w-40 p-1 my-2 bg-gray-200 rounded-lg hover:bg-blue-600">
              Post
            </button>
          </div>
        </form>
      </Collapse>
    </div>
  )
}

export default ArticlePostWidget
