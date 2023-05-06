import React from 'react';
import Cookies from 'js-cookie';
import s from './Profile.module.css'

const Profile = () => {
    const session = Cookies.get('user_session')
    const name = session ? JSON.parse(session).dataValues.name : ''

    return (
        <div className={s.userIcon}>
            <h1>
                {name[0]}
            </h1>
        </div>
    );
}

export default Profile;
