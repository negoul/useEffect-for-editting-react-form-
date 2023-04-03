import {Badge, Button, Form} from 'antd';
import {FilterOutlined} from '@ant-design/icons';
import style from 'components/ActionBar/ActionBar.module.scss';
import {FilteredTags} from 'components/ActionBar/FilteredTags.template';

export const FormTemplate = props => {
    return (
        <>

           {/* <header className={`${style.action_bar} flex flex-center-vertical background-default border-solid-bottom padding-horizontal-24`}>
                <div className="flex flex-center-vertical flex-center-horizontal">
                    <h3>{props.title}</h3>
                    <Button type="link" onClick={props.onFilterBarToggled}>
                        <Badge count={props.filterCount} overflowCount={9}  size="small">
                            <FilterOutlined/>
                        </Badge>
                    </Button>
                    <FilteredTags tags={props.tags} onDelete={props.onDeleteTag}/>
                </div>
            </header>*/}
            <Form
                autoComplete="off"
              /*  className={`

                ${style.filter_bar}
                ${ style.active }
                 margin-child-horizontal-4 
                 flex
                 flex-start
                  flex-center-vertical background-default padding-horizontal-24 z-index-0`
                }*/
                className="flex-column overflow-hidden form-template "
               /* style={{border:'1px solid red',padding:'30px',maxWidth:'600px'}}*/

                ref={props.formRef}
                onFinish={props.onSubmit}
                initialValues={props.initialValues}
            >
                {props.renderForm()}
                <Form.Item
                    className="margin-remove-vertical form-builder form-builder-item"
                    wrapperCol={{
                    offset:4,
                    span: 16,
                }}
                    /*style={{marginTop:'25px'}}*/
                >
                    <Button  type="primary" htmlType="submit">
                       submit
                    </Button>
                </Form.Item>
            </Form>

        </>
    );
};
