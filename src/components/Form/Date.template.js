import moment from 'moment';
import {ConfigProvider, Form} from 'antd';
import {DatePicker} from 'antd-jalali';
import fa_IR from 'antd/lib/locale/fa_IR';
import {isEmptyArray, isEmptyString} from 'utils/functions.util';

const DateTemplate = props => {
    const label = !isEmptyString(props.label) ? {label: props.label} : {};
    const options = !isEmptyArray(props.options) ? props.options : [];
    const rules = !isEmptyArray(props.rules) ? {rules: props.rules} : {};
    const defaultValue = options.find(option => option.isDefault);
    const {width = '100%'} = props;


    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <Form.Item className="margin-remove-vertical form-builder form-builder-item"
                       name={props.name} {...label} {...rules} >
                <DatePicker
                    inputReadOnly={true}
                    style={{width}}
                    format="YYYY/MM/DD"
                    // defaultValue={moment('1394/12/01', 'jYYYY/jMM/jDD')}
                    // value={moment('1394/12/01', 'jYYYY/jMM/jDD')}
                    onChange={props.onDateChange}
                    bordered={true}
                    placeholder={props.placeholder}
                />
            </Form.Item>
        </ConfigProvider>
    );
};

export {DateTemplate};