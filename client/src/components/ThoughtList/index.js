//Because the list of thought data is not a page but rather a component of a page, it is in the components directory

import React from 'react';

import { Link } from 'react-router-dom';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map(thought => (

            //Key helps let React track which data needs to be re-rendered if it changes
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
  <Link
    to={`/profile/${thought.username}`}
    style={{ fontWeight: 700 }}
    className="text-light"
  >
    {thought.username}
  </Link>{' '}
  thought on {thought.createdAt}
</p>
<div className="card-body">
  <Link to={`/thought/${thought._id}`}>
    <p>{thought.thoughtText}</p>
    <p className="mb-0">
      Reactions: {thought.reactionCount} || Click to{' '}
      {thought.reactionCount ? 'see' : 'start'} the discussion!
    </p>
  </Link>
</div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;