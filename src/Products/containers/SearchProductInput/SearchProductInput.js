import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../../Shared/components/Input';

const SearchProductInputPropTypes = {
  /**
   * Função para buscar produtos.
   */
  fetchProducts: PropTypes.func.isRequired
};

/**
 * Input de busca de produtos, faz chamada para api
 * no evento de mudança.
 */
class SearchProductInput extends React.Component {
  state = {
    value: ''
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({ value });
    this.props.fetchProducts({ query: value });
  };

  handleFocus = () => {
    this.props.focusSearchInput(true);
  };

  handleBlur = () => {
    this.props.focusSearchInput(false);
  };

  render() {
    const { loading, focus } = this.props;
    const { value } = this.state;

    return (
      <Input
        fullWidth
        label="Buscar por Nome ou SKU"
        loading={loading}
        onChange={this.handleChange}
        value={value}
        focus={focus}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }
}

SearchProductInput.propTypes = SearchProductInputPropTypes;

export default SearchProductInput;
