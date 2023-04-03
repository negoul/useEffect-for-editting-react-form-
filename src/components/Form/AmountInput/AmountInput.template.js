import React, {useState} from 'react';
import {Form, Input, Button, InputNumber} from 'antd';


const AmountInputTemplate = ({value = "", onChange,placeholder}) => {
    const [number, setNumber] = useState("");

    const triggerChange = (changedValue) => {

        onChange?.(changedValue);
    };

    const onNumberChange = (e) => {

        const re = /\d|\w|[\.\$@\*\\\/\+\-\^\!\(\)\[\]\~\%\&\=\?\>\<\{\}\"\'\,\:\;\_]/g;
        if (e.target.value && e.target.value.match(re) == null){
            alert('زبان کیبورد می بایست انگلیسی باشد');
            return false;
        }

        const newNumber = e.target.value.replace(/[^0-9]+/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        setNumber(newNumber);
        triggerChange(newNumber,
        );
    };


    return (
        <span>
      <Input
          type="text"
          value={number|| value}
          onChange={onNumberChange}
          placeholder={placeholder}
      />

    </span>
    );
};



export default AmountInputTemplate
