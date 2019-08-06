import React from "react";
import "./card.css";
import { Card, Icon, Progress} from "semantic-ui-react";
import storm from "../../storm.ico";

export default function index(props) {
  
  return (
    <div>
      <Card>
        <Card.Content header={props.starships.name} />
        <Card.Content>
          <div>
              <span><img src={storm} style={{width: "1.12em"}} alt="startrooper"/> </span>
              <span> {props.starships.crew === "0"? "None" : props.starships.crew} </span>
              <span> Crew </span>
          </div>
          <div>
            <Icon name="user" />
            {props.starships.passengers === "0" ? "None" : props.starships.passengers} Passengers
          </div>
        </Card.Content>
        <Card.Content extra>
          <div><Icon name="rocket" />
          Hyperdrive Class
              </div>  
          {
              Number(props.starships.passengers) > 0 && Number(props.starships.passengers) !== "unknown"? <Progress percent={(Number(props.starships.passengers)/5)*100}  success/> : <Progress percent={Number(props.starships.passengers)} />
          }
          
        </Card.Content>
      </Card>
      
    </div>
  );
}
