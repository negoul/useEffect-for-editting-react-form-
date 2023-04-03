import MasterDetail from '@sakit-sa/react-master-detail';
import {ActionBar} from 'components/ActionBar/ActionBar.component'
import {MASTER_CLASS} from 'config/master-detail.config';
import {DetailBody, MasterBody, MasterHeader, DetailHeader} from "./components/index";
import {INPUT_CONFIG} from './AllResource.config'
import {isEmptyObject} from "utils/functions.util";


export const AllResourceTemplate = (props) => {

    return (
        <div className="flex-column overflow-hidden flex-1 height-expand">
            <ActionBar configs={INPUT_CONFIG} title={'chapters/resourceManagement'}/>
            <div className="flex-column overflow-auto flex-1 padding-24">
                <MasterDetail
                    centerAlign={false}
                    masterWidth={isEmptyObject(props.details) ? '100%' : '60%'}
                    adjustable={true}
                    className={MASTER_CLASS}
                    showDetail={!isEmptyObject(props.details)}
                    onClose={props.onClose}
                >
                    <div>
                        <MasterHeader
                            onReload={props.onReload}
                            onExcel={props.onExcel}
                        />
                        <MasterBody
                            data={props.data}
                           /* pagination={props.pagination}*/
                            onChange={props.onchange}
                            onConfirm={props.onConfirm}
                            onSelect={props.onSelectRow}
                            loading={props.loading}
                        />
                    </div>
                    <div>
                        <DetailBody
                            details={props.details}
                            onSelect={props.onSelectRow}
                            onClose={props.onClose}
                            fetchUser={props.fetchUser}
                        />

                    </div>
                </MasterDetail>
            </div>
        </div>
    );
}
