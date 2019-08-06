import React, { Component } from "react";
import axios from "axios";
import Cards from "../Card";
import {  Button } from "semantic-ui-react";
import "./List.css";
import ReactLoading from "react-loading";

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      data: { next: "https://swapi.co/api/starships/?page=1", results: [] },
      starships: [],
      pages: [],
      currentPage: 1
    };
  }

  requestData = async () => {
    if (this.state.data.next) {
      let pageNumber = this.state.data.next.match(/\d+/)[0];
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
    let currentPage = this.state.currentPage;
    await this.setState({
      ...this.state,
      starships: [...this.state.data.results].slice(
        currentPage * 10 - 10,
        currentPage * 10
      )
    });
  };

  handelNext = async () => {
    await this.setState({
      currentPage: `${Number(this.state.currentPage) + 1}`
    });
    this.requestData();
  };

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

  componentDidMount() {
    this.requestData();
  }

  render() {
    if (this.state.loading) {
        return (
            <div>
              <div className="cards-loading">
                  <div>
                  <ReactLoading type={"spin"} color={"#fff"} height={50} width={50} />
                  </div>
                
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


