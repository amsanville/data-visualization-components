import React from 'react';
import './Graph.css';
import Bar from '../Bar/Bar.js';


/*
Properties:
bars - the bars in the bar graph. Object with fields height, text, and value where height is the height of the bar in the bar graph (out of 100%), text is the text that appears on the bar, value is the actual numeric value of the bar, and a unique ID
*/

function Graph(props){
  return (
    <div className="DataVis-graph">
      {
      props.bars
      .filter(bar => bar.toggled)
      .map(bar => (
        <Bar
        key={bar.id}
        height={bar.height}
        alert={bar.text + " to " + props.reference + ": " + bar.value + " to 1."}
        text={bar.text}
      />
      ))
      }
    </div>
  );
}

export default Graph;
