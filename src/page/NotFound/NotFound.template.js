import {Result,Button} from 'antd'
import {useLocation, useNavigate} from "react-router-dom";


export const NotFoundTemplate = (props) => {
    const navigate = useNavigate();
    const backHome = async () => {
        navigate(`/`)
    }
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={backHome}>return Home</Button>}
        />
    )
}
