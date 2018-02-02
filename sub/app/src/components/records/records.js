//
// Copyright 2018 Wireline, Inc.
//

import React from 'react';
import PropTypes from 'prop-types';

import s from './records.less';

/**
 * Records
*/
class Records extends React.Component {
  
  static propTypes = {
    records: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    ),
  }

  render() {

    let { records } = this.props;
    let recordItems = [];
    
    if (records) 
      recordItems = records.map((record) => (
        record.title
      ));

    return (
      <div>
        { recordItems.length &&
           <div>{ recordItems }</div>
          ||
          "Empty"
        }
      </div>
    );
  }
}

export default Records;