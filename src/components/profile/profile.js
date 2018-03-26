import React, { Component } from 'react';
import { Auth } from '../../components/auth';

const auth = new Auth();

class Profile extends Component {
    static defaultProps = {
        auth
    }

    componentWillMount() {
    }

    render() {
        const { profile } = this.state;
        //console.log( profile );
        return (
            <div className="container">
                <div className="profile-area">
                    <h1>{profile.name}</h1>
                    <img src={profile.picture} alt="profile" />
                    <div>
                        <h2>Nickname</h2>
                        <h3>{profile.nickname}</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
