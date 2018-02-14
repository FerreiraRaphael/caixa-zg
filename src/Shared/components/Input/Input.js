import React from "react";
import PropTypes from "prop-types";
import {
  Input,
  FormControl,
  InputLabel,
  IconButton,
  CircularProgress
} from "material-ui";
import { Search } from "material-ui-icons";

const CommonInputPropTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  autoFocus: PropTypes.bool,
  loading: PropTypes.bool
};

const CommonInputDefaultProps = {
  fullWidth: false,
  autoFocus: false,
  loading: false
};

class CommonInput extends React.Component {
  componentDidMount() {
    const { focus } = this.props;
    console.log("didmount", focus);
    if (focus) {
      this.input.focus();
    }
  }

  componentWillReceiveProps(newProps) {
    const { focus } = newProps;
    console.log("newprops", focus);
    if (focus) {
      this.input.focus();
    }
  }

  render() {
    const {
      label,
      fullWidth,
      autoFocus,
      loading,
      onChange,
      onBlur,
      onFocus,
      value
    } = this.props;
    return (
      <FormControl fullWidth={fullWidth}>
        <InputLabel>{label}</InputLabel>
        <Input
          onBlur={onBlur}
          onFocus={onFocus}
          inputRef={input => {
            this.input = input;
          }}
          autoFocus={autoFocus}
          endAdornment={
            <IconButton>
              {loading ? (
                <CircularProgress tabIndex={-1} />
              ) : (
                <Search tabIndex={-1} />
              )}
            </IconButton>
          }
          value={value}
          onChange={onChange}
        />
      </FormControl>
    );
  }
}
CommonInput.propTypes = CommonInputPropTypes;

CommonInput.defaultProps = CommonInputDefaultProps;

export default CommonInput;
