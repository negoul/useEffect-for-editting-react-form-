import {useEffect, useRef, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import moment from 'moment-jalaali';
import {FIELD_TYPE} from 'config/action-bar.config';
import {objectPropsCount,
    parseQuery
} from 'utils/functions.util';
import {FormTemplate} from './Form.template';
import {AmountInput} from "./AmountInput/AmountInput";
import {CheckBoxGroupInputTemplate} from './CheckBoxGroupInput.template'
import {DateTemplate} from './Date.template'
import {InputTemplate} from './Input.template';
import {InputTextAreaTemplate} from "./InputTextArea.template";
import {InputPasswordTemplate} from "./PasswordInput.template";
import {ListTemplate} from "./List.template";
import {NumberInput} from "./NumberInput/NumberInput";
import {SelectTemplate} from './Select.template';
import {SelectSearchTemplate} from "./SelectSearch.template";
import {NumberInputAntdTemplate} from "./NumberInputAntd.template";
import {TagTemplate} from "./Tag.template";
import {RadioGroupInputTemplate} from "./RadioGroupInput.template";


import dayjs from "dayjs";


const FormComponent = props => {
    /*  const [isOpen, setIsOpen] = useState(false);*/
    const [data, setData] = useState([])
    const [configs, setConfigs] = useState([])
    const formRef = useRef();
    const {search: query, pathname} = useLocation();


    useEffect(() => formRef.current.resetFields(), [props.initialValues]);


    useEffect(() => {
        setConfigs(props.configs)
    }, [props.configs]);


    const renderForm = () => {
        return configs.map(item => {
            switch (item.inputType) {
                case FIELD_TYPE.TEXT:
                    return <InputTemplate key={item.name} value {...item} onKeyPress={handleKeyPress} onBlur={item.onBlur}/>;
                case FIELD_TYPE.TEXTAREA:
                    return <InputTextAreaTemplate key={item.name} {...item} onKeyPress={handleKeyPress}/>;
                case FIELD_TYPE.NUMBER:
                    return <InputTemplate key={item.name} {...item} type="tel" onKeyPress={handleKeyPress}/>;
                case FIELD_TYPE.NUMERIC:
                    return <NumberInput key={item.name} {...item} type='text' onKeyPress={handleKeyPress}/>;
                case FIELD_TYPE.NUMBERANTD:
                    return <NumberInputAntdTemplate key={item.name} {...item} type='number' onKeyPress={handleKeyPress} />;
                case FIELD_TYPE.AMOUNT:
                    return <AmountInput key={item.name} {...item} type='text' onKeyPress={handleKeyPress}/>;
                case FIELD_TYPE.PASSWORD:
                    return <InputPasswordTemplate key={item.name} {...item} onKeyPress={handleKeyPress}/>;
                case FIELD_TYPE.SELECT:
                    return <SelectTemplate key={item.name} {...item} onSelectChange={handleChange}/>;
                case FIELD_TYPE.SELECTSEARCH:
                    return <SelectSearchTemplate key={item.name} {...item} onSelectChange={handleChange}/>;
                case FIELD_TYPE.TAG:
                    return <TagTemplate key={item.name} {...item} onSelectChange={handleChange}/>;
                case FIELD_TYPE.CHECKBOXGROUP:
                    return <CheckBoxGroupInputTemplate key={item.name} {...item} onDateChange={handleChange}/>;
                case FIELD_TYPE.RADIO:
                    return <RadioGroupInputTemplate key={item.name} {...item} onSelectChange={handleChange}/>;
                case FIELD_TYPE.LIST:
                    return <ListTemplate key={item.name} {...item} onDateChange={handleChange}/>;
                case FIELD_TYPE.DATE:
                    return <DateTemplate key={item.name} {...item} onDateChange={handleChange}/>;
                case FIELD_TYPE.HIDDEN:
                    return <InputTemplate key={item.name} hidden={true} {...item} />;
                default:
                    return null;
            }
        });
    };

    const handleKeyPress = ({code}) => {
        if (code !== 'Enter') return;
        formRef.current.submit();
    };

    const handleChange = () => {
        console.log('done!')
        /*formRef.current.submit();*/
    };

    const handleSubmit = e => {
        const flatted = Object.keys(e).reduce((p, current) => {

            const foundedConfig = configs.find(config => config.name === current);
            if (foundedConfig.inputType === FIELD_TYPE.SELECT) {
                if (!e[current]) p[current] = undefined;
                else {
                    p[current] = e[current].value === 0 ? e[current].value.toString() : (e[current].value || e[current]);
                }
            } else if (foundedConfig.inputType === FIELD_TYPE.SELECTSEARCH) {
                if (!e[current]) p[current] = undefined;
                else {
                    p[current] = e[current].value === 0 ? e[current].value.toString() : (e[current].value || e[current]);
                }
            } else if (foundedConfig.inputType === FIELD_TYPE.DATE) {
                /*   p[current] = e[current] ? moment(e[current].$d).unix(): undefined;*/
                /*  p[current] = e[current] ? (moment(e[current].$d).unix()) * 1000 : undefined;*/
                const date = dayjs(e[current]).locale('en').format('YYYY-MM-DD');
                const newDate = moment(date, 'jYYYY-jMM-jDD').locale('en').format('YYYY-MM-DD')
                p[current] = e[current] ? (dayjs(newDate).unix()) * 1000 : undefined;
            } else if (foundedConfig.inputType === FIELD_TYPE.AMOUNT) {
                p[current] = e[current]?.toString().replace(/,/g, "");
                /*  p[current] = e[current].replace(/,/g, "");*/
            }
            else if (foundedConfig.inputType === FIELD_TYPE.TAG) {
                if (!e[current]) {
                    p[current] = [];
                } else {
                    p[current] = e[current].map(it => it.value ? it.value : it);
                }
            }

            else {
                p[current] = e[current];
            }
            return p;
        }, {});
        props.submit(flatted)
    };


    const handleClearFilters = () => {
        formRef.current.resetFields();
        handleSubmit({});
    };

    return (
        <FormTemplate
            {...props}
            formRef={formRef}
            configs={configs}
            filterCount={objectPropsCount(parseQuery(query))}
            renderForm={renderForm}
            tags={parseQuery(decodeURI(query))}
            onClearFilter={handleClearFilters}
            onSubmit={handleSubmit}
            initialValues={props.initialValues}
        />
    );
};

export {FormComponent};


