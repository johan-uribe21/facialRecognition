import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js'
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: 'b59200e5e03144488902c88b98899af9'
 });

const particlesOptions = {
    particles: {
      number:{
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        }},
      
    }
}

class App extends Component {
  constructor() {
    super();
    this.state={
      input: '',
      imageURL:'',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(this.state.input)
  }
 
  onButtonSubmit = () => {
    let input = this.state.input
    this.setState({imageURL: input});
    console.log('submit', this.state.imageURL);
    app.models
      .predict(
        "a403429f2ddf4b49b307e318f00e528b", 
        this.state.input
      )
      .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function(err) {
        // there was an error
      }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className = 'particles' params={particlesOptions} />
        <Navigation/>
        <Logo />
        <Rank/>
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
