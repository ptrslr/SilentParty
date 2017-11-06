import React from 'react';
import { connect } from 'react-redux';
import { resolve } from '../actions';

let AudioURL = ({ value, dispatch }) => {
  let input;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resolve(input.value))
  }
  
  return (
    <div className="audioURL ph3">
      <h2 className="audioURL-title tc">
        Submit a <a href="https://soundcloud.com" target="_blank">soundcloud</a> URL
      </h2>

      <form className="audioURL-main center mw7" onSubmit={handleSubmit}>
        <input 
          id="audioURL-input" 
          className="audioURL-input" 
          type="text" 
          placeholder={value} 
          defaultValue={value} 
          ref={ (node) => { input = node} }
        />

        <button id="audioURL-submit" className="audioURL-submit" type="submit">submit</button>
      </form>
    </div>
  );
}

AudioURL = connect()(AudioURL);
export default AudioURL;