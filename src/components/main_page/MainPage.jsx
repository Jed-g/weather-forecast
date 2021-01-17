import React from "react";

function MainPage({ match, API_KEY }) {
  return <h1>{match.params.id}</h1>;
}

export default MainPage;
