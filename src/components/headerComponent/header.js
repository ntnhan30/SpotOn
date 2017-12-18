import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';


class Header extends Component {
  render() {
    return (
        <header>

            <div className="logo">
                LOGO
            </div>

            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/products'>Products</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact</Link>
                    </li>
                </ul>
            </nav>

        </header>
    );
  }
}

export default Header;
