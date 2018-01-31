
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Records from '../components/records';

// TODO(burdon): Factor out query.
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
      let { domain } = ownProps;
      let { errors, loading, refetch } = data;
      let { records } = data;

      // TODO(burdon): Util to wrap standard data params.
      return {
        errors, loading, refetch, records, domain
      }
    },
  })
)(Records);

export default RecordsContainer;