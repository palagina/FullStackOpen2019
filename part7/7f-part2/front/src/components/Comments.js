import React from "react"
import { connect } from "react-redux"
import { addComment } from "../reducers/commentsReducer"
import { Form, Button, Container, Input, Header, List } from 'semantic-ui-react'

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
    <Container style={{ paddingTop: "30px" }}>
      <Header>Comments</Header>
      <List>
        {props.comments
          .filter(comment => postId === comment.postId)
          .map(comment => (
            <List.Item key={comment.id}>{comment.text}</List.Item>
          ))}
      </List>

      <Form onSubmit={addComment}>
        <Container>
          <Input name="comment" placeholder="Write your comment:" {...comments.text} />
        </Container>
        <Container style={{ marginTop: "10px" }}>
          <Button type="submit" color="violet">Add comment</Button>
        </Container>
      </Form>
    </Container>
  );
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

