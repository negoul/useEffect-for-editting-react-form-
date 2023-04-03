import {Button, Divider} from 'antd';
import {FileExcelOutlined, PlusOutlined, ReloadOutlined} from '@ant-design/icons';
import {useEffect, useRef, useState} from 'react';
import {CSVLink} from "react-csv";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {isEmptyArray, parseQuery} from "../../utils/functions.util";
import {Csv} from "./Csv.component";

const CsvTemplate = props => {
    const refTest = useRef()

    const testMe = async () => {
     /*   await props.onClick()*/
        await props.fetchData()
            refTest.current.link.click()
    }

    return (
        <>
            <Button type="primary" shape="default " onClick={testMe} className='text' loading={props.loading}>
           download CSV
            </Button>
            <CSVLink
                headers={props.header}
                // filename="Clue_Mediator_Report_Async.csv"
                filename={props.fileName}
                data={props.data}
                ref={refTest}
            />


        </>

    );
};

export {CsvTemplate};