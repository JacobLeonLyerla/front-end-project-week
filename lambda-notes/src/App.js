import React, { Component } from 'react';
import './App.css';
import {notes} from './Notes/notes';
import {Route} from 'react-router-dom';
import { Col,Row } from 'reactstrap';
import axios from 'axios';
import Notes from "./Components/ListView"
import Home from "./Components/home"
import Note from "./Components/NoteView"
import CreateView from "./Components/CreateView"
import EditView from "./Components/EditView"
const url = 'http://localhost:5000/notes'
class App extends Component {
  constructor(){
    super();
    this.state={
      notes:[]

    };

  }

 
  componentDidMount(){
    console.log('i mounted')
    this.updateGet()
    }
    updateGet =() =>{
    console.log('i worked')
     axios
      .get(url)
      .then(response => {
        this.setState({notes: response.data})
      })
      .catch(err =>{
        console.log(err);
    
      })
    }
    deleteNote = noteId =>{
      axios
      .delete(`${url}/${noteId}`)
      .then(response =>{
          this.updateGet();
      })
      .catch(err =>{
          console.log(err);
      });
    };
    



  render() {
    console.log(this.state)
    return (

      <Row className="App">
      <Col xs="12">
      <Route path ="/" 
      render={props=><Home  updateGet={this.updateGet}/>}
      />
      </Col>
      <Col xs="12" className="components">
      <Route exact path ="/"
      render = {props=><Notes {...props} notes={this.state.notes}/>}
      />
<Route path="/notes/:id" component={Note}/>
</Col>
      </Row>
    );
  }
}

export default App;
