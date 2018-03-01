pragma solidity ^0.4.18;
import './usingOraclize.sol';

contract CoinFlipOracle is usingOraclize {

  string public result;
  bytes32 public oraclizeID;

  event Log(string text);

  function CoinFlipOracle() {
    Log("Contract created");
  }

  function () payable {
        fallBackCalled();
    }
    
  function fallBackCalled() constant returns (string) {
      return "fallback was called";
  }

  // have to pay oraclize service so it's payable
  function flipCoin() payable {
    Log("Oraclize query was sent, waiting for response");
    oraclizeID = oraclize_query("WolframAlpha", "flip a coin", 5000000);
  }

  function __callback(bytes32 _oraclizeID, string _result) {
    require(msg.sender == oraclize_cbAddress());
    Log(_result);
    result = _result;
  }

  function getResult() view returns(string) {
    return result;
  }

  function getString() view returns(string) {
    return "hello";
  }

  function sendIntoContract() payable {
    this.transfer(msg.value);
  }
}

// contract BoosterKitty {

//   function getBooster() public payable {
//     require(kitties.length >= N);
//     require(msg.value >= PRICE);

//     bytes32 queryId = oraclize_query("WolframAlpha", "random number between 0 and 4294967294", 5000000);
//     queries[queryId] = msg.sender;

//     if (msg.value > PRICE) {
//       uint256 priceExcess = msg.value - PRICE;
//       msg.sender.transfer(priceExcess);
//     }
//     GenerateBoosterStart(queryId, msg.sender);
//   }

//   function __callback(bytes32 _queryId, string _result)
//   {
//     require(kitties.length >= N);
//     if (msg.sender != oraclize_cbAddress()) throw;
//     uint maxRange = kitties.length;
//     uint randomNumberStart = uint(sha3((_result ))) % maxRange;
//     kittiesToSend.length = 0;
//     contracts.length = 0;
//     for (uint i = 0; i < N; i++) {
//       uint randomNumber = (randomNumberStart + i) % maxRange;
//       kittiesToSend.push(kitties[randomNumber]);
//       contracts.push(tokenContract);
//       ERC721(tokenContract).approve(setContract, kitties[randomNumber]);
//       kitties[randomNumber] = kitties[kitties.length - 1 - i];
//     }
//     kitties.length -= N;
//     uint256 id = ERC721Set(setContract).mint(kittiesToSend, contracts);
//     ERC721(setContract).transfer(queries[_queryId], id);
//     BoosterTransferred(_queryId, queries[_queryId], id);
//   }
// }