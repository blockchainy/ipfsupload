const bs58 = require('bs58');

const buf = Buffer.from('003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187', 'hex');
const address = bs58.encode(buf)

// console.log(buf);
// console.log(address);

const decoded = bs58.decode(address);
// console.log(decoded);
// console.log((decoded).slice(2));
// console.log(decoded.toString('hex'));
// console.log(decoded.slice(2).toString('hex'));

// Return bytes32 hex string from base58 encoded ipfs hash,
// stripping leading 2 bytes from 34 byte IPFS hash
// Assume IPFS defaults: function:0x12=sha2, size:0x20=256 bits
// E.g. "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL" -->
// "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
function getBytes32FromIpfsHash(ipfsListing) {
  return "0x" + bs58.decode(ipfsListing).slice(2).toString('hex')
}

function getIpfsHashFromBytes32(bytes32Hex) {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  // and cut off leading "0x"
  const hashHex = "1220" + bytes32Hex.slice(2)
  const hashBytes = Buffer.from(hashHex, 'hex');
  const hashStr = bs58.encode(hashBytes)
  return hashStr
}

function ipfsHashToBytes32(ipfs_hash) {
  var h = bs58.decode(ipfs_hash).toString('hex').replace(/^1220/, '');
  if (h.length != 64) {
    console.log('invalid ipfs format', ipfs_hash, h);
    return null;
  }
  return '0x' + h;
}

function bytes32ToIPFSHash(hash_hex) {
  //console.log('bytes32ToIPFSHash starts with hash_buffer', hash_hex.replace(/^0x/, ''));
  var buf = new Buffer(hash_hex.replace(/^0x/, '1220'), 'hex')
  return bs58.encode(buf)
}

var shit = ipfsHashToBytes32('QmbPvvXGCTRd78j4tUEERZgGnKbbGamNU44dXRY9yS846t')
console.log(shit);