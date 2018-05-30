import React,  { Component } from "react";
import axios from 'axios'

import Delete from '../Note/delete'
import Update from '../Note/update'
import {  CardText,CardBody, Card,
    CardTitle,  } from 'reactstrap';

class Note extends Component{
constructor(props){
    super(props)
    this.state={
        note:[],
    };

}
componentDidMount(){
    const {id} = this.props.match.params
    console.log(id)
    this.getNote(id)
}
getNote =id=>{

    axios
    .get(`https://notes-back-end.herokuapp.com/notes/${id}`)
    .then(response =>{
        console.log(response)
        this.setState(()=>({note:response.data}))
    })
    .catch(err=>{
        console.log("failed to get note")
    })
}
render(){
    console.log(this.state)
    return(
        <Card className="note-styles" key={this.state.note._id}>
         <Delete id={this.state.note._id}/>
        <CardBody className="body-styles">
         <CardTitle className="noteTitle-styles">{this.state.note.title}</CardTitle>
         <CardText className="noteText-styles">{this.state.note.textbody}</CardText>         
         <Update id={this.state.note._id}/> 
         </CardBody>
        
      
        
        
        
         </Card>
    )
}
}
export default Note;