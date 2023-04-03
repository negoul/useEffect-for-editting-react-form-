import {Result,Button} from 'antd'
import {useLocation, useNavigate} from "react-router-dom";

export const ErrorTemplate = (props) => {
    const navigate = useNavigate();
    const backHome = async () => {
        navigate(`/`)
    }
    return (
        props?.type?.type ==="permission"?
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" onClick={backHome}>return Home</Button>}
            />
    :

        <section>
            <h1>Error</h1>
            <p>This is a Error page</p>
        </section>
    )
}
