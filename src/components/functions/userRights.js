class UserRights {
    init(email) {
        let result = [];
        switch (email)
        {
            case 'andres.guevara@deliveryhero.com':
                result.country = ['Germany'];
                result.right = 'admin';
                break;
            case 'andresgf92@gmail.com':
                result.country = ['Colombia'];
                result.right = 'limited';
                break;
            default:
                result.country = [''];
                result.right = 'none';
                break;
        }

        return (result);
    }
}

export default UserRights;
