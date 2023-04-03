import {FilterOutlined, InfoCircleOutlined} from '@ant-design/icons';
import Button, {COLOR, VARIANT} from '@sakit-sa/react-button';
import {Badge, Form, Tooltip} from 'antd';
import style from 'components/ActionBar/ActionBar.module.scss';
import React from 'react';
import {isEmptyArray} from 'utils/functions.util';
import {FilteredTags} from "./FilteredTags.template";

export const Test=props=>{
    return(
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
                    <FilteredTags configs={props.configs} tags={props.tags} onDelete={props.onDeleteTag}/>
                </div>
            </header>
            {
                !isEmptyArray(props.configs) && (
                    <div className=' background-default flex flex-center-vertical flex-space-between padding-left-24 '>
                        <Form
                            autoComplete="off"
                            className={`${style.filter_bar} ${  style.active} margin-child-horizontal-4 flex flex-start flex-center-vertical background-default padding-horizontal-24 z-index-0`}
                            ref={props.formRef}
                            onFinish={props.onSubmit}
                        >
                            {props.renderForm()}
                            <Button type="success" htmlType="submit">
                                filter
                            </Button>
                            {
                                !!props.filterCount && (
                                    <Button variant={VARIANT.TEXT} className={{content: '!font-medium text-small text-muted'}}
                                            color={COLOR.DEFAULT} onClick={props.onClearFilter}
                                    >clear</Button>
                                )
                            }


                        </Form>

                    </div>

                )
            }
        </>
    )
}
