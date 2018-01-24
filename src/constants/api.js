import axios from 'axios';

//axios.defaults.baseURL = 'http://10.120.80.251:4000/api';
axios.defaults.baseURL = 'http://localhost:4000/api';

class Api {
    constructor() {
        this.getAllAds = '/ads';
        this.getResultsOfAd = `/ads/${this.adId}/results`;
        this.createAd = '/ads/new';
    }

    async fetchAds() {
        const { data } = await axios.get(this.getAllAds);
        return data.ads;
    }

    async fetchResultsFromAd() {
        const { data } = await axios.get(this.getAllAds);
        return data.ads;
    }

    async createBulkAds(bulk) {
        let bulkIndex = 0;
        let maxBulk = bulk.length - 1;
        while (bulkIndex <= maxBulk) {
            await axios.post(this.createAd, {
                adname: bulk[bulkIndex]['Ad name'],
                shortname: bulk[bulkIndex]['Short name'],
                videourl: bulk[bulkIndex]['Video URL'],
                industry: bulk[bulkIndex]['Industry'],
                brand: bulk[bulkIndex]['Brand'],
                country: bulk[bulkIndex]['Country'],
                campaigndate: bulk[bulkIndex]['Campaign date'],
                lengthAd: bulk[bulkIndex]['Length'],
                channel: bulk[bulkIndex]['Channel'],
                productionState: bulk[bulkIndex]['Production status'],
                state: bulk[bulkIndex]['State'],
            });
            bulkIndex++;
        }
        return true;
    }
}

export {
    Api
};
