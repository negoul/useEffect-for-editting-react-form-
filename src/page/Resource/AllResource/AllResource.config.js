import {FIELD_TYPE} from 'config/action-bar.config';


const userIdCode = [{value: '1', label: "Resource1"},
    {value: '2', label: "Resource2"},
    {value: '3', label: "Resource3"},
    {value: '4', label: "Resource4"},
    {value: '5', label: "Resource5"},
    {value: '6', label: "Resource6"},
    {value: '7', label: "Resource7"},
    {value: '8', label: "Resource8"},
    {value: '9', label: "Resource9"},
    {value: '10', label: "Resource10"},
]



export const INPUT_CONFIG = [

    {
        name: 'userId',
        inputType: FIELD_TYPE.SELECT,
        label: 'userId',
        options:userIdCode
    },
    {
        name: 'pageNumber',
        inputType: FIELD_TYPE.HIDDEN,
        placeholder: 'شماره صفحه',
        label: '',
    },
    {
        name: 'pageSize',
        inputType: FIELD_TYPE.HIDDEN,
        placeholder: 'تعداد ',
        label: '',
    },
];

