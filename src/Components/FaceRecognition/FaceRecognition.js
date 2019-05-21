import React from 'react';
import FaceBox from './FaceBox';
import './FaceRecognition.css';

const FaceRecognition = ( { imageURL, boxes } ) => {
  return (
    <div className = 'center ma'>
      <div className = 'absolute mt2'>
        <img id = 'inputImage' alt = '' src = {imageURL} width='500px' height = 'auto'/>
          {boxes.length > 0 
          ?boxes.map((box, idx) => 
            {return <FaceBox box = {box} key = {idx}/>})
          : console.log('No faces')
          }
      </div>
  </div>
  )
}

export default FaceRecognition;