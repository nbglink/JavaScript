import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Counter from './Counter';
import List from './List';
import Table from './Table';

class App extends Component {
  render() {

      let columns = ["Name", "Age"];
      let rows = [
          ["Pesho", 17],
          ["Maria", 18],
      ];

      function delFunc() {
          alert("Delete Clicked")
      }

    return (
      <div className="App">
          <Header />
            <p>Hi My name is Hristo Nestorov</p>
            <div>
                <Counter start="5"/>
                <Counter start="22"/>
                <Counter start="88"/>
            </div>

            <List items={['Sofia', 'Plovdiv', 'Varna', 'Burgas']}/>



            <Table columns={columns} rows={rows} ondelete={delFunc}/>

          <Footer />
      </div>
    );
  }
}


export default App;
