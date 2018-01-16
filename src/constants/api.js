import axios from 'axios';

//axios.defaults.baseURL = 'http://10.120.80.251:4000/api';
axios.defaults.baseURL = 'http://localhost:4000/api';

//const fakeGroupID = '59c52613b824f142c0e7ee96';

class Api {
    constructor() {
        //this.path = `/groups/${this.groupId}/meetups`;
        this.getAllAds = '/ads';
        this.getResultsOfAd = `/ads/${this.adId}/results`;
    }

    async fetchAds() {
        const { data } = await axios.get(this.getAllAds);
        return data.ads;
    }

    async fetchResultsFromAd() {
        const { data } = await axios.get(this.getAllAds);
        return data.ads;
    }
}

export {
    Api
};
/*
export const fetchMeetups = () => {
    return fetch('http://10.120.80.251:3000/api/meetups')
        .then((response) => {
            if (response) {
                return response.json();
            } else {
                throw new Error('Server response wasn\'t OK');
            }
        })
        .then((json) => {
            return json;
        });
}
*/
