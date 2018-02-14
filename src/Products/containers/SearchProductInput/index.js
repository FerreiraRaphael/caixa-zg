import { connect } from "react-redux";

import SearchProductInput from "./SearchProductInput";
import { fetchProducts } from "../../modules/products";
import { focusSearchInput } from "../../../Shared/modules/app";

const mapStateToProps = state => {
  return {
    loading: state.products.fetching,
    focus: state.app.searchInputFocus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    focusSearchInput: toggle => {
      dispatch(focusSearchInput(toggle));
    },
    fetchProducts: filter => {
      dispatch(fetchProducts(filter));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProductInput);
