import React from 'react';
import PropTypes from 'prop-types';
import { List as LIST } from 'material-ui';

import ListItem from './ListItem';

const List = ({
  items,
  selectedIndex,
  onKeyPress,
  onAdd,
  onDelete,
  onRemove
}) => (
  <LIST style={{ overflow: `auto` }} onKeyUp={onKeyPress}>
    {items.map((item, i) => (
      <ListItem
        key={item._id || item.name}
        {...item}
        highLight={+selectedIndex === +i}
        onAdd={onAdd}
        onDelete={onDelete}
        onRemove={onRemove}
      />
    ))}
  </LIST>
);

export default List;
