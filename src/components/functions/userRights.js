class UserRights {
    init(email) {
        let result = [];
        switch (email)
        {
            case 'andres.guevara@deliveryhero.com':
                result.country = ['Colombia', 'Germany'];
                result.right = 'admin';
                break;
            case 'mats.diedrichsen@deliveryhero.com':
                result.country = ['Colombia', 'Germany'];
                result.right = 'admin';
                break;
            case 'sofia.tavares@deliveryhero.com':
                result.country = ['Colombia', 'Germany'];
                result.right = 'admin';
                break;
            case 'marina.kramer@deliveryhero.com':
                result.country = ['Colombia', 'Germany'];
                result.right = 'admin';
                break;
            case 'donwon.lee@deliveryhero.com':
                result.country = ['Colombia', 'Germany'];
                result.right = 'admin';
                break;
            case 'anna.permyakova@deliveryhero.com':
                result.country = ['Germany'];
                result.right = 'limited';
                break;
            case 'koviljka.neskovic@deliveryhero.com':
                result.country = ['Colombia'];
                result.right = 'admin';
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
