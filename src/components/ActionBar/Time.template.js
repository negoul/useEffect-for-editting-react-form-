import moment from 'moment';
import {ConfigProvider, Form,Col} from 'antd';
import {DatePicker,TimePicker} from 'antd-jalali';
import fa_IR from 'antd/lib/locale/fa_IR';
import {isEmptyArray, isEmptyString} from 'utils/functions.util';

const TimeTemplate = props => {
    const label = !isEmptyString(props.label) ? {label: props.label} : {};
    const options = !isEmptyArray(props.options) ? props.options : [];
    const rules = !isEmptyArray(props.rules) ?{ rules: props.rules}: {};
   /* const defaultValue = options.find(option => option.isDefault);*/
    const {width = 150} = props;

    return (
            <Col span={6} style={{padding:'4px 12px'}}>
                <Form.Item className="margin-remove-vertical" name={props.name} {...label} {...rules} >
                    <TimePicker
                     /*  defaultValue={moment(props.defaultValue, 'HH:mm:ss')}*/
                        onChange={props.onTimeChange}
                        bordered={true}
                        inputReadOnly={true}
                        style={{width}}
                        placeholder={props.placeholder}
                    />

                </Form.Item>
            </Col>
    );
};

export {TimeTemplate};