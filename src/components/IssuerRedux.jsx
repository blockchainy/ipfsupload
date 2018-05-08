import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import axios from 'axios';

import ipfsFunctions from '../utils/ipfsFunctions';

import * as ipfsActions from '../actions/ipfsActions';
import * as lotActions from '../actions/lotActions';

class Issuer extends Component {

  constructor(props) {
    super(props);

    this.getHashes = this.getHashes.bind(this);
    this.printSomeShit = this.printSomeShit.bind(this);
    this.testingFunction = this.testingFunction.bind(this);
    this.createNewLot = this.createNewLot.bind(this);
  }

  getHashes() {
    console.log(this.props.ticketHashes);
  }

  printSomeShit() {
    console.log(`hello`);
  }

  testingFunction() {
    let eventInfo = {
      name: 'This be a test',
      price: 50,
      supply: 1000,
      time: 1234324243423,
      afterMarket: true
    }

    ipfsFunctions.uploadEntry(eventInfo)
      .then(res => {
        this.props.setHash(res);
      })
      .catch(err => console.log(err))
  }

  createNewLot() {
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

    this.props.createNewLot(id)
  }


  render() {
    console.log(this.props.ticketHashes)
    return (
      <div style={{ marginLeft: 20 }}>
        <button onClick={this.testingFunction}> Write to IPFS </button>
        <button onClick={this.getHashes}> Get Hashes </button>
        <button onClick={this.createNewLot}> Create New Lot </button>
      </div>
    )
  }
}


//whatever is returned will show up as props inside of this component
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