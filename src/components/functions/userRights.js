class UserRights {
    init(email) {
        let result = [];
        switch (email)
        {
            case 'mats.diedrichsen@deliveryhero.com':
            case 'dan.zbijowski@deliveryhero.com':
            case 'andres.guevara@deliveryhero.com':
            case 'sofia.tavares@deliveryhero.com':
            case 'marina.kramer@deliveryhero.com':
            case 'donwon.lee@deliveryhero.com':
            case 'michael.wicke@deliveryhero.com':
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
