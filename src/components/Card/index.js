import React from "react";
import "./card.css";
import { Card, Icon, Progress } from "semantic-ui-react";
import storm from "../../assets/storm.ico";

/**
 * Functional react component for the starship card.
 * @function
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component.
 */

export default props =>{
  return (
    <div>
      <Card>
        <Card.Content header={props.starships.name} />
        <Card.Content>
          <div>
            <span>
              <img src={storm} style={{ width: "1.12em" }} alt="startrooper" />{" "}
            </span>
            <span>
              {" "}
              {props.starships.crew === "0"
                ? "None"
                : props.starships.crew}{" "}
            </span>
            <span> Crew </span>
          </div>
          <div>
            <Icon name="user" />
            {props.starships.passengers === "0"
              ? "None"
              : props.starships.passengers}{" "}
            Passengers
          </div>
        </Card.Content>
        <Card.Content extra>
          <div>
            <Icon name="rocket" />
            Hyperdrive Class
          </div>
          {Number(props.starships.hyperdrive_rating) > 0 &&
          Number(props.starships.hyperdrive_rating) !== "unknown" ? (
            <Progress
              percent={100-(Number(props.starships.hyperdrive_rating) / 5) * 100}
              success
            />
          ) : (
            <Progress percent={0} />
          )}
        </Card.Content>
      </Card>
    </div>
  );
}