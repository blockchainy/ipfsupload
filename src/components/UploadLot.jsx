import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import axios from 'axios';

import ipfsFunctions from '../utils/ipfsFunctions';

import * as ipfsActions from '../actions/ipfsActions';
import * as lotActions from '../actions/lotActions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

class Issuer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      lotState: ''
    };
    this.convertToJson = this.convertToJson.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // handle the drop down menu
  handleChange = (event, index, value) => this.setState({ lotState: value });

  // function that creates a number based on epoch time down to milliseconds
  generateRandomLotId() {
    var date = new Date();
    var components = [
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ];

    var id = components.join("");
    return id;
  }

  convertToJson() {
    let lotInfo = {
      lotId: this.generateRandomLotId(),
      name: this.state.name,
      price: this.state.price,
      lotState: this.state.lotState,
    }
    console.log(lotInfo);
    ipfsFunctions.uploadEntry(lotInfo)
      .then(res => {
        this.props.setHash(res)
      })
      .catch(err => console.log(err))
  }

  componentWillMount() {
    axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/')
      .then(response => {
        this.setState({ priceOfEther: response.data[0].price_usd });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{ marginLeft: 20 }}>
        <MuiThemeProvider>
          <TextField
            hintText="Enter Lot Name"
            onChange={event => this.setState({ name: event.target.value })}
          />
          <br />
          <TextField
            hintText="Enter Price (in USD)"
            onChange={event => this.setState({ price: event.target.value })}
          />
          <br />
          <DropDownMenu value={this.state.lotState} onChange={this.handleChange}>
            <MenuItem value={'Harvested'} primaryText="Harvested" />
            <MenuItem value={'Tested'} primaryText="Tested" />
            <MenuItem value={'Extracted'} primaryText="Extracted" />
            <MenuItem value={'Trimmed'} primaryText="Trimmed" />
          </DropDownMenu>
          <br />
          <RaisedButton label="Upload Data" onClick={this.convertToJson} />
        </MuiThemeProvider>
        <p></p>
        This is the IPFS Hash: { this.props.ticketHashes }
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    ticketHashes: store.ipfs,
    lotId: store.lot.lotId
  }
}

function mapDispatchToProps(dispatch) {
  // whenever the function is called result should be passed to all reducers
  return bindActionCreators(
    {
      setHash: ipfsActions.setInfoHash,
      createNewLot: lotActions.createNewLot
    }, dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Issuer);