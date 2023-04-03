import {Form, Select,Checkbox} from 'antd';
import {
    isEmpty,
    isEmptyArray,
    isEmptyString,
} from 'utils/functions.util';


import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";





const CheckBoxGroupInputTemplate = props => {
    const label = !isEmptyString(props.label) ? {label: props.label} : {};
    const disabled =props.disabled ? 'disabled' : '';
    // const options = !isEmptyArray(props.options) ? props.options : [];
    const [options,setOptions]=useState(!isEmptyArray(props.options) ? props.options : []);
    // const defaultValue = options.find(option => option.isDefault);
    const {width = '100%'} = props;
    const dispatch = useDispatch();
    const [value,setValue]=useState('');
    const [loading, setLoading] = useState(false);
    const icon = !isEmpty(props.icon) ? {suffix: props.icon} : {};


    useEffect(
        () => {
            if (!isEmptyArray(props.options)) {
                setOptions(props.options)
                return
            }
            (async () => {
                await fetchApi();
            })();
        }

        ,
        []
    )


    ;

    const fetchApi = async (firstLoad = true, preLocation = null) => {
        setLoading(true)
        try {
            const result = await dispatch(props.api());
            setOptions(result)
            props.onOptionsUpdated(props.name,result)
        } catch (e) {
        } finally {
            setLoading(false)
        }
    };

    const changeValue = (target)=>{
        setValue(target.value)
        props.onSelectChange(target.value)
    }

    return (
        <Form.Item className="margin-remove-vertical form-builder form-builder-item" name={props.name}  {...label}  rules={props.rules}>

            <Checkbox.Group onChange={props.onChange}   >
                {
                    options.map(option => (
                        <Checkbox   style={{width}} value={option.value} >{option.label}</Checkbox>
                    ))
                }
            </Checkbox.Group>
        </Form.Item>
    );
};

export {CheckBoxGroupInputTemplate};