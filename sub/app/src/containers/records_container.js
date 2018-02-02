//
// Copyright 2018 Wireline, Inc.
//

import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import Records from '../components/records';

const queryRecords = gql`
  {
    records {
      title
    }
  }
`;

const RecordsContainer = compose(
  graphql(queryRecords, {
    options: (props) => {
      let { records } = props;
      return {
        records
      };
    },
    props: ({ ownProps, data }) => {
      // let { domain } = ownProps; // not used in this example
      let { errors, loading, refetch } = data;
      let { records } = data;

      // TODO(burdon): Util to wrap standard data params.
      return {
        errors, loading, refetch, records
      }
    },
  })
)(Records);

export default RecordsContainer;