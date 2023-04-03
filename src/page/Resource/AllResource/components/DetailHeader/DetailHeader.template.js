import {Tabs} from 'antd';
import {FileExcelOutlined, PlusOutlined, ReloadOutlined} from '@ant-design/icons';
import {Button, Divider} from 'antd';




const {TabPane} = Tabs;
const DetailHeader = props => {
  return (
      <div className="flex-space-between flex-1">
        <div>
          <Button type="text" onClick={props.onExcel}>
            <FileExcelOutlined/>
          </Button>
          <Button type="text" onClick={props.onReload}>
            <ReloadOutlined />
          </Button>
        </div>
      </div>
  );
};

export {DetailHeader};