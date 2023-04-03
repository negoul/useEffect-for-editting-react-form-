import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {DetailsEditResourceTemplate} from './DetailsEditResource.template'
import { INPUT_CONFIG} from "./EditResource.config";
import {useLocation} from "react-router-dom";
import {jalaliDate, successToast} from "utils/functions.util";
import {updateResource} from "redux/action/resource/resource.action";


const DetailsEditChannel = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {search: query, pathname} = useLocation();
    const [value, setValue] = useState({});

    const userCode = {
        "1": "Resource1",
        "2": "Resource2",
        "3": "Resource3",
        "4": "Resource4",
        "5": "Resource5",
        "6": "Resource6",
        "7": "Resource7",
        "8": "Resource8",
        "9": "Resource9",
        "10": "Resource10",
    }


    useEffect(() => {
        setValue(props.details?{...props?.details,userId:userCode[props.details.userId]}: {});
    }, [props.details]);

    const fetchData = async (data) => {
        setIsLoading(true)
        const modifiedData = {...data,userId:props.details.userId}
        try {
            await dispatch(updateResource(modifiedData));
            setIsLoading(true)
            successToast('done! resource will not be really updated on the server but it will be faked as if.')
            await props.fetchUser()
        } catch (e) {
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <DetailsEditResourceTemplate
            {...props}
            configs={INPUT_CONFIG}
            initialValues={value}
            onSubmit={fetchData}
        />
    );
};

export {DetailsEditChannel};