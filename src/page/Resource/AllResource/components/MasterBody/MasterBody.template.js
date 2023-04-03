import {Space, Popconfirm, Empty, Tooltip} from 'antd';
import {Table} from "antd";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import {columns} from './MasterBody.config';


const MasterBodyTemplate = ({data, pagination,onChange,total, isLoading, selectedCustomer, onNext, onSelect,loading,onConfirm}) => {
    const extraCol= {
        title: ' operation',
        dataIndex: 'operation',
        render: (_, record) => {
            return (
            <Space size="middle">
                <Tooltip placement="top" title="edit ">
                    <EditOutlined
                        onClick={()=>onSelect(record)}
                   />

                </Tooltip>
               {/* <Tooltip placement="top" title="delete">
                <Popconfirm title="are you sure?"
                            onConfirm={() => onConfirm(record)}
                            okText="yes"
                            cancelText="no"
                >
                    <DeleteOutlined />
                </Popconfirm>
                </Tooltip>*/}


            </Space>

            )
        }
    }



    const newCol=[...columns,extraCol]
    const locale= {
        emptyText: (
            <span>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'No Data!'}>

                </Empty>
            </span>
        )

    }

  return (
      <Table
          columns={newCol}
          dataSource={data}
         selections={false}
         /* pagination={pagination}*/
          onChange={onChange}
          loading={loading}
          locale={locale}

      />
  );
};

export {MasterBodyTemplate};