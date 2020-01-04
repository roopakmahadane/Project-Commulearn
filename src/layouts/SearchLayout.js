import React from 'react';
import { Container } from "shards-react";
import Search from '../components/Search';
import Title from '../components/Title';
import Communities from '../components/Communities'


const contStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
  const pStyling = {
    paddingTop: '50px',
    fontSize: '1.5rem',
  }


class SearchLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            keyCount:0,
            name:''
        }
         this.ids=[];
          this.communityName=''
    }
    // when lets go! button is pressed
    handleButtonClick = () => {
          this.setState((prevState, props) => {
      return {
        keyCount : prevState.keyCount + 1,
        name: this.communityName
      }
    })
  }


handleSuggestName = (name) => {
    if(name !== this.communityName){
     this.communityName = name
     console.log(this.communityName)
    }
}

shouldComponentUpdate(nextProps, nextState) {
  if(nextState.name !== this.state.name){
    return true
  }else{
    return false
  }
}


  // Get all the id's from search component and push it into this.ids
  getIds = (data) => {
       this.ids = [...data];
       setTimeout(() => this.ids = [], 3000)
  }

    render() {
      let community = null;
      if(this.ids.length ){
        community =  <Communities data={this.ids} key={this.state.keyCount} />
      }
      if(!this.ids.length && this.state.keyCount){
        community = <p style={pStyling}>No Communities found</p>
      }
        return (
            <Container style={contStyle}>
                <Title />
                <Search handleButtonClick={this.handleButtonClick} ids={this.getIds} suggestName={this.handleSuggestName}/>
                {community}
            </Container>
        )
    }

}


export default SearchLayout;