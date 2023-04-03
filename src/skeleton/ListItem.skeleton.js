import {Skeleton} from 'antd';

const ListItemSkeleton = ({border, avatar}) => (
  <div className={`padding-horizontal-20 padding-vertical-12 flex-row ${border ? 'border-solid-bottom' : ''}`}>
    {
      avatar && <Skeleton.Avatar className="margin-left-16" active size={24}/>
    }
    <div className="margin-child-bottom-8 width-expand">
      <Skeleton.Input className="border-radius-circle" style={{width: 250, height: 20 }} shape="round" active size={'small'} />
      <Skeleton.Input className="border-radius-circle width-expand margin-remove-vertical" style={{ height: 22 }} shape="round" active size={'small'} />
    </div>
  </div>
);

export {ListItemSkeleton};