import React from "react";

import List from "../../Shared/components/List";
import { connect } from "react-redux";

class ProductsList extends React.Component {
  state = {
    cursor: 0
  };

  handleKeyPress = e => {
    const { cursor, result } = this.state;
    const { items } = this.props;
    // arrow up/down button should select next/previous list element
    if (e.key === `ArrowUp` && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    } else if (e.key === `ArrowDown` && cursor < items.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    }
  };

  render() {
    const { items } = this.props;
    return (
      <List
        onKeyPress={this.handleKeyPress}
        selectedIndex={this.state.cursor}
        items={items}
      />
    );
  }
}

const mapStateToProps = state => ({
  items: state.products.items
});

export default connect(mapStateToProps)(ProductsList);
