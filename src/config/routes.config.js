import {
    ShoppingCartOutlined,
    FundOutlined,
    CreditCardOutlined,
    UnorderedListOutlined,
    PullRequestOutlined,
    SortAscendingOutlined,
    WalletOutlined,
    IdcardOutlined,
    FilterOutlined,
    VerticalAlignBottomOutlined,
    SwapOutlined,
    BarcodeOutlined,
    HistoryOutlined,
    SettingOutlined,
    CheckSquareOutlined,
    ShopOutlined,
    UploadOutlined,
    RiseOutlined,
    ToolOutlined,
    RobotOutlined,
    GroupOutlined,
    HomeOutlined,
    PlusOutlined,
    SendOutlined,
    MailOutlined,
    FileTextOutlined,
    BookOutlined,
    UserOutlined,
    LogoutOutlined,
    BorderOuterOutlined,
    InsertRowBelowOutlined,
    ForkOutlined, LineChartOutlined,
} from '@ant-design/icons';
import {LAYOUT} from 'config/layout.config';
import * as Page from '../page/index';

export const PATH = {
    CARD_ISSUE: '/card-issue',
    /*  CUSTOMERS: '/customers',*/
    ERROR: '/error',
    HOME: '/',
    NOT_FOUND: '/not-found',
    CREATE_RESOURCE: '/createResource',
    ALL_RESOURCE: '/allResource',
    ALL_CHART: '/chart',




};

export const ROUTE_TYPE = {
    PUBLIC: 'PUBLIC',
    PRIVATE: 'PRIVATE',
    PROTECTED: 'PROTECTED',
    REDIRECT: 'REDIRECT'
};



export const STATIC_PATHS = [
    {
        showInSidebar: true,
        icon: <HomeOutlined/>,
        path: PATH.HOME,
        title: 'Home',
        id: '',
        component: Page.Home,
        layout: {
            name: LAYOUT.PRIMARY
        },
        routeType: ROUTE_TYPE.PRIVATE
    },

    {
        showInSidebar: true,
        icon: <FilterOutlined/>,
        title: 'Chapters',
        id: 'resourceManagement',
        /* component: Page.PinReserveCodeRequest,*/
        layout: {
            name: LAYOUT.PRIMARY
        },
        routeType: ROUTE_TYPE.PRIVATE,
        child: [
            {
                icon: <FileTextOutlined/>,
                showInSidebar: true,
                path: PATH.ALL_RESOURCE,
                title: 'ResourceManagement',
                id: 'allResource',
                component: Page.AllResource,
                layout: {
                    name: LAYOUT.PRIMARY
                },
                routeType: ROUTE_TYPE.PRIVATE,
            },
        ]
    },
    {
        path: PATH.ERROR,
        component: Page.Error,
        layout: null,
        routeType: ROUTE_TYPE.PUBLIC
    },
    {
        path: PATH.NOT_FOUND,
        component: Page.NotFound,
        layout: null
    },
    {
        path: '*',
        routeType: ROUTE_TYPE.REDIRECT,
        redirectPath: PATH.NOT_FOUND
    }
];
