import {Form, Select,Col} from 'antd';
import {
    isEmpty,
    isEmptyArray,
    isEmptyString,
} from 'utils/functions.util';


import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

const {Option} = Select;


const SelectSearchTemplate = props => {
    const label = !isEmptyString(props.label) ? {label: props.label} : {};
    const disabled =props.disabled ? 'disabled' :'';
    // const options = !isEmptyArray(props.options) ? props.options : [];
    const [options,setOptions]=useState(!isEmptyArray(props.options) ? props.options : []);
    const {width = 150} = props;
    const {span = 6} = props
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

        setValue(target?.value)
        props.onSelectSearchChange(target?.value)
    }

    return (
        <Col  span={{span}} style={{padding:'4px 12px'}}>
        <Form.Item className="margin-remove-vertical " name={props.name} rules={props.rules}  extra={props.extra} {...label}>

            <Select
                allowClear
                showSearch
                style={{width}}
                onChange={changeValue}
                placeholder={props.placeholder}
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                disabled={disabled}
            >
                {
                    options.map(option => (
                        <Option value={option.value}  >{option.label}</Option>
                    ))
                }
            </Select>
        </Form.Item>
        </Col>
    );
};

export {SelectSearchTemplate};