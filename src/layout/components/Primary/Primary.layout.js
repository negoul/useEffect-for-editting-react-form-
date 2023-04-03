import {PrimaryTemplate} from './Primary.template';
import {useState} from "react";

const Primary = props => {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return <PrimaryTemplate {...props} setVisible={setVisible} visible={visible} collapsed={collapsed} setCollapsed={setCollapsed}/>
};
export {Primary};
