import React from 'react';
import Routes from "./Routes";
import background from "./wind_turbine_home.jpg";

const styles = {
  backgroundImage: `url(${background})`
}


function App() {
  return (
    <div className="App" style={styles}>
      <Routes/>
      <div>
        <h1>Hello</h1>
      </div>
    </div>
  );
}

export default App;
