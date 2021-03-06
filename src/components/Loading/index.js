import React from 'react'
import ReactLoading from "react-loading";
import {  Button } from "semantic-ui-react";
import './Loading.css';

/**
 * Functional react component for the loading component.
 * @function
 * @returns {JSX.Element} - Rendered component.
 */

export default ()=> {
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
              disabled={true}
            >
              Previous
            </Button>
            <Button
              inverted
              color="blue"
              disabled={true}
            >
              Next
            </Button>
          </div>
        </div>
      )
}
