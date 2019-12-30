import React from "react"
import { connect } from "react-redux"
import { addComment } from "../reducers/commentsReducer"

const Comments = (props) => {
  const { comments, postId } = props

  const addComment = async event => {
    event.preventDefault()
    const commentObject = {
      postId: postId,
      text: event.target.comment.value,
    }
    event.target.comment.value = ""
    try {
      await props.addComment(commentObject)
    } catch (error) {
      props.error(error.response.data.error, 30)
    }
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {props.comments
          .filter(comment => postId===comment.postId)
          .map(comment => (
            <li key={comment.id}>
              {comment.text}
            </li>
          ))}
      </ul>

      <form onSubmit={addComment} id="commentForm">
        <div>
          Write your comment:
          <input name="comment" {...comments.text} />
        </div>
        <div>
          <button type="submit">Add comment</button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = {
  addComment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)

