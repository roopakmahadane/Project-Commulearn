import React from "react";
import { Container, Card, CardBody, CardTitle} from "shards-react"

import whatsapp from '../logos/whatsapp.png'
import slack from '../logos/slack.png';
import discord from '../logos/discord.png';
import facebook from '../logos/facebook.png';
import reddit from '../logos/reddit.png';
import telegram from '../logos/telegram.png';
import stackExchange from "../logos/stackExchange.png"


import './stylesheets/communities.css'


export default function CardBodyExample(props) {

  let source = null

  // for logo
  switch(props.platform.toLowerCase()) {
    case "facebook":
      source = facebook
      break;
    case "whatsapp":
      source = whatsapp
      break;
    case "reddit":
      source = reddit
      break;
    case "discord":
      source = discord
      break;
    case "slack":
      source = slack
      break;
    case "telegram":
      source = telegram
      break;
    case "stackexchange":
      source = stackExchange
      break;
    default:
      console.log("this is bad!")
  }

  return (
    <Container>
          <Card className="community">
          <a href={props.link}>
            <img className="logo" src={source} alt="slack"/>
          </a>
            <CardBody>
              <a href={props.link}>
                <CardTitle> {props.name} </CardTitle>
              </a>

              <p> {props.member} 👩🏽‍💻 </p>
            </CardBody>
          </Card>
      </Container>
  );
}