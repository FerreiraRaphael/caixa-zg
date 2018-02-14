import App from './App';
import { connect } from "react-redux";

import { focusSearchInput } from "../../modules/app";

export default connect(
    () => ({}),
    dispatch => ({
      focus: () => dispatch(focusSearchInput(true))
    })
  )(App);