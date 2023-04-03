import {Form, Input, Tooltip, Col, ConfigProvider} from 'antd';
import {isEmpty, isEmptyArray, isEmptyObject, isEmptyString} from 'utils/functions.util';

const InputTemplate = props => {
  const icon = !isEmpty(props.icon) ? {suffix: props.icon} : {};
  const label = !isEmptyString(props.label) ? {label: props.label} : {};
  const type = !isEmptyString(props.type) ? {type: props.type} : {};
  const rules = !isEmptyArray(props.rules) ? {rules: props.rules} : {};
 /* const width = !isEmptyString(props.width) ? {width: props.width} : {width:100};*/
  const dependencies = !isEmptyArray(props.dependencies) ? {dependencies: props.dependencies} : {};
    const {width =150} = props;
    const {span = 6} = props




  return (
      <Col span={{span}} style={{padding:'4px 12px'}}>
        <Form.Item className="margin-remove-vertical  " name={props.name}  {...rules}  hidden={props.hidden} {...label} {...dependencies} >
          {/* <Tooltip title={props.placeholder}>*/}
          <Input placeholder={props.placeholder} {...type} {...icon} onKeyPress={props.onKeyPress}    style={{width}} />
          {/*  </Tooltip>*/}
        </Form.Item>
      </Col>
  );
};

export {InputTemplate};