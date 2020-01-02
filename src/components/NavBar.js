import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from "shards-react";
import { Container, Tooltip } from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


class NavBar extends Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
         open: false,
         homeButton: false
          };
    }

     toggle() {
    this.setState({
      open: !this.state.open
    });
  }

    componentDidMount(){
      if(window.location.pathname == "/new"){
        this.setState({homeButton : true});
      }
    }
    render() {

        const style = {
                margin: 0,
                top: 10,
                right: 60,
                bottom:20,
                float:'right',
                position:'absolute',
                fontSize: "25px"
            };

        return (
        <Container>
           <Nav pills style={{ paddingTop: "20px"}}>
            <NavItem >
                <NavLink disabled={!this.state.homeButton} active={this.state.homeButton} href="/">
                    Home
                </NavLink>
            </NavItem>
                <NavItem style={style}>
                    <NavLink   href="/new">
                     <FontAwesomeIcon id="TooltipExample" icon={faPlus}/>
                       <Tooltip
              open={this.state.open}
              target="#TooltipExample"
              toggle={this.toggle}
        >
          Add a new Community!
        </Tooltip>
                </NavLink>
            </NavItem>
           </Nav>
        </Container>
        );
    }
}

export default NavBar;
