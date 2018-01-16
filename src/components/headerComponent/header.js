import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';


class Header extends Component {
  render() {
    return (
        <header>

            <div className="logo">
                New T-Rex Tool
            </div>

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

        </header>
    );
  }
}

export default Header;
