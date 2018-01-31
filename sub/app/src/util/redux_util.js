import { connect } from 'react-redux';

/**
 * Redux utils.
 */
export class ReduxUtil {

  /**
   * Wraps Redux connect method to make inline functions self-documenting (like GraphQL).
   * https://github.com/reactjs/react-redux/blob/master/docs/api.md
   * @param {{ mapStateToProps, mapDispatchToProps, mergeProps, options }} obj
   */
  static connect(obj) {
    let {
      // (state, ownProps) => {}
      mapStateToProps,

      // (dispatch, ownProps) => {}
      mapDispatchToProps,

      // (stateProps, dispatchProps, ownProps) => {}
      mergeProps,

      // { pure: true }
      options
    } = obj;

    return connect.call(null, mapStateToProps, mapDispatchToProps, mergeProps, options);
  }
}