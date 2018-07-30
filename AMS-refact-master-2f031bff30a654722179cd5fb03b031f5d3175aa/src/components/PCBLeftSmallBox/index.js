import React from 'react';

const PCBSmallBox = (props) => {
  const lightSerial = props.lightSerial ? props.lightSerial : '';
  const lightStatus = props.lightStatus ? props.lightStatus : '';
  if (lightSerial) {
    if (lightStatus === '') {
      return (
        <p>{props.value}<span className="GreenCircle" /></p>
      );
    } else if (lightStatus === 1) {
      return (
        <p>{props.value}<span className="circle" /></p>
      );
    }
  } else if (!lightSerial) {
    return (
      <p>{props.value}</p>
    );
  }
  return null;
};

export default PCBSmallBox;
