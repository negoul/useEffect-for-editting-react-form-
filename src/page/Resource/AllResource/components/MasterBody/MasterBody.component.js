import {useLocation} from 'react-router-dom';
import {MasterBodyTemplate} from './MasterBody.template';

const MasterBody = props => {

    const {search: query} = useLocation();

    return (
        <MasterBodyTemplate
            {...props}
            onSelect={props.onSelect}
            onConfirm={props.onConfirm}
        />
    );
};

export {MasterBody};