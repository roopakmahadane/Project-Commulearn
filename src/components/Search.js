import React from 'react';
import Autosuggest from 'react-autosuggest';
import { Button } from "shards-react";

//form input styling for react-autosuggest
import './stylesheets/search.css'

//airtable
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyDVcVmNzsT5snDZ' }).base('appDOqSkGGREqLwe4');


// Imagine you have a list of categories that you'd like to autosuggest.
const categories = [];

// Teach Autosuggest how to calculate suggestions for any given input value.


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class Search extends React.Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],

    };

      this.Categories = []
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.Categories.filter(cat =>
        cat.name.trim().toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  componentDidMount() {
    base('Categories').select({
        view: "Grid view"
    }).eachPage( (records, fetchNextPage) => {

      records.forEach( (record) => {

        let temp = {
          name: record.get('Name').trim(),
          com_ids: record.get('Communities')
        }
        this.Categories.push(temp)
        console.log(temp)
      });

      fetchNextPage();

    }, (err) => {
      if (err) { console.error(err); return; }
      this.setState({
          doneFetch: true
      })
      console.log(categories)
    });
  }


  onSuggestionSelected = (event, { suggestion }) => {
    console.log(suggestion.name)
    if(suggestion.com_ids !== undefined ){
      this.props.ids(suggestion.com_ids);
      this.props.suggestName(suggestion.name);
    }else{
      this.props.ids([]);
    }

  }




  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Enter topic',
      value,
      onChange: this.onChange
    };

    // Finally, render it!

    let content = ( <center>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
      />

      <Button
        onClick={this.props.handleButtonClick}
        pill
        style={{ marginTop: "50px", width: "200px" }}>
        Let's Go!
      </Button>

  </center>)

    return (
        content
    );
  }
}

export default Search