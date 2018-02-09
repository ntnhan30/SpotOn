import axios from 'axios';

//axios.defaults.baseURL = 'http://10.120.80.251:4000/api';
axios.defaults.baseURL = 'http://localhost:4000/api';

class Api {
    constructor() {
        this.getAllAds =    '/single';
        this.getSingleAd =  '/single/';
        this.createAd =     '/single/new';
        this.removeAd =     '/single/remove';

        this.getResultsAd =     '/results/';
        this.createResults =    '/results/new';
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
                S4a: bulk[bulkIndex]['S4a'],
                S4b: bulk[bulkIndex]['S4b'],
                VidDum: bulk[bulkIndex]['VidDum'],
                Q1: bulk[bulkIndex]['Q1'],
                Q2: bulk[bulkIndex]['Q2'],
                Q3r1: bulk[bulkIndex]['Q3r1'],
                Q3r2: bulk[bulkIndex]['Q3r2'],
                Q3r3: bulk[bulkIndex]['Q3r3'],
                Q3r4: bulk[bulkIndex]['Q3r4'],
                Q3r5: bulk[bulkIndex]['Q3r5'],
                Q3r6: bulk[bulkIndex]['Q3r6'],
                Q3r7: bulk[bulkIndex]['Q3r7'],
                Q3r8: bulk[bulkIndex]['Q3r8'],
                Q3r9: bulk[bulkIndex]['Q3r9'],
                Q3r10: bulk[bulkIndex]['Q3r10'],
                Q3r11: bulk[bulkIndex]['Q3r11'],
                Q3r12: bulk[bulkIndex]['Q3r12'],
                Q3r13: bulk[bulkIndex]['Q3r13'],
                Q3r14: bulk[bulkIndex]['Q3r14'],
                Q3r15: bulk[bulkIndex]['Q3r15'],
                Q3r16: bulk[bulkIndex]['Q3r16'],
                Q4r1: bulk[bulkIndex]['Q4r1'],
                Q4r2: bulk[bulkIndex]['Q4r2'],
                Q4r3: bulk[bulkIndex]['Q4r3'],
                Q4r4: bulk[bulkIndex]['Q4r4'],
                Q4r5: bulk[bulkIndex]['Q4r5'],
                Q4r6: bulk[bulkIndex]['Q4r6'],
                Q4r7: bulk[bulkIndex]['Q4r7'],
                Q4r8: bulk[bulkIndex]['Q4r8'],
                Q4r9: bulk[bulkIndex]['Q4r9'],
                Q4r10: bulk[bulkIndex]['Q4r10'],
                Q4r11: bulk[bulkIndex]['Q4r11'],
                Q4r12: bulk[bulkIndex]['Q4r12'],
                Q5o1: bulk[bulkIndex]['Q5o1'],
                Q5o2: bulk[bulkIndex]['Q5o2'],
                Q5o3: bulk[bulkIndex]['Q5o3'],
                Q6: bulk[bulkIndex]['Q6'],
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
                Q8: bulk[bulkIndex]['Q8'],
                S5: bulk[bulkIndex]['S5']
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
