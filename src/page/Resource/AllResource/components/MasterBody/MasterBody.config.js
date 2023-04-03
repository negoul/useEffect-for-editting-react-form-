import { Table, Tag, Space } from 'antd';
import {jalaliDate} from "../../../../../utils/functions.util";
import style from "./MasterBody.module.scss";

const statusCode = {
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

export const columns = [
  {
    title: 'row',
    dataIndex: 'row',
  },
  {
    title: 'userId ',
    dataIndex: 'userId',
    /*render : it=> <Tag className={style.username} >{it}</Tag>*/
    render:userId=> <Tag className={style[`statusCode${userId}`]} >{statusCode[userId]}</Tag>,
  },
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'userId',
    dataIndex: 'title',
  },
  {
    title: 'body',
    dataIndex: 'body',
  },



];
