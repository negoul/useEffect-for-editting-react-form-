import {Form, Input} from 'antd';
import {isEmpty, isEmptyArray, isEmptyObject, isEmptyString} from 'utils/functions.util';

const InputTemplate = props => {

  const icon = !isEmpty(props.icon) ? {suffix: props.icon} : {};
  const label = !isEmptyString(props.label) ? {label: props.label} : {};
  const type = !isEmptyString(props.type) ? {type: props.type} : {};
  const rules = !isEmptyArray(props.rules) ? {rules: props.rules} : {};
  const dependencies = !isEmptyArray(props.dependencies) ? {dependencies: props.dependencies} : {};
  const defaultText = !isEmptyString(props.defaultText) ? {suffix: props.defaultText} : {};
  const disabled =props.disabled ? 'disabled' : '';


  return (
    <Form.Item className="margin-remove-vertical form-builder form-builder-item" name={props.name}  extra={props.extra} {...rules}  hidden={props.hidden} {...label} {...dependencies} >
      <Input placeholder={props.placeholder} {...type} disabled={disabled} {...defaultText} {...icon} onKeyPress={props.onKeyPress} onBlur={props.onBlur} />
    </Form.Item>
  );
};

export {InputTemplate};