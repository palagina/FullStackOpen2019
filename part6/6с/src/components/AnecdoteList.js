import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { notification, empty } from "../reducers/notificationReducer";
import Anecdote from "./Anecdote";

const AnecdoteList = props => {
  const notification = anecdote => {
    props.notification(anecdote);
  };
  
  const vote = id => {
    props.vote(id);
  };

  return (
    <ul>
      {props.visibleAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            vote(anecdote.id);
            notification(anecdote);
            setTimeout(() => empty(), 5000);
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
  notification,
  empty
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
