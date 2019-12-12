// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { Component } from "react";
import Routes from './routes'
class App extends Component
{
  // getItems(){
  //     fetch('http://localhost:3000/api/users/krasniqi@cooper.edu')
  //     .then(response => response.json()).then(data => console.log(data))
  //     //.then(items => this.setState({items}))
  //     .catch(err => console.log(err))   
  // }

  // componentDidMount() {
  //   this.getItems()

  // }
  render()
  {
    return (<Routes />)
  }
  


}

export default App;
