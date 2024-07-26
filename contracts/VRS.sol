// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract VRS {
    address public owner;

    enum VehicleStatus {
        Available,
        Occupied
    }

    struct Vehicle {
        string make;
        string model;
        uint256 rentalPrice;
        VehicleStatus status;
        address giverAddress;
        address takerAddress;
    }

    struct Giver {
        address giverAddress;
        string giverName;
    }

    struct Taker {
        address takerAddress;
        string takerName;
        uint256 balance;
    }

    mapping(uint256 => Vehicle) vehicles;
    uint256 vehicleCount

    event VehicleAdded(uint256 indexed id, string make, string model, uint256 rentalPrice, address indexed giverAddress);
    event VehicleRemoved(uint256 indexed id, address indexed giverAddress);
    event VehicleRented(uint256 indexed id, address indexed takerAddress, uint256 rentalPrice);
    event VehicleReturned(uint256 indexed id, address indexed takerAddress);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "This function can only be performed by the owner");
        _;
    }

    function addVehicle(string memory _make, string memory _model, uint256 _rentalPrice) public {
        vehicles[vehicleCount] = Vehicle({
            make: _make,
            model: _model,
            rentalPrice: _rentalPrice,
            status: VehicleStatus.Available,
            giverAddress: msg.sender,
            takerAddress: address(0)
        });
        emit VehicleAdded(vehicleCount, _make, _model, _rentalPrice, msg.sender);
        vehicleCount++;
    }

    function getVehicle(uint256 _vehicleId) public view returns (string memory, string memory, uint256, VehicleStatus, address, address) {
        Vehicle storage vehicle = vehicles[_vehicleId];
        return (vehicle.make, vehicle.model, vehicle.rentalPrice, vehicle.status, vehicle.giverAddress, vehicle.takerAddress);
    }

    function removeVehicle(uint256 _id) public {
        require(_id < vehicleCount, "Vehicle not found");
        require(msg.sender == vehicles[_id].giverAddress, "Unauthorized");
        require(vehicles[_id].status == VehicleStatus.Available, "Vehicle is currently rented");

        delete vehicles[_id];
        emit VehicleRemoved(_id, msg.sender);
    }

    function rentVehicle(uint256 _id) public payable {
        require(_id < vehicleCount, "Vehicle not found");
        require(vehicles[_id].status == VehicleStatus.Available, "The vehicle is already being rented");
        require(msg.value >= vehicles[_id].rentalPrice, "Need more money");

        vehicles[_id].status = VehicleStatus.Occupied;
        vehicles[_id].takerAddress = msg.sender;
        payable(vehicles[_id].giverAddress).transfer(msg.value);

        emit VehicleRented(_id, msg.sender, msg.value);
    }

    function returnVehicle(uint256 _id) public {
        require(_id < vehicleCount, "Vehicle not found");
        require(vehicles[_id].status == VehicleStatus.Occupied, "The vehicle is not rented");
        require(msg.sender == vehicles[_id].takerAddress, "The vehicle is not with you");

        vehicles[_id].status = VehicleStatus.Available;
        vehicles[_id].takerAddress = address(0);

        emit VehicleReturned(_id, msg.sender);
    }

    function getVehicleCount() public view returns (uint256) {
        return vehicleCount;
    }
}
