import { Input } from 'antd';

const InputTemplate = ({name, placeHolder, prefix, suffix, value, onChange}) => {
  return (
    <Input
      name={name}
      placeholder={placeHolder}
      prefix={prefix}
      suffix={suffix}
      value={value}
      onChange={onChange}
    />
  )
}

export {InputTemplate};
