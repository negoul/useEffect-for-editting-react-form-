import { UserOutlined } from "@ant-design/icons";
import {FIELD_TYPE} from 'config/action-bar.config';


const status = [{value: '1', label: "فعال"},
    {value: '2', label: "غیرفعال"},

]



export const INPUT_CONFIG = [

    {
        name: 'id',
        inputType: FIELD_TYPE.TEXT,
        label: 'نام',
        disabled:true
    },
    {
        name: 'userId',
        inputType: FIELD_TYPE.TEXT,
        label: 'userId',
        disabled:true
    },
    {
        name: 'title',
        inputType: FIELD_TYPE.TEXT,
        label: 'title',
        rules: [{
            required: true,
            message: 'Please input title',
        }],
    },
      {
        name: 'body',
        inputType: FIELD_TYPE.TEXT,
        label: 'body',
        rules: [{
            required: true,
            message: 'Please input body',
        }],
    },


];

