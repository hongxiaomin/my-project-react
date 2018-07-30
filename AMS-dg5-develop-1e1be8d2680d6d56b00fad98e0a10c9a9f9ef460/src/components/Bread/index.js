/**
fileName    : index.js
writer      : **Chao.Wang**
reviewers   : **Chao.Wang**
*/

import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import {
  propTypes,
  BREADMAP,
  defaultProps,
} from './props';
import './style.less';

const Bread = props => (
  <Breadcrumb style={{
        height: '40px',
        lineHeight: '40px',
        paddingLeft: '20px',
        marginBottom: '15px',
        backgroundColor: '#f9f6f6',
    }}
  >
    {
        props[BREADMAP].map((v, i) => {
            if (v) {
                return (
                  <Breadcrumb.Item key={i}>
                    {
                        v.path ? (<Link to={v.path}>{v.name}</Link>) : v.name
                    }
                  </Breadcrumb.Item>
                    );
                }
          })
      }
  </Breadcrumb>
);
Bread.defaultProps = defaultProps;
Bread.propTypes = propTypes;

export default Bread;
