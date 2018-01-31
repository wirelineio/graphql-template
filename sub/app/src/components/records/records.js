//
// Copyright 2018 Wireline, Inc.
//

import React from 'react';
import PropTypes from 'prop-types';
import s from './records.css';

/**
 * Home
*/

class Records extends React.Component {
  static propTypes = {
    records: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    ),
  }

  constructor(){
    super(...arguments);
  }

  render() {

    if (this.props.records){

      // found records
      return (
        <div className={s.root}>
        	{
            this.props.records.map( (record, index) => {
              return(<div key={index}>{record.title}</div>)
            })
          }
        </div>
      );
    } else {

      // no records supplied to properties
      return (
        <div>
          no records
        </div>
      )
    }
  }
}

export default Records;