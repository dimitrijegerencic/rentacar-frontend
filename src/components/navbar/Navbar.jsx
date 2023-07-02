import React from "react";
import {Menu, message} from "antd";
import './Navbar.scss';
import {Link} from "react-router-dom";
import logoImg from "../../images/logo3.png";
import {  BarChartOutlined, LogoutOutlined  } from '@ant-design/icons';
import {connect} from "react-redux";
import {useNavigate} from "react-router";
const Navbar = ({loggedUser}) => {

    const navigate = useNavigate()

    const logout = () => {
        loggedUser.id = '';
        loggedUser.first_name = '';
        loggedUser.last_name = '';
        loggedUser.email = '';
        loggedUser.password = '';

        message.info("Logging you out...")

        setTimeout(()=>{
            navigate('/login')
        }, 2000)
    }

    const navbarItems = [
        {
            label: <Link to='/'>
                <div className={'logo-item'}>
                    <img src={logoImg} alt='LOGO'/>
                </div>
            </Link>,
            key: '/',
        },
        {
            label :   <Link to='/'>
                Home
            </Link>,
            key: 'home'
        },
        {
            label: <Link to='/vehicles'>
                Vehicles
            </Link>,
            key: 'vehicles',
        },
        {
            label: <Link to='/reservations'>
                My Reservations
            </Link>,
            key: 'reservations',
        },

        {
            label :   <Link to='/about'>
                About Us
            </Link>,
            key: 'about'
        },
        {
            label: `${loggedUser.first_name}`,
            key: 'SubMenu',
            children: [
                {
                    type: 'group',
                    children: [
                        {
                            label: <span onClick={() => logout()}>Logout</span>,
                            key: 'setting:3',
                            icon: <LogoutOutlined />,

                        },
                    ],
                },
            ],
        },
    ]

    if (loggedUser && loggedUser.isAdmin === 1) {
        const submenuItem = navbarItems.find(item => item.key === 'SubMenu');
        if (submenuItem && submenuItem.children) {
            submenuItem.children[0].children.unshift({
                label: <Link to="/admin-panel">Admin Panel</Link>,
                key: 'admin-panel',
                icon: <BarChartOutlined />,
            });
        }
    }



    return <div>
        <Menu mode={'horizontal'}
              className={`navigation-menu`}
              items={navbarItems}
        />
    </div>
}

const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser
});

export default connect(mapStateToProps)(Navbar);