pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract PlanToNFTOracle is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    // Stores the answer from the Chainlink oracle
    uint256 public value;
    bytes32 private jobId;
    uint256 private oraclePayment;
    address OracleAddress;
    address public owner;

    event RequestValue(bytes32 requestId, uint256 _value);

    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7); //일단 hardcoding

        //OracleAddress = 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7;
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
        oraclePayment = 100000000000000000; // = 0.1 LINK
        owner = msg.sender;
    }

    function requestAPIValue(
        string memory _taskId
    ) public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillValue.selector
        );

        if (stringCompare(_taskId, "NmpmTDNEMVdFOElpRl91RQ")) {
            //0
            req.add(
                "get",
                "http://101.101.209.121:4000/rate/NmpmTDNEMVdFOElpRl91RQ"
            );
        } else if (stringCompare(_taskId, "X2M1U3ZWNlBwRzFvSkJITg")) {
            //25
            req.add(
                "get",
                "http://101.101.209.121:4000/rate/X2M1U3ZWNlBwRzFvSkJITg"
            );
        } else if (stringCompare(_taskId, "eTlnbHpnblF4Y0NHY3FveA")) {
            //50
            req.add(
                "get",
                "http://101.101.209.121:4000/rate/eTlnbHpnblF4Y0NHY3FveA"
            );
        } else if (stringCompare(_taskId, "ckRQVFU1UE9uOGgzc0ZCTQ")) {
            //75
            req.add(
                "get",
                "http://101.101.209.121:4000/rate/ckRQVFU1UE9uOGgzc0ZCTQ"
            );
        } else if (stringCompare(_taskId, "V204WkNMdG9SY2Z6LWJUYw")) {
            //100
            req.add(
                "get",
                "http://101.101.209.121:4000/rate/V204WkNMdG9SY2Z6LWJUYw"
            );
        } else {
            req.add("get", "http://101.101.209.121:4000/rate/"); // default
        }
        req.add("path", "rate");
        req.addInt("times", 1);

        return sendChainlinkRequest(req, oraclePayment);
    }

    function fulfillValue(
        bytes32 _requestId,
        uint256 _value
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestValue(_requestId, _value);
        value = _value;
    }

    // cancelRequest allows the owner to cancel an unfulfilled request
    function cancelRequest(
        bytes32 _requestId,
        uint256 _payment,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    ) public onlyOwner {
        cancelChainlinkRequest(
            _requestId,
            _payment,
            _callbackFunctionId,
            _expiration
        );
    }

    // withdrawLink allows the owner to withdraw any extra LINK on the contract
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function stringCompare(
        string memory _taskId1,
        string memory _taskId2
    ) private returns (bool) {
        return (keccak256(abi.encodePacked(_taskId1)) ==
            keccak256(abi.encodePacked(_taskId2)));
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}
