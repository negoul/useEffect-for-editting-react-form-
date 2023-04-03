import {Form, Input,Col} from 'antd';
import {isEmpty, isEmptyArray, isEmptyObject, isEmptyString} from 'utils/functions.util';
import NumberInputTemplate from "./NumberInput.template";

const NumberInput = props => {

    const icon = !isEmpty(props.icon) ? {suffix: props.icon} : {};
  /*  const maxLen =!isEmpty(props.maxLength) ? {maxLenght: props.maxLenght} : {}*/
    const label = !isEmptyString(props.label) ? {label: props.label} : {};
    const type = !isEmptyString(props.type) ? {type: props.type} : {};
    const rules = !isEmptyArray(props.rules) ? {rules: props.rules} : {};
    const dependencies = !isEmptyArray(props.dependencies) ? {dependencies: props.dependencies} : {};
    const defaultText = !isEmptyString(props.defaultText) ? {suffix: props.defaultText} : {};
    /*  const disabled =!isEmptyString(props.disabled) ? 'disabled' : '';*/
    const disabled =props.disabled ? 'disabled' : '';
    // const dir = isEmptyString(props.type) || props.type === 'text' ? {dir: 'rtl'} : {dir: 'ltr'};
    const {width =150} = props;
    const {span = 6} = props


    return (
        <Col span={{span}} style={{padding:'4px 12px'}}>
        <Form.Item className="margin-remove-vertical" name={props.name}  extra={props.extra} {...rules}  hidden={props.hidden} {...label} {...dependencies} >
            <NumberInputTemplate placeholder={props.placeholder} {...type} disabled={disabled} defaultText={defaultText} {...icon} onKeyPress={props.onKeyPress} maxLength={props.maxLength}  style={{width}} />
        </Form.Item>
        </Col>
    );
};

export {NumberInput};