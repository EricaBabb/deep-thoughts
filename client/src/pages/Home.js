import React from 'react';

import ThoughtList from '../components/ThoughtList';

//useQuery Hook allows home to make requests to the GraphQL server
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  // use useQuery hook to make query request
  //asynchronous = loading property to indicate that the request isn't done just yet 
  //When finished and we have data returned from the server, info is stored in the destructured data property
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  //loading property allows ablility to conditionally render data based on whether or not there is data to even display

  //every GraphQL response comes in a big data object, so we need to isolate thoughts data
  //synthax is optional chaining
  //Optional chaining negates the need to check if an object even exists before accessing its properties
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  //if data exists, store it in the thoughts constant we just created. If data is undefined, then save an empty array to the thoughts component.

  return (
    <main>
  <div className="flex-row justify-space-between">
    <div className="col-12 mb-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
      )}
    </div>
  </div>
</main>
  );
};

export default Home;
