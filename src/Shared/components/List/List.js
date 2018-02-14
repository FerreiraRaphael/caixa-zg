import React from "react";
import PropTypes from "prop-types";
import { List as LIST } from "material-ui";

import ListItem from "./ListItem";

const List = ({ items, selectedIndex, onKeyPress }) => (
  <LIST onKeyUp={onKeyPress}>
    {items.map((item, i) => (
      <ListItem
        key={item._id || item.name}
        {...item}
        highLight={+selectedIndex === +i}
      />
    ))}
  </LIST>
);

export default List;
