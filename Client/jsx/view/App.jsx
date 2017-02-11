import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import React from 'react';
import Home from '../component/Home.jsx';
class App extends React.Component {

  render()
  {
    return (
      <div>
        <AppBar title="CI" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <Home/>


      </div>
    );
  }
}

export default App;
