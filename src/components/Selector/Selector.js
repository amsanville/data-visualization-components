import React from 'react';
import './Selector.css'

/*
Selector - provides selection input based on the options provided

Properties:
* selected - the currently selected option
* onSelect - what happens when the selection is changed
* options - list strings for the different options
*/


function Selector(props){
  return (
    <select value={props.selected} onChange={props.onSelect}>
    {
      props.options
        .map(option => (
          <option key={"opt-" + option}>{option}</option>
        ))
    }
  </select>
  );
}

export default Selector;
