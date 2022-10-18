
import { useField } from "../hooks"
import { useEffect } from "react"
import {
  useNavigate
} from "react-router-dom"

const CreateNew = (props) => {

  const navigate = useNavigate()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const reset = useField('button')



  useEffect(() => {
    content.onChange();
    author.onChange();
    info.onChange();
  }, [reset.value]);



  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    }
    )
    navigate('/')
  }



  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content'  {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button type="submit">create</button>
        <button   {...reset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew
