import React from 'react';
import './ToggleButton.css';

/*
ToggleButton - Button that allows to be toggled into an on or off state.

Properties:
* text - the text that appears on the button
* isToggled - true if the button is toggled
* toggle - what to do when the button is clicked
*/

function ToggleButton(props){
  return (
    <button key={"btn-" + props.text} className={"DataVis-title-buttonbar-button" + (props.isToggled ? (" DataVis-title-buttonbar-button--toggle") : (""))} onClick={props.toggle}>
      {props.text}
    </button>
  );
}

export default ToggleButton;
