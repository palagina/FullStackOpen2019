import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { vote_notification } from "../reducers/notificationReducer";
import Anecdote from "./Anecdote";

const AnecdoteList = props => {

  return (
    <ul>
      {props.visibleAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            props.vote(anecdote);
            props.vote_notification(anecdote.content, 20);
          }}
        />
      ))}
    </ul>
  );
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter !== undefined) {
    const filteredAnecdotes = anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredAnecdotes;
  } else {
    return anecdotes;
  }
};

const mapDispatchToProps = {
  vote,
  vote_notification,
  //empty
};

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  };
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotes;
