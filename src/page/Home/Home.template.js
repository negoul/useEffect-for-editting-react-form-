import {Button, Row, Col, Image, Modal, Card,Result} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import MasterDetail from "@sakit-sa/react-master-detail";
import { Space, Typography } from 'antd';
const { Text, Link } = Typography;



export const HomeTemplate = (props) => {

    return(
        <Result
            icon={<SmileOutlined />}
            title="Hello! ,This is a sample dashboard! for more information review readme and notice comments in code!"
        />
    )


}


