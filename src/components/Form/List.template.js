import {Form, Input, Button, Space} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {isEmpty, isEmptyArray, isEmptyObject, isEmptyString} from 'utils/functions.util';

const ListTemplate = props => {

    const icon = !isEmpty(props.icon) ? {suffix: props.icon} : {};
    const label = !isEmptyString(props.label) ? {label: props.label} : {};
    const type = !isEmptyString(props.type) ? {type: props.type} : {};
    const rules = !isEmptyArray(props.rules) ? {rules: props.rules} : {};
    const rulesList = props.rulesList ? [
        {
            validator: async (_, items) => {
                if (!items || items.length < props.rules.length) {
                    return Promise.reject(new Error(props.errorMessage));
                }
            }
        }
    ] : '';
    const dependencies = !isEmptyArray(props.dependencies) ? {dependencies: props.dependencies} : {};
    const defaultText = !isEmptyString(props.defaultText) ? {suffix: props.defaultText} : {};
    const disabled = props.disabled ? 'disabled' : '';

    return (
        <Form.List name={props.listName}
                   rules={rulesList}
        >
            {(fields, {add, remove}, {errors}) => (
                <>
                    {fields.map(({key, nature, fieldKey, name, ...restField}) => (
                        <Space key={key}  align="baseline">
                            <Form.Item
                                className="margin-remove-vertical form-builder form-builder-item"
                                name={[name, props.name]}
                                fieldKey={[fieldKey, props.fieldKey]}
                                {...rules}
                                hidden={props.hidden}
                                {...label}
                                {...dependencies}
                            >
                                <Input placeholder={props.placeholder} {...type}
                                       disabled={disabled} {...defaultText} {...icon} onKeyPress={props.onKeyPress}/>
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                    ))}
                    <Form.Item extra={props.extra}>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}  >
                            {props.name}
                        </Button>
                        <Form.ErrorList errors={errors}/>
                    </Form.Item>
                </>
            )}
        </Form.List>

    );
};

export {ListTemplate};