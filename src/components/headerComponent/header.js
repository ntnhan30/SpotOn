import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import Logo from'../../Assets/imgs/logo.svg';


class Header extends Component {
  render() {
    return (
        <header>

            <div className="container-fluid">
                <div className="col-2">
                    <div className="logo">
                        <img  src={Logo} alt="SpotOn"/>
                    </div>
                </div>

                <div className="col-10">
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Reports</Link>
                            </li>
                            <li>
                                <Link to='/import'>Import</Link>
                            </li>
                            <li>
                                <Link to='/notifications'>Notifications</Link>
                            </li>
                            <li>
                                <Link to='/users'>Users</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </header>
    );
  }
}

export default Header;
