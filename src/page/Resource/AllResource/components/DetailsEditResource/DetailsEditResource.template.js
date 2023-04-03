
import {FormComponent} from "components/Form/Form.component";


const DetailsEditResourceTemplate = props => {

    return (
        <div className="padding-20">
            <FormComponent    configs={props.configs} initialValues={props.initialValues} submit={props.onSubmit} />
        </div>
    );
};

export {DetailsEditResourceTemplate};