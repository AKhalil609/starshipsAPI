import React, { Component } from "react";
import axios from "axios";
import Cards from "../Card";
import {  Button } from "semantic-ui-react";
import "./List.css";
import Loading from '../Loading'

export default class index extends Component {
  constructor() {
    super();
    /**
     * the default state set up,
     * the starships key is where the 10 starships that are being currently viewed are stored
     * the pages key is used to save the page number requested so the same page is not
     * requested twice
     * the currentPage key has the page number that is currently viewed
     */
    this.state = {
      loading: true,
      data: { next: "https://swapi.co/api/starships/?page=1", results: [] },
      starships: [],
      pages: [],
      currentPage: 1
    };
  }

  /**
   * Requests the data from the swapi and set it as a new state
   * 
   */

  requestData = async () => {
    try {
        if (this.state.data.next) {
            // extracts the page number from the request  
            let pageNumber = this.state.data.next.match(/\d+/)[0];
            // checks if the reqested page was previosly requested
            if (!this.state.pages.includes(this.state.currentPage)) {
              await this.setState({loading:true})
              let res = await axios.get(this.state.data.next);
              await this.setState({
                ...this.state,
                data: {
                  ...res.data,
                  results: [...this.state.data.results, ...res.data.results]
                },
                starships: [...res.data.results]
              });
              // adds the requested page to the pages state to it not requested again
              let pageHistory = [...this.state.pages];
              pageHistory.push(pageNumber);
              await this.setState({
                ...this.state,
                loading: false,
                pages: pageHistory,
                currentPage: pageNumber
              });
            }
          }
          // chooses the 10 starips that should be viewed in the page based on the currentPage number
          let currentPage = this.state.currentPage;
          await this.setState({
            ...this.state,
            starships: [...this.state.data.results].slice(
              currentPage * 10 - 10,
              currentPage * 10
            )
          });
    } catch (err) {
        console.log("Error requesting the page");
    }
    
  };

  /**
   * runs when the next button is clicked
   */
  handelNext = async () => {
    await this.setState({
      currentPage: `${Number(this.state.currentPage) + 1}`
    });
    this.requestData();
  };

  /**
   * runs when the previous button is clicked
   */
  handelPrevious = async () => {
    await this.setState({ currentPage: this.state.currentPage - 1 });
    let currentPage = this.state.currentPage;

    await this.setState({
      ...this.state,
      starships: [...this.state.data.results].slice(
        currentPage * 10 - 10,
        currentPage * 10
      )
    });
  };

  /**
   * life cyle method that is invoked immediately after the component is mounted
   * runs the requestData() to fetch the data from the api
   */
  componentDidMount() {
    this.requestData();
  }

  render() {
    if (this.state.loading) {
        return (
            <Loading/>
          )
    }else{
        return (
            <div>
              <div className="cards">
                {this.state.starships.map((e, key) => (
                  <Cards starships={e} key={key} />
                ))}
              </div>
              <div className="buttonGroup">
                <Button
                  inverted
                  color="red"
                  onClick={this.handelPrevious}
                  // eslint-disable-next-line
                  disabled={this.state.currentPage == 1 ? true : false}
                >
                  Previous
                </Button>
                <Button
                  inverted
                  color="blue"
                  onClick={this.handelNext}
                  disabled={
                      // eslint-disable-next-line
                    Math.ceil(this.state.data.count / 10) == this.state.currentPage
                      ? true
                      : false
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          );
    }

    ;
  }
}


