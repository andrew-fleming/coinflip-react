pragma solidity ^0.5.0;

contract Coinflip{
    
    mapping(address => uint) public playerWinnings;
    
    event userWithdrawal(address indexed _from, uint _value);
    event ownerWithdrawAll(address indexed _from, uint _value);
    event userWin(address indexed _from, uint _value);

    constructor() public payable onlyOwner{
        owner = msg.sender;
        contractBalance = msg.value;
    }

    address payable public owner = msg.sender;
    uint public contractBalance;
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    
    function flip(uint headsTails) public payable {
        require(headsTails == 0 || headsTails == 1, "Please choose heads or tails");
        require(msg.value >= .001 ether && msg.value <= 10 ether, "Please bet within the set parameters");
        require(msg.value < contractBalance, "Sorry, we don't have enough funds to cover that!");
        uint winAmount = msg.value * 2;
        uint randOutcome = random();
        random();
        if(headsTails == randOutcome){
            contractBalance -= msg.value;
            playerWinnings[msg.sender] += winAmount;
            emit userWin(msg.sender, winAmount);
        } else {
            contractBalance += msg.value;
        }
    }
    
    function random() private view returns(uint) {
        return (now % 2);
    }
    
    
    function withdrawAll() public onlyOwner {
        require(msg.sender == owner, "Nice try, you're not the owner");
        require(contractBalance > 0, "Nothing to withdraw");
        uint total = contractBalance;
        contractBalance = 0;
        owner.transfer(total);
        emit ownerWithdrawAll(msg.sender, total);
    }
    
    function withdrawWinnings() public {
        require(playerWinnings[msg.sender] > 0);
        uint balance = playerWinnings[msg.sender];
        playerWinnings[msg.sender] = 0;
        msg.sender.transfer(balance);
        emit userWithdrawal(msg.sender, balance);
        
    }
    
    function winningsBalance() public view returns(uint) {
        return playerWinnings[msg.sender];
    }
    
    //fund contract post-deployment
    function addFunds() public payable onlyOwner {
        contractBalance += msg.value;
    }
    
    //fund user winnings balance 
    //TESTING ONLY
    function fundWinnings() public payable {
        playerWinnings[msg.sender] += msg.value;
    }

}