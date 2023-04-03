import {Tag} from 'antd';
import moment from 'moment-jalaali';
import {CloseCircleOutlined} from '@ant-design/icons';
import {FIELD_TYPE} from 'config/action-bar.config';
import {isEmptyArray, isEmptyObject} from 'utils/functions.util';

const FilteredTags = ({configs, tags, onDelete}) => {
  if (isEmptyObject(tags)) return null;
  const mappedTags = Object.keys(tags).map((key, index) => {
    const foundedConfig = configs.find(config => config.name === key);
    // if (foundedConfig && foundedConfig.inputType === FIELD_TYPE.HIDDEN) {
    //   return {};
    // }
    if (foundedConfig && foundedConfig.inputType === FIELD_TYPE.SELECT) {
      if (isEmptyArray(foundedConfig.options)) {
        return {};
      } else {
        const selectedOption = foundedConfig.options.find(option => option.value.toString() === tags[key]);
        return selectedOption ? {value: selectedOption.label, name: key} : {name: key, value: ''};

      }

    }
    else if (foundedConfig && foundedConfig.inputType === FIELD_TYPE.SELECTSEARCH) {
      if (isEmptyArray(foundedConfig.options)) {
        return {};
      } else {
        const selectedOption = foundedConfig.options.find(option => option.value.toString() === tags[key]);
        return selectedOption ? {value: selectedOption.label, name: key} : {name: key, value: ''};

      }

    }

    else if (foundedConfig && foundedConfig.inputType === FIELD_TYPE.DATE) {
      const value = moment(+tags[key] ).locale('en').format('jYYYY/jMM/jDD');
      /*      const value = moment(tags[key]/1000,"X").format('jYYYY/jMM/jDD');*/
      return {value, name: key};
    }
    return {value: tags[key], name: key}
  });
  /*const pageNumber = mappedTags.pop()*/
  return (

      <div className="display-flex">
        {
          mappedTags.map(tag => {
            const foundedConfig = configs.find(config => config.name === tag.name);
            const label = foundedConfig ? foundedConfig.label : '';
            if (isEmptyObject(tag)) return null ;
            /*  else if(foundedConfig?.inputType === FIELD_TYPE.DATE){
                return(
                    <Tag className="flex-center-vertical cursor-pointer" key={tag.name}
                        /!*   icon={<CloseCircleOutlined />}
                           onClick={() => onDelete(tag)}*!/
                    >
                      {label && <span className="margin-left-4">{label}:</span>}
                      <span className="!font-medium">{tag.value}</span>
                    </Tag>
                )}*/
            else if(foundedConfig?.noDelete){
              return(
                  <Tag className="flex-center-vertical cursor-pointer" key={tag.name}
                      /*   icon={<CloseCircleOutlined />}
                         onClick={() => onDelete(tag)}*/
                  >
                    {label && <span className="margin-left-4">{label}:</span>}
                    <span className="!font-medium">{tag.value}</span>
                  </Tag>
              )}

            else if(foundedConfig?.hasAllOption){
              const selectedOption = foundedConfig.options.find(option => option.label.toString() === tag.value);
              return(
                  selectedOption?
                      <Tag className="flex-center-vertical cursor-pointer" key={tag.name}
                           icon={<CloseCircleOutlined />}
                           onClick={() => onDelete(tag)}
                      >
                        {label && <span className="margin-left-4">{label}:</span>}
                        <span className="!font-medium">{tag.value}</span>
                      </Tag>
                      :
                      <Tag className="flex-center-vertical cursor-pointer" key={tag.name}
                           icon={<CloseCircleOutlined />}
                           onClick={() => onDelete(tag)}
                      >
                        {label && <span className="margin-left-4">{label}:</span>}
                        <span className="!font-medium">همه</span>
                      </Tag>
              )
            }
            else return (
                  <div>
                    <Tag className="flex-center-vertical cursor-pointer" key={tag.name}
                         icon={<CloseCircleOutlined />}
                         onClick={() => onDelete(tag)}
                    >
                      {label && <span className="margin-left-4">{label}:</span>}
                      <span className="!font-medium">{tag.value}</span>
                    </Tag>
                  </div>
              )
          })
        }
      </div>
  );
};

export {FilteredTags};