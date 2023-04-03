import {Button, Divider} from 'antd';
import {FileExcelOutlined, PlusOutlined, ReloadOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import {CSVLink} from "react-csv";
import {Csv} from "components/Csv/Csv.component";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {isEmptyArray, jalaliDate, queryParameterToObject} from "utils/functions.util";
import {fetchAllResource} from "redux/action/resource/resource.action";

const MasterHeader = props => {


  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(false)
  const {search: query, pathname} = useLocation();

  /*useEffect(() => {
      !!query &&  (async () => {
          await fetchData();
      })();
  }, [query]);
*/


  const resourceCode = {
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


  const fetchData = async (firstLoad = true, preLocation = null) => {
    try {
      setLoading(true)
      const result =  await dispatch(fetchAllResource(query));
      setLoading(false)
      setData(result.map((it)=>({...it,
        userId:resourceCode[it.userId]
      })))


    } catch (e) {
      setData([])
      setLoading(false)
    } finally {

    }
  };

  const headers = [
    { label: "id", key:"id" },
    { label: "resource", key:"userId" },
    { label: "title", key: "title" },
    { label: "description", key: "body" },
  ];


  return (
      <div className="flex-space-between flex-1">
        {/* <oldScv fileName='RequestReport.csv' url='http://192.168.10.209:8082' method={urls.PACKAGE_REQUEST_CSV} header={headers}/>*/}
        {/*  <Button> <CSVLink data={data} headers={headers}  >
            {loading ? 'Loading csv...' : 'دانلود فایل CSV'}
        </CSVLink></Button>*/}
        <Csv fileName='allResource'  header={headers} data={data} loading={loading} fetchData={fetchData}/>
        {/* <div>
        <Button className="!font-medium" type="primary" onClick={props.onCreate} icon={<PlusOutlined />}>اضافه کردن</Button>
      </div>
      <div>
        <Button type="text" onClick={props.onExcel}>
          <FileExcelOutlined/>
        </Button>
        <Button type="text" onClick={props.onReload}>
          <ReloadOutlined />
        </Button>
      </div>*/}
      </div>
  );
};

export {MasterHeader};