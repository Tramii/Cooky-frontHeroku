import React, {Component} from 'react';
import Input from '../sign/input';
import {Button, Well, Table} from 'react-bootstrap';
import axios from 'axios';
import Ingredients from './ingredients'

"use strict";
const ROOT_URL = "https://tramii-cooky-back.herokuapp.com";//"http://localhost:3000"//
class AddRecipe extends Component{

  constructor(props){
    super(props);
    this.state = {
      title: '',
      type:-1,
      description:'',
      ingredients:[],
      pictureGif:' nop '
    }
    this.escribeInstructions = this.escribeInstructions.bind(this);
    this.escribeTitle = this.escribeTitle.bind(this);
  }

  postRecipe(){
    if(this.state.title!=='' && this.state.description!=='' && this.state.ingredients!==[] )
    {
      console.log("esta haciendo el post recipe "+this.state.title+ "  "+this.state.description+"  "+ this.state.ingredients);
      axios.post(ROOT_URL + "/recipes/addRecipe", {
        nickName: this.props.username,
        password: this.props.password,
        folder: 'Favoritos',
        recipe: {
                  tipo: 1,
                  likes: 0,
                  creadaPor: this.props.username,
                  title: this.state.title,
                  description: this.state.description,
                  pictureGif: this.state.pictureGif,
                  Ingredients:this.state.ingredients
                }
        })
    }
    else {
      alert('Some required fields are missing');
    }
  }

  escribeInstructions(value)
  {
    this.setState({description: value})
  }


  escribeTitle(value)
  {
    this.setState({title: value})
  }


  render(){
    return (
      <div>
        <div><Well></Well></div>
        <div><Well></Well></div>
        <h2>Add a recipe</h2>
        <p>Fill in the form in order to add your recipe</p>
        <form>
          <Well>
              <Table condensed hover>
                  <tbody>
                      <tr>
                          <td>Cook</td>
                          <td>{this.props.username}</td>
                      </tr>
                      <tr>
                          <td>Title</td>
                          <td><Input name="titulo" type="text"  onTextInput={this.escribeTitle}
                          placeholder="Grandma's lemonade" value={this.state.titulo}/></td>
                      </tr>
                      <tr>
                          <td>Ingredients</td>
                          <td><Ingredients ingredients={this.state.ingredients}/></td>
                      </tr>
                      <tr>
                          <td>Instructions</td>
                          <td><Input name="instructions" type="text"  onTextInput={this.escribeInstructions}
                          placeholder="First, cut 3 lemons in halves..." value={this.state.titulo}/></td>
                      </tr>
                      <tr>
                        <td colSpan="2"><Button onClick={() => {this.postRecipe()}}  bsStyle="info">Insert recipe!</Button></td>
                      </tr>
                  </tbody>
              </Table>

          </Well>

        </form>
      </div>
    );
  }
}

export default AddRecipe;
