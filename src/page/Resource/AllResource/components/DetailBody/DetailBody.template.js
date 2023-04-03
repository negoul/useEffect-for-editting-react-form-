import {Button, Tabs} from 'antd';
import {DetailsEditChannel} from '../DetailsEditResource/DetailsEditResource.component'
import {CloseOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;



const DetailBody = props => {
    const operations = <Button onClick={()=> props.onClose()} type="text" ><CloseOutlined /></Button>;
  return (
    <Tabs  tabBarExtraContent={operations} className="page-tabs" defaultActiveKey="1">
      <TabPane className="scroll-modern" tab="edit Resource" key="1">
          <DetailsEditChannel details={props.details}  fetchUser={props.fetchUser} />
      </TabPane>
    </Tabs>

  );
};

export {DetailBody};