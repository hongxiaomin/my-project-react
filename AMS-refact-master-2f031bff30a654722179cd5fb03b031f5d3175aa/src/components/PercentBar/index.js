import React from 'react';
import PropTypes from 'prop-types';
import './style.less';


const PercentBar = (props) => {
  const percent = props.percent;
  return (
    <div className="precentBarWrap">
      <div className="precentBarBG" >
        <div className="precentBarLength" style={{ width: percent }} />
      </div>
      <span className="precentBarrate">{`${percent}%`}</span>
    </div>
  );
};
PercentBar.defaultProps = {

};
PercentBar.propTypes = {
  percent: PropTypes.number,
};

export default PercentBar;
