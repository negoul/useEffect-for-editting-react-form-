import {Button, Divider} from 'antd';
import {FileExcelOutlined, PlusOutlined, ReloadOutlined} from '@ant-design/icons';
import React, {Component, Fragment, useState} from 'react';
import { CSVLink } from "react-csv";
import axios from "axios";





class CsvOldTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.csvLinkEl = React.createRef();
    }




    downloadReport = async () => {
    /* console.log( 'negin',await this.props.getResult())*/
        const data = await this.props.getResult();
        this.setState({ data: data }, () => {
            setTimeout(() => {
                // console.log(data)
                this.csvLinkEl.current.link.click();
            });
        });
    }

    render() {
        const { data } = this.state;

        return (
            <>
                <Button type="primary" shape="default " onClick={this.downloadReport} className='text'>
                    <FileExcelOutlined/>
                    دریافت CSV
                </Button>
                {/*<input type="button" value="Export to CSV (Async)" onClick={this.downloadReport} />*/}
                <CSVLink
                    headers={this.props.header}
                    // filename="Clue_Mediator_Report_Async.csv"
                    filename={this.props.fileName}
                    data={data}
                    ref={this.csvLinkEl}
                />


            </>
        );
    }
}

export default CsvOldTemplate;