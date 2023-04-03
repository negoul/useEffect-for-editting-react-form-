import React, {useEffect, useState} from 'react';
import {Menu} from 'antd';
import { useLocation, useNavigate} from 'react-router-dom';
import {STATIC_PATHS} from 'config/routes.config';
import {isEmptyArray} from 'utils/functions.util';
import style from './Aside.module.scss';


const Aside = ({drawer = false,collapsed}) => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState();
    /*const permissions = useSelector(state => state.authentication.user.permissions);*/
    const {SubMenu} = Menu;

    useEffect(() => {
        setSelectedMenu(pathname.split('/')[1]);
    }, [pathname]);

    const redirect = (url) => {
        setSelectedMenu(url);
        navigate(url);
    };

    return (
        <div className={`overflow-auto height-expand ${style.asideWrapper} ${drawer ? style.drawer : ''}`}>


            {
                !drawer && !collapsed ? (
                   /* <div className="flex-center-horizontal"   > */
                        <div className={` ${style.logo} flex-center-horizontal `}   >
                        <h1 className={`${style.h1}  flex-center-horizontal `}  >Negin Bagherzadeh</h1>
                    </div>
                ):  <div className={` ${style.logo} flex-center-horizontal `}  >

                        <h1 className={`${style.h1}  flex-center-horizontal `}>NB</h1>

                </div>
            }
            <Menu className={style.menu} mode="inline" selectedKeys={[selectedMenu]} theme="dark">
                {
                    STATIC_PATHS.filter(s => s.showInSidebar).map((path, index) => {
                        if (!isEmptyArray(path.child)) {
                            return (
                                (
                                    <SubMenu key={ path.id} title={path.title} icon={path.icon} >
                                        {path.child.filter(e =>e.showInSidebar).map(its => {
                                            {
                                                if (!isEmptyArray(its.child)) {
                                                    return (
                                                        (
                                                            <SubMenu key={its.id} title={its.title} icon={its.icon}>
                                                                {its.child.map(it =>
                                                                    {
                                                                        if (!isEmptyArray(it.child)) {
                                                                            return (
                                                                                (
                                                                                <SubMenu key={it.id} title={it.title} icon={it.icon}>
                                                                                    {it.child.map(child =>
                                                                                        <Menu.Item key={child.id}
                                                                                                   onClick={() => redirect(child.path)}
                                                                                                   icon={child.icon}>
                                                                                            {child.title}
                                                                                        </Menu.Item>)}
                                                                                </SubMenu>
                                                                            )
                                                                                )
                                                                        }
                                                                        return (
                                                                             (
                                                                            <Menu.Item key={it.id}
                                                                                       onClick={() => redirect(it.path)}
                                                                                       icon={it.icon}>
                                                                                {it.title}
                                                                            </Menu.Item>
                                                                        )
                                                                            )
                                                                    }


                                                                )}
                                                            </SubMenu>

                                                     )

                                                    )
                                                }
                                                return (
                                                 (
                                                        <Menu.Item key={its.id}
                                                                   onClick={() => redirect(its.path)}
                                                                   icon={its.icon}>
                                                            {its.title}
                                                        </Menu.Item>
                                                   )
                                                )

                                            }
                                        })}

                                    </SubMenu>
                               )




                            )

                        }

                        return (
                            /*   hasPermission(path.permission) && (*/
                         (
                                <Menu.Item key={path.id} onClick={() => redirect(path.path)}
                                           icon={path.icon}>
                                    {path.title}
                                </Menu.Item>
                            )


                            /*  )*/
                        );
                    })
                }
            </Menu>
        </div>
    );
};

export {Aside};
