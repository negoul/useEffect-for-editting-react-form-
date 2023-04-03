import PropTypes from 'prop-types';
import {UserOutlined} from '@ant-design/icons';

export const DEFAULT_PROPS = {
  actions: [],
  avatarIcon: <UserOutlined />,
  configs: [],
  item: {},
  reactKey: 'id',
};

export const PROP_TYPES = {
  actions: PropTypes.array,
  avatarIcon: PropTypes.element,
  configs: PropTypes.array,
  item: PropTypes.object,
  reactKey: PropTypes.string,
  onSelect: PropTypes.func,
  onAction: PropTypes.func
};