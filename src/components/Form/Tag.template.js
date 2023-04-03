import {Form, Select} from 'antd';
import {
    isEmpty,
    isEmptyArray,
    isEmptyString,

} from 'utils/functions.util';


import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";


const {Option} = Select;


const TagTemplate = props => {
    const label = !isEmptyString(props.label) ? {label: props.label} : {};
    const disabled =props.disabled ? 'disabled' : '';
    const {width = '100%'} = props;
    const dispatch = useDispatch();
    const [value,setValue]=useState('');
    const [loading, setLoading] = useState(false);
    const icon = !isEmpty(props.icon) ? {suffix: props.icon} : {};





    const changeValue = (target)=>{
        setValue(target.value)
        props.onSelectChange(target.value)
    }

    return (
        <Form.Item className="margin-remove-vertical form-builder form-builder-item" name={props.name} rules={props.rules}   extra={props.extra} {...label}>
            <Select
                style={{width}}
                mode="tags"
                open={false}
                labelInValue
                value={value}
                onChange={changeValue}
                placeholder={props.placeholder}
                {...icon}
                disabled={disabled}
           />
        </Form.Item>
    );
};

export {TagTemplate};