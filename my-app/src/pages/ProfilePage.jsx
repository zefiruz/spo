const ProfilePage = ({ onLogout, user }) => {
    return (<div>
        {!user ?
            (<div>Небходимо войти</div>)
        :
            (<div>ProfilePage
            <button onClick={onLogout}>Выйти</button>
        </div>)
        }
    </div>
    )
}
export default ProfilePage;