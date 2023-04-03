import {isFunction} from 'utils/functions.util';
import {DEFAULT_PROPS, PROP_TYPES} from './ListItem.config';
import {ListItemTemplate} from './ListItem.template';

const ListItem = props => {
  const handleActionClick = (e, action, item) => {
    e.stopPropagation();
    isFunction(props.onAction) && props.onAction(action, item);
  };

  const handleSelect = (e, action) => {
    isFunction(props.onSelect) && props.onSelect(action);
  };

  return (
    <ListItemTemplate
      {...props}
      onActionClick={handleActionClick}
      onSelect={handleSelect}
    />
  );
};

ListItem.defaultProps = DEFAULT_PROPS;
ListItem.propTypes = PROP_TYPES;
export {ListItem};