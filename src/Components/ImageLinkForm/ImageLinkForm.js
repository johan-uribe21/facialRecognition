import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ( {onInputChange, onButtonSubmit} ) => {
  return (
    <div>
      <p className = 'f3'>
        {'This human detector uses machine learning to differentiate between human and non-human faces. Put it to the test. Submit an image. How many humans can you find?'}
      </p>
      <div className = 'center'>
        <div className = 'center form pa4 br3 shadow-5'>
          <input className = 'f4 pa2 w-70 center' type = 'text' onChange={onInputChange}/>
          <button className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick ={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;