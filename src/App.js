import React, { Component } from 'react';
import './App.css';
const kijiji = require("kijiji-scraper");

class App extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: '',
            query: ''

        }
    }
    updateText = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    }
    scrape = () => {
        this.setState({
            query: this.state.searchTerm
        });

        let options = {
            minResults: 40
        };
         
        let params = {
            locationId: 1700185,  // Same as kijiji.locations.ONTARIO.OTTAWA_GATINEAU_AREA.OTTAWA
            categoryId: 27,  // Same as kijiji.categories.CARS_AND_VEHICLES
            sortByName: "priceAsc"  // Show the cheapest listings first
        };
         
        // Scrape using returned promise
        kijiji.search(params, options).then(function(ads) {
            // Use the ads array
            for (let i = 0; i < ads.length; ++i) {
                console.log(ads[i].title);
            }
        }).catch(console.error);
         
        // Scrape using optional callback parameter
        function callback(err, ads) {
            if (!err) {
                // Use the ads array
                for (let i = 0; i < ads.length; ++i) {
                    console.log(ads[i].title);
                }
            }
        }
        kijiji.search(params, options, callback);
    }
  render() {
    return (
      <div className="App">
        <input type='text' onChange={this.updateText} placeholder= 'Enter the product you wish to search' />
        <input type='button' onClick={this.scrape} value='Search'/>
        <h1>Average price for a used {this.state.query}</h1>
      </div>
    );
  }
}

export default App;

