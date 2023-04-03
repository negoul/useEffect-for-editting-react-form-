import {Form, InputNumber} from 'antd';
import {isEmpty, isEmptyArray, isEmptyObject, isEmptyString} from 'utils/functions.util';

const NumberInputAntdTemplate = props => {


  /*console.log('tt',props,props.rules,Array.isArray(props.rules),Array.isArray(props.dependencies))*/
  const icon = !isEmpty(props.icon) ? {suffix: props.icon} : {};
  const label = !isEmptyString(props.label) ? {label: props.label} : {};
  const type = !isEmptyString(props.type) ? {type: props.type} : {};
  const rules = !isEmptyArray(props.rules) ? {rules: props.rules} : {};
  const dependencies = !isEmptyArray(props.dependencies) ? {dependencies: props.dependencies} : {};
  const defaultText = !isEmptyString(props.defaultText) ? {suffix: props.defaultText} : {};
/*  const disabled =!isEmptyString(props.disabled) ? 'disabled' : '';*/
  const disabled =props.disabled ? 'disabled' : '';
  const {width = '100%'} = props;
  // const dir = isEmptyString(props.type) || props.type === 'text' ? {dir: 'rtl'} : {dir: 'ltr'};


  return (
    <Form.Item className="margin-remove-vertical form-builder form-builder-item" name={props.name}  extra={props.extra} {...rules}  hidden={props.hidden} {...label} {...dependencies} >
      <InputNumber style={{width}}  placeholder={props.placeholder} {...type} disabled={disabled} {...defaultText} {...icon} onKeyPress={props.onKeyPress} min={props.min}  max={props.max}/>
    </Form.Item>
  );
};

export {NumberInputAntdTemplate};