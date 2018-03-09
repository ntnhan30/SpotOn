import axios from 'axios';
import { Auth } from '../components/auth';

axios.defaults.baseURL = 'http://10.120.81.53:4000/api';
//axios.defaults.baseURL = 'http://localhost:4000/api';

class Api {
    constructor() {
        this.getAllAds =            '/spot';
        this.getAllCountryAds =     '/spot/country/';
        this.getSingleAd =          '/spot/';
        this.createAd =             '/spot/new';
        this.removeAd =             '/spot/remove';

        this.getResultsAd =         '/results/';
        this.createResults =        '/results/new';

        this.getAllKPIs =           '/kpi';
        this.getAllCountryKPIs =    '/kpi/country/';
        this.createKPIs =           '/kpi/new';

        this.auth = new Auth();
    }

    // Fetch all Ads from the server
    async fetchAds() {
        const profile = this.auth.getUserInfo();
        if (profile.right === 'limited'){
            let result = [];
            await Promise.all((profile.country).map(async country => {
                const { data } = await axios.get(this.getAllCountryAds + country);
                result = result.concat(data.ads)
            }));
            return result;
        } else {
            const { data } = await axios.get(this.getAllAds);
            return data.ads;
        }
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
                adname: bulk[bulkIndex]['Ad_name'],
                shortname: bulk[bulkIndex]['Short_name'],
                videourl: bulk[bulkIndex]['Video_URL'],
                industry: bulk[bulkIndex]['Industry'],
                brand: bulk[bulkIndex]['Brand'],
                country: bulk[bulkIndex]['Country'],
                campaigndate: bulk[bulkIndex]['Campaign_date'],
                lengthAd: bulk[bulkIndex]['Length'],
                channel: bulk[bulkIndex]['Channel'],
                productionState: bulk[bulkIndex]['Production_status'],
                state: bulk[bulkIndex]['State'],
                summary: bulk[bulkIndex]['Summary'],
                mainMessage: bulk[bulkIndex]['Main_message'],
            }).then(aumNum).catch(aumNum);
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
            if (bulkIndex === maxBulk){
                finished = true;
                return finished;
            }
        }
    }

    // Fetch all KPIs from the server
    async fetchKPIs() {
        const profile = this.auth.getUserInfo();
        console.log(profile.right);
        if (profile.right === 'limited'){
            return (await this.fetchCountryKPIs(profile.country));
        } else {
            const { data } = await axios.get(this.getAllKPIs);
            return data.KPIs;
        }
    }

    async fetchCountryKPIs(countries) {
        let result = [];
        await Promise.all((countries).map(async country => {
            const { data } = await axios.get(this.getAllCountryKPIs + country);
            result = result.concat(data.KPIs)
        }));
        return result;
    }

    // Create multiple Ads from an array
    async createKPI(arryOfKpis) {
        for ( let i in arryOfKpis ) {
            let kpis = arryOfKpis[i];
            await axios.post(this.createKPIs, {
                adID: kpis['Ad name'],
                brandRecall: kpis['Q1'],
                adAppeal: kpis['Q2'],
                toneOfVoice: kpis['Q3'],
                emotion: kpis['Q4'],
                uniqueness: kpis['Q5o1'],
                relevance: kpis['Q5o2'],
                shareability: kpis['Q5o3'],
                callToAction: kpis['Q6'],
                messaging: kpis['Q7'],
                brandFit: kpis['Q8'],
                brandRelevance: kpis['Brand Relevance'],
                viewerEngagement: kpis['Viewer Engagement'],
                adMessage: kpis['Ad Message'],
                total: kpis['Total'],
            });
        };
        return true;
    }
}

export default Api;
