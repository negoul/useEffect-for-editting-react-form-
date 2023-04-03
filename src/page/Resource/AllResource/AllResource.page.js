import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AllResourceTemplate} from './AllResource.template';
import {useLocation, useNavigate} from "react-router-dom";
import {queryParameterToObject, objectToQueryParameter, successToast} from 'utils/functions.util';
import {fetchAllResource,deleteResource} from "redux/action/resource/resource.action";


const AllResource = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: '',
            locale: {items_per_page: "/ سطر"}
        },
    })
    const [resourceData, setResourceData] = useState([]);
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {search: query, pathname} = useLocation();

    useEffect(() => {
        (async () => {
            setDetails({})
            await fetchData();
        })();
    }, [query]);


    const fetchData = async (firstLoad = true, preLocation = null) => {
        console.log('data')
        setLoading(true)
        try {
            const result = await dispatch(fetchAllResource(query));
            setResourceData(result.map((it, idx) => ({
                key:idx + 1 ,
                row: idx + 1 ,
                ...it,
            })))
            setState({
                pagination: {
                    current: result.number + 1,
                    total: result.totalElements,
                    pageSize: result.size,
                    showSizeChanger: true,
                    locale: {items_per_page: "/ سطر"},
                    showTotal: (total, range) => ` نمایش${range[0]}-${range[1]} از ${total}  `
                },
            })

        } catch (e) {
            setLoading(false)
            setResourceData([])
        } finally {
            setLoading(false)
        }
    };


  /*  const handleTableChange = async (pagination) => {
        console.log('data',pagination)
        await setDetails({})
        const convertQueryToObject = queryParameterToObject(query)
        convertQueryToObject.pageNumber = (pagination.current - 1).toString()
        convertQueryToObject.pageSize = (pagination.pageSize).toString()
        const newQuery = objectToQueryParameter(convertQueryToObject)
        navigate(`${pathname}?${newQuery}`, {replace: true});
        setState({
            pagination: {
                current: pagination.current,
                pageSize: pagination.pageSize,
                showSizeChanger: true,
                locale: {items_per_page: "/ سطر"},
                showTotal: (total, range) => `  نمایش  ${range[0]}-${range[1]} از ${total}  `
            }
        })

    }*/

    const getDetails = async (record) => {
        setDetails(record)
        /*setLoading(true)
        try {
            const result = await dispatch(detailsUser(record.id));
            setDetails(result)
        } catch (e) {
            setLoading(false)
            setChannelData([])
        } finally {
            setLoading(false)
        }*/
    };




    const confirmDeleteUsers = async (record) => {
        setLoading(true)
        try {
           await dispatch(deleteResource(record.id));
            successToast('Done! resource will not be really updated on the server but it will be faked as if.')
           await fetchData()
        } catch (e) {
            setLoading(false)
             setResourceData([])
        } finally {
            setLoading(false)
        }
    }


    return (
        <AllResourceTemplate
            data={resourceData}
            pagination={state.pagination}
            /*onchange={handleTableChange}*/
            onSelectRow={getDetails}
            onConfirm={confirmDeleteUsers}
            details={details}
            onClose={() => setDetails({})}
            loading={loading}
            fetchUser={fetchData}
        />
    );
}

export {AllResource};
