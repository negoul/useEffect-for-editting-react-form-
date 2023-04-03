import {Avatar, Button, Col, List, Row} from 'antd';
import authStatusMap from 'asset/data/card-issue-status';
import {getAvatar, isEmptyArray, isEmptyObject, isEmptyString, timeAgo} from 'utils/functions.util';
import style from './ListItem.module.scss';

const ListItemTemplate = props => {
  const {actions, avatarIcon, configs, item, reactKey, isSelected} = props;
  if (isEmptyObject(item)) return null;

  return (
    <List.Item className={isSelected ? 'selected-item' : ''}>
      <Row className={`${style.row} flex-1 padding-horizontal-20`} onClick={e => props.onSelect(e, item)}>
        {
          configs.map(config => {
            const avatar = !isEmptyString(config.avatarKey) ?
              {avatar: <Avatar size="small" src={getAvatar(item[config.avatarKey])} icon={avatarIcon} />} : {};
            return (
              <Col key={`${config.key}-${item[reactKey]}-column`} span={config.span}>
                {
                  config.isMain ? (
                    <List.Item.Meta
                      className={config.isLTR ? 'ltr' : ''}
                      {...avatar}
                      title={item[config.titleKey]}
                      description={config.descriptionKey === 'status' ? authStatusMap[item[config.descriptionKey]] : item[config.descriptionKey]}
                    />
                  ) : (
                    <div className={`flex-column padding-horizontal-4 ${config.isLTR ? 'direction-ltr' : ''}`}>
                      <span className="text-small text-muted margin-bottom-8">{config.label}</span>
                      <span className="!font-medium text-dark text-ellipsis">{config.isTime ? timeAgo(item[config.key]) : item[config.key]}</span>
                    </div>
                  )
                }
              </Col>
            )
          })
        }
        {
          !isEmptyArray(actions) && (
            <div className={`${style.actions} position-absolute top-0 left-0 bottom-0 flex-center-vertical padding-right-68`}>
              {
                actions.map(action => (
                  <Button key={`${action.name}-${item[reactKey]}-action`} type="text" onClick={e => props.onActionClick(e, action, item)}>
                    {action.icon}
                  </Button>
                ))
              }
            </div>
          )
        }
      </Row>
    </List.Item>
  );
};

export {ListItemTemplate};