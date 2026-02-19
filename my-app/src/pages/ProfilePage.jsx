import {useAuth} from '../context/AuthContext'

const ProfilePage = () => {
    const {user, logout} = useAuth();
    return (<div>
        {!user ?
            (<div>Небходимо войти</div>)
        :
            (<div>ProfilePage
            <button onClick={logout}>Выйти</button>
        </div>)
        }
    </div>
    )
}
export default ProfilePage;