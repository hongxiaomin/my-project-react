/**
fileName    : index.js
writer      : **Input your name here**
reviewers   : **Input reviewers here**
*/

import React from 'react';
import PropTypes from 'prop-types';
import ShowTime from '../../containers/ShowTimeContainer';
import './style.less';

const Title = (props) => {
  const { add } = props;
  const ShowTimeCom = add ? (<div className="LineChangeInformationShowTime">
    <ShowTime name="aaaaa" />
  </div>) : '';
  return (
    <div>
      <h3 className={'pageTitle'}>{props.name}
        { ShowTimeCom}
      </h3>
    </div>
  );
};
Title.defaultProps = {
  name: 'undefined',
};
Title.propTypes = {
  name: PropTypes.string,
};

export default Title;
