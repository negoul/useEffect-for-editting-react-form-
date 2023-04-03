import {useEffect, useRef, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import moment from 'moment-jalaali';
import {FIELD_TYPE, FILTER_ALL_KEY} from 'config/action-bar.config';
import setState from 'hook/setState.hook';
import {
    createFilterQueryString,
    deleteObjectField, isEmptyArray, errorToast,
    isEmptyObject, isNumber, isString, isUndefined,
    objectPropsCount,
    parseQuery, queryParameterToObject
} from 'utils/functions.util';
import {ActionBarTemplate} from './ActionBar.template';
import {Test} from './test';
import {DateTemplate} from './Date.template';
import {InputTemplate} from './Input.template';
import {SelectTemplate} from './Select.template';
import {SelectSearchTemplate} from './SelectSearch.template';
import dayjs from "dayjs";
import moment2, {isMoment} from "moment";
import 'dayjs/locale/fa'
import {TimeTemplate} from "./Time.template";
import {NumberInput} from "./NumberInput/NumberInput";


dayjs.calendar('jalali');


const ActionBar = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [configs, setConfigs, getConfigs] = setState([])
    const formRef = useRef();
    const navigate = useNavigate();
    const {search: query, pathname} = useLocation();

    useEffect(async () => {
        !query && await setInitialDate()
    }, []);

    const setInitialDate = async () => {
        const filter = props.configs.filter(it => 'value' in it)
        const query = filter.reduce((p, current, currentIndex) => {
            if (filter.length - 1 === currentIndex) {
                return p + `${current.name}=${current.value}`
            }
            return p + `${current.name}=${current.value}&`
        }, '')
        navigate(`${pathname}?${query}`, {replace: true});
    }


    useEffect(async () => {
        await setConfigs(props.configs);
        await setFormValues()
        // setTimeout(() => setFormValues(), 500);
    }, [props.configs]);


    useEffect(async () => {
        !query && formRef.current.resetFields();
    }, [query]);


    const setFormValues = async () => {
        const configs = await getConfigs();
        if (isEmptyArray(configs)) return;
        const parsedQuery = parseQuery(decodeURI(query));
        const mappedTags = Object.keys(parsedQuery).reduce((p, current) => {
            const foundedConfig = configs.find(config => config.name === current);
            if (foundedConfig && foundedConfig.inputType === FIELD_TYPE.SELECT) {
                /* setTimeout(() => {
                     console.log('nnn negin1', current, foundedConfig,foundedConfig.name,foundedConfig.options, isEmptyArray(foundedConfig.options))
                 }, 100)*/
                if (isEmptyArray(foundedConfig.options)) {
                    p[current] = {name: current, value: ''};
                } else {
                    const selectedOption = foundedConfig.options.find(option => option.value.toString() === parsedQuery[current])
                    if (foundedConfig.hasAllOption) {
                        p[current] = selectedOption ? {
                            label: selectedOption.label,
                            value: selectedOption.value
                        } : {label: 'همه', value: FILTER_ALL_KEY}
                    } else {
                        const selectedOption = foundedConfig.options.find(option => option.value.toString() === parsedQuery[current]);
                        /*   p[current] = selectedOption ? {name: current, value: selectedOption.value} :*/
                        p[current] = selectedOption ? {label: selectedOption.label, value: selectedOption.value} : {
                            name: current,
                            value: ''
                        };
                    }

                }

            } else if (foundedConfig && foundedConfig.inputType === FIELD_TYPE.SELECTSEARCH) {

                if (isEmptyArray(foundedConfig.options)) {
                    p[current] = {name: current, value: ''};
                } else {
                    const selectedOption = foundedConfig.options.find(option => option.value.toString() === parsedQuery[current])
                    if (foundedConfig.hasAllOption) {
                        p[current] = selectedOption ? {
                            label: selectedOption.label,
                            value: selectedOption.value
                        } : {label: 'همه', value: FILTER_ALL_KEY}
                    } else {
                        const selectedOption = foundedConfig.options.find(option => option.value.toString() === parsedQuery[current]);
                        /*   p[current] = selectedOption ? {name: current, value: selectedOption.value} :*/
                        p[current] = selectedOption ? {label: selectedOption.label, value: selectedOption.value} : {
                            name: current,
                            value: ''
                        };
                    }

                }

            } else if (foundedConfig && foundedConfig.inputType === FIELD_TYPE.DATE) {
                const date = moment(+parsedQuery[current]).locale('en').format('jYYYY/jMM/jDD');
                p[current] = date ? dayjs(date, {jalali: true}).locale('fa') : '';
                /*     p[current] = date ? date : '';*/
            } else if (foundedConfig && foundedConfig.inputType === FIELD_TYPE.TIME) {
                p[current] = parsedQuery[current] ? moment(parsedQuery[current], 'HH:mm:ss') : '';
            } else {
                p[current] = parsedQuery[current];
            }
            return p;
        }, {});
        formRef.current.setFieldsValue(mappedTags);
    };

    const handleFilterBarToggled = () => {
        setIsOpen(!isOpen);
    };

    const renderForm = () => {
        return configs.map(item => {
            switch (item.inputType) {
                case FIELD_TYPE.TEXT:
                    return <InputTemplate key={item.name} {...item} onKeyPress={handleKeyPress}/>;
                case FIELD_TYPE.NUMBER:
                    return <InputTemplate key={item.name} {...item} type="tel" onKeyPress={handleKeyPress}/>;
                case FIELD_TYPE.NUMERIC:
                    return <NumberInput key={item.name} {...item} type='text' onKeyPress={handleKeyPress}/>;
                case FIELD_TYPE.SELECT:
                    return <SelectTemplate key={item.name} {...item} onOptionsUpdated={handleOptionUpdate} onSelectChange={handleChange}/>;
                case FIELD_TYPE.SELECTSEARCH:
                    return <SelectSearchTemplate key={item.name} {...item} onOptionsUpdated={handleOptionUpdate} onSelectSearchChange={handleSelectSearch}/>;
                case FIELD_TYPE.DATE:
                    return <DateTemplate key={item.name} {...item} onDateChange={handleChange}/>;
                case FIELD_TYPE.TIME:
                    return <TimeTemplate key={item.name} {...item} onTimeChange={handleChange}/>;
                case FIELD_TYPE.HIDDEN:
                    return <InputTemplate key={item.name} hidden={true}  {...item} />;
                default:
                    return null;
            }
        });
    };

    const handleOptionUpdate = (name, options) => {
        const foundedConfigIndex = configs.findIndex(config => config.name === name);
        if (foundedConfigIndex === -1) return;
        const foundedConfig = configs[foundedConfigIndex];
        foundedConfig.options = options;
        const newConfigs = [...configs]
        newConfigs[foundedConfigIndex] = foundedConfig;
        setConfigs(newConfigs);
        setFormValues();
    }

    const handleKeyPress = ({code}) => {
        if (code !== 'Enter') return;
        formRef.current.submit();
    };


    const handleChange = (e) => {
        console.log('done!', e)
        /*formRef.current.submit();*/
    };

    const handleSelectSearch = () => {
        console.log('done!')
    }

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
                const resetTime = foundedConfig.fromDate ? {'hour': 0, 'minute': 0, 'second': 0} : {
                    'hour': 23,
                    'minute': 59,
                    'second': 59
                };
                if (!isString(e[current])) {
                    const date = dayjs(e[current]).locale('en').format('YYYY-MM-DD');
                    const newDate = moment(date, 'jYYYY-jMM-jDD').locale('en').format('YYYY-MM-DD')
                    p[current] = e[current] ? (dayjs(newDate).set('hour', resetTime.hour).set('minute', resetTime.minute).set('second', resetTime.second).unix()) * 1000 : undefined;
                } else {
                    p[current] = e[current]
                }

            } else if (foundedConfig.inputType === FIELD_TYPE.TIME) {
                if (!e[current]) p[current] = undefined;
                else {
                    p[current] = typeof (e[current]) == 'string' ? e[current] : e[current].format('HH:mm:ss');
                }

            }

            /*       else if (foundedConfig.inputType === FIELD_TYPE.HIDDEN) {

       console.log('checkAction',foundedConfig.inputType)
                       if(data.pageNumber !=='10'){
                           console.log('checkAction', e[current], foundedConfig,p[current])
                           const date = dayjs(e[current]).locale('en').format('YYYY-MM-DD');
                           const newDate = moment(date, 'jYYYY-jMM-jDD').locale('en').format('YYYY-MM-DD')
                           p[current] = data.pageNumber
                       }
                       else{
                           console.log('Saeed: 2', e[current], foundedConfig)
                           p[current] = e[current]
                       }

                   }*/
            else {
                p[current] = e[current];
            }
            return p;
        }, {});
        if (flatted.fromDate && flatted.toDate && flatted.fromDate > flatted.toDate) {

            errorToast('زمان شروع نمی تواند از زمان پایان بزرگتر باشد')
            return
        }
        const query1 = createFilterQueryString(flatted);
        navigate(`${pathname}${query1}`, {replace: true});
    };


    const handleDeleteTag = async (tag) => {
        formRef.current.resetFields();
        const updatedQueryObj = deleteObjectField(parseQuery(query), [tag.name]);
        /*await handleSubmit({
            ...updatedQueryObj,
            fromDate: moment(+updatedQueryObj.fromDate).locale('fa').format('jYYYY/jMM/jDD'),
            toDate: moment(+updatedQueryObj.toDate).locale('fa').format('jYYYY/jMM/jDD'),

        });*/
        await handleSubmit(updatedQueryObj);
        const configs = await getConfigs();
        if (isEmptyArray(configs)) return;
        const parsedQuery = parseQuery(decodeURI(query));

        const mappedTags = Object.keys(updatedQueryObj).reduce((p, current) => {
            const foundedConfig = configs.find(config => config.name === current);
            if (foundedConfig && foundedConfig.inputType === FIELD_TYPE.SELECT) {
                if (isEmptyArray(foundedConfig.options)) {

                    p[current] = {name: current, value: ''};
                } else {
                    const selectedOption = foundedConfig.options.find(option => option.value.toString() === parsedQuery[current])
                    if (foundedConfig.hasAllOption) {
                        p[current] = selectedOption ? {
                            label: selectedOption.label,
                            value: selectedOption.value
                        } : {label: 'همه', value: FILTER_ALL_KEY}
                    } else {
                        const selectedOption = foundedConfig.options.find(option => option.value.toString() === parsedQuery[current]);
                        /*   p[current] = selectedOption ? {name: current, value: selectedOption.value} :*/
                        p[current] = selectedOption ? {label: selectedOption.label, value: selectedOption.value} : {
                            name: current,
                            value: ''
                        };
                    }
                }

            } else if (foundedConfig && foundedConfig.inputType === FIELD_TYPE.DATE) {

                const date = moment(+parsedQuery[current]).locale('en').format('jYYYY/jMM/jDD');
                p[current] = date ? dayjs(date, {jalali: true}).locale('fa') : '';
                /*     p[current] = date ? date : '';*/
            } else if (foundedConfig && foundedConfig.inputType === FIELD_TYPE.TIME) {
                console.log('parsedQuery[current]: ', parsedQuery[current]);
                const date = moment(+parsedQuery[current], 'HH:mm:ss');
                p[current] = date || '';
                /* p[current] = parsedQuery[current]?parsedQuery[current]:""*/
            } else {
                p[current] = parsedQuery[current];
            }
            return p;
        }, {});
        formRef.current.setFieldsValue(mappedTags);
    };


    const handleClearFilters = () => {
        formRef.current.resetFields();
        handleSubmit({});
    };

    return (
        <Test
            {...props}
            formRef={formRef}
            isOpen={isOpen}
            configs={configs}
            filterCount={objectPropsCount(parseQuery(query))}
            renderForm={renderForm}
            tags={parseQuery(decodeURI(query))}
            onClearFilter={handleClearFilters}
            onFilterBarToggled={handleFilterBarToggled}
            onDeleteTag={handleDeleteTag}
            onSubmit={handleSubmit}
            initialValues={props.initialValues}
        />
    );
};

export {ActionBar};
