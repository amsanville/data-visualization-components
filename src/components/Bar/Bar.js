import React from 'react';
import './Bar.css';

/*
Bar - bar for a bar graph based on flex box.

Properties:
height: length of the bar, largest bar should be less than or equal to 100%.
alert: text that gets displayed in an alert when the bar is clicked, no text, no alert
text: the text that appears on the bar
*/

function ReactComponent(props){
  return (
    <div className="DataVis-graph-bar" style={{height: props.height}} onClick={() => props.alert ? (alert(props.alert)) : (null)}>
      {props.text}
    </div>
  );
}

export default ReactComponent;
