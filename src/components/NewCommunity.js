import React, { Component } from 'react';
import  NavBar from './NavBar';

class NewCommunity extends Component{
  render() {
    const style = {
      width:"100%",
      height:"1000px",
      background:'transparent',
      frameBorder:0,
      onmousewheel:"",
      border:0,
    }
    return (
        // Adding airtable embedded form
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        <iframe className="airtable-embed" src="https://airtable.com/embed/shr3Tkx5CAB3VsX3K?backgroundColor=blue"
          style={style}/>

      )
  }

}

export default NewCommunity;