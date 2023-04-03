import Button, {COLOR, VARIANT} from '@sakit-sa/react-button';
import {Badge, Form, Row} from 'antd';
import React from 'react';
import style from './ActionBar.module.scss';
import {FilteredTags} from './FilteredTags.template';
import {FilterOutlined} from "@ant-design/icons";

export const ActionBarTemplate = props => {
    const tags = props.tags
    const {pageNumber, pageSize, ...modifiedTags} = tags
    return (
        <>
            <header
                className={`${style.action_bar} flex flex-center-vertical background-default border-solid-bottom padding-horizontal-24`}>
                <div className="flex flex-center-vertical flex-center-horizontal">
                    <h3>{props.title}</h3>
                    <Button variant={VARIANT.TEXT} color={COLOR.PRIMARY}
                            className={{button: '!overflow-initial margin-left-8', content: "flex-center-vertical"}}
                        /*  onClick={props.onFilterBarToggled}*/
                    >
                        <Badge
                            count={props.tags.pageNumber && props.tags.pageNumber ? props.filterCount - 2 : props.filterCount}
                            overflowCount={9} size="small">
                            {/*<Badge  overflowCount={9}  size="small">*/}
                            <FilterOutlined/>
                            {/* <i className="!text-medium iconly-Filter-2" />*/}
                        </Badge>
                    </Button>
                    <FilteredTags configs={props.configs} tags={modifiedTags} onDelete={props.onDeleteTag}/>
                </div>
            </header>
            <Form
                autoComplete="off"
                className={`${style.filter_bar} ${props.isOpen ? style.active : ''}
               /*  margin-child-horizontal-4 */
                 actionbar-box
                 background-default 
                 padding-horizontal-24
                  z-index-0
                  `}
                style={{height: 'auto', padding: '16px'}}
                ref={props.formRef}
                onFinish={props.onSubmit}
                initialValues={props.initialValues}
            >
                <Row gutter={12} className={'action-row'}>
                    {props.renderForm()}


                </Row>
                {/*{*/}
                {/*    !!props.filterCount && (*/}
                {/*        <Button variant={VARIANT.TEXT} className={{content: '!font-medium text-small'}} color={COLOR.PRIMARY} onClick={props.onClearFilter}>پاک کن</Button>*/}
                {/*    )*/}
                {/*}*/}
                <Form.Item style={{marginTop: '25px'}}>
                    {
                        !!props.filterCount && (
                            <Button variant={VARIANT.TEXT} className={{content: '!font-medium text-small'}}
                                    color={COLOR.PRIMARY} onClick={props.onClearFilter}>پاک کن</Button>
                        )
                    }

                    <Button type="success" htmlType="submit">
                        filter
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
