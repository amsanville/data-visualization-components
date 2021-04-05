import React from 'react';
import './Header.css';
import Selector from '../Selector/Selector.js';
import ToggleButton from '../ToggleButton/ToggleButton.js';

/*
Header - manages the top of the page, so the toggle buttons and selector. The options for the selector for are the same as the toggle buttons.

Properties:
* selected - the thing currently selected by the selector
* onSelect - what to do when the selector changes
* toggleButtons - the state variable that keeps track of the buttons, should be a list of objects with an ID (in id, an integer), text for the button (in text, a string), and the toggled state (in isToggled, a boolean)
* onToggle - a function that does something based on the button that is clicked
*/


function ReactComponent(props){
  return (
    <div className="DataVis-header">
      <h3>Currency Exchange Rates</h3>
      <p>Choose base currency:</p>
        <Selector
          selected={props.selected}
          onSelect={props.onSelect}
          options={props.toggleButtons.map((button) => {return button.text;})}
        />
      <p>Toggle countries to display:</p>
      <div className="DataVis-header-buttonbar">
        {
          props.toggleButtons.map(buttons => ((
            <ToggleButton
              key={buttons.id}
              text={buttons.text}
              isToggled={buttons.toggled}
              toggle={() => props.onToggle(buttons.id)}
            />
          )
          ))
        }
      </div>
    </div>
  );
}

export default ReactComponent;
