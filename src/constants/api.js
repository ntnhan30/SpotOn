import axios from 'axios';

//axios.defaults.baseURL = 'http://10.120.80.251:4000/api';
axios.defaults.baseURL = 'http://localhost:4000/api';

class Api {
    constructor() {
        this.getAllAds = '/ads';
        this.getSingleAd = '/ads/';
        this.createAd = '/ads/new';
        this.removeAd = '/ads/remove';

        this.getResultsAd = '/results/';
        this.createResults = '/results/new';
    }

    // Fetch all Ads from the server
    async fetchAds() {
        const { data } = await axios.get(this.getAllAds);
        return data.ads;
    }

    // Fetch a single Ad from the server using the "adname"
    async fetchSingleAd(adname) {
        const { data } = await axios.get(this.getSingleAd + adname);
        return data;
    }

    // Create multiple Ads from an array
    async createBulkAds(bulk) {
        let finished = false;
        let bulkIndex = 0;
        let maxBulk = bulk.length - 1;
        const aumNum = () => {
            bulkIndex++;
        }
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
            }).then(aumNum).catch(aumNum);
            //bulkIndex++;
            if (bulkIndex === maxBulk){
                finished = true;
                return finished;
            }
        }
        return true;
    }

    // Remove a single Ad from the server using the "adname"
    async deleteAd(adname) {
        const { data } = await axios.post(this.removeAd, {
            adname: adname
        });
        return !(data.error);
    }

    // Fetch Results from single Ad
    async fetchResultsFromAd(adname) {
        const { data } = await axios.get(this.getResultsAd + adname);
        return data.results;
    }

    // Create multiple Results from an array
    async createBulkResults(bulk) {
        let finished = false;
        let bulkIndex = 0;
        let maxBulk = bulk.length - 1;
        const aumNum = () => {
            bulkIndex++;
        }
        while (bulkIndex <= maxBulk) {
            await axios.post(this.createResults, {
                U_id: bulk[bulkIndex]['U_id'],
                S1_Dummy: bulk[bulkIndex]['S1_Dummy'],
                S2: bulk[bulkIndex]['S2'],
                S3: bulk[bulkIndex]['S3'],
                vidDum: bulk[bulkIndex]['vidDum'],
                Q5r1: bulk[bulkIndex]['Q5r1'],
                Q6r1: bulk[bulkIndex]['Q6r1'],
                Q6r2: bulk[bulkIndex]['Q6r2'],
                Q6r3: bulk[bulkIndex]['Q6r3'],
                Q6r4: bulk[bulkIndex]['Q6r4'],
                Q6r5: bulk[bulkIndex]['Q6r5'],
                Q6r6: bulk[bulkIndex]['Q6r6'],
                Q6r7: bulk[bulkIndex]['Q6r7'],
                Q6r8: bulk[bulkIndex]['Q6r8'],
                Q6r9: bulk[bulkIndex]['Q6r9'],
                Q6r10: bulk[bulkIndex]['Q6r10'],
                Q6r11: bulk[bulkIndex]['Q6r11'],
                Q6r12: bulk[bulkIndex]['Q6r12'],
                Q6r13: bulk[bulkIndex]['Q6r13'],
                Q6r14: bulk[bulkIndex]['Q6r14'],
                Q6r15: bulk[bulkIndex]['Q6r15'],
                Q6r16: bulk[bulkIndex]['Q6r16'],
                Q6r17: bulk[bulkIndex]['Q6r17'],
                Q6r18: bulk[bulkIndex]['Q6r18'],
                Q6r19: bulk[bulkIndex]['Q6r19'],
                Q7r1: bulk[bulkIndex]['Q7r1'],
                Q7r2: bulk[bulkIndex]['Q7r2'],
                Q7r3: bulk[bulkIndex]['Q7r3'],
                Q7r4: bulk[bulkIndex]['Q7r4'],
                Q7r5: bulk[bulkIndex]['Q7r5'],
                Q7r6: bulk[bulkIndex]['Q7r6'],
                Q7r7: bulk[bulkIndex]['Q7r7'],
                Q7r8: bulk[bulkIndex]['Q7r8'],
                Q7r9: bulk[bulkIndex]['Q7r9'],
                Q7r10: bulk[bulkIndex]['Q7r10'],
                Q7r11: bulk[bulkIndex]['Q7r11'],
                Q8r1: bulk[bulkIndex]['Q8r1'],
                Q8r2: bulk[bulkIndex]['Q8r2'],
                Q8r3: bulk[bulkIndex]['Q8r3'],
                Q8r4: bulk[bulkIndex]['Q8r4'],
                Q8r5: bulk[bulkIndex]['Q8r5'],
                Q9: bulk[bulkIndex]['Q9'],
                Q10ar1: bulk[bulkIndex]['Q10ar1'],
                Q10br1: bulk[bulkIndex]['Q10br1'],
                Q11: bulk[bulkIndex]['Q11'],
                S5: bulk[bulkIndex]['S5'],
                S6: bulk[bulkIndex]['S6'],
                S7: bulk[bulkIndex]['S7'],
                S8: bulk[bulkIndex]['S8'],
                S9: bulk[bulkIndex]['S9'],
            }).then(aumNum).catch(aumNum);
            //bulkIndex++;
            if (bulkIndex === maxBulk){
                finished = true;
                return finished;
            }
        }
    }
}

export default Api;
