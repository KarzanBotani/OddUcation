pragma solidity ^0.4.23;

library DataPackingLib {
    function getShift(uint256 index, uint256 size) private pure returns (uint256 _mask) {
        require(size*index < 256);
        return (uint256(1) << size*index);
    }

    function getMask(uint256 size) private pure returns (uint256 _mask) {
        require(size < 256);
        return ((uint256(1) << size) - 1);
    }

    function GetProperty(bytes32 dataRecord, uint256 mask, uint256 shift) private pure returns (uint256 property) {
        property = mask&(uint256(dataRecord)/shift);
    }

    function SetProperty(bytes32 dataRecord, uint256 mask, uint256 shift, uint256 value) private pure returns (bytes32 updated) {
        updated = bytes32((~(mask*shift) & uint256(dataRecord)) | ((value & mask) * shift));
    }

    function getData(bytes32 _data, uint256 _index, uint256 _size) internal pure returns (uint256) {
        return GetProperty(_data, getMask(_size), getShift(_index,1));
    }

    function setData(bytes32 _data, uint256 _value, uint256 _index, uint256 _size) internal pure returns (bytes32) {
        require(_value < 2**_size);
        return SetProperty(_data, getMask(_size), getShift(_index,1), _value);
    }
}