class GetKPIs {

    init(kpisNames) {

        let result = [];

        for (let i in kpisNames){
            let toPush = {};
            switch (kpisNames[i])
            {
                case 'Brand Relevance':
                    toPush = { name: 'Brand Relevance', nameInDB: 'brandRelevance', weight: 0.3 }
                    break;
                case 'Brand Recall':
                    toPush = { name: 'Brand Recall', nameInDB: 'brandRecall', weight: 0.3 }
                    break;
                case 'Relevance':
                    toPush = { name: 'Relevance', nameInDB: 'relevance', weight: 0.4 }
                    break;
                case 'Brand Fit':
                    toPush = { name: 'Brand Fit', nameInDB: 'brandFit', weight: 0.3 }
                    break;
                case 'Viewer Engagement':
                    toPush = { name: 'Viewer Engagement', nameInDB: 'viewerEngagement', weight: 0.4 }
                    break;
                case 'Ad Appeal':
                    toPush = { name: 'Ad Appeal', nameInDB: 'adAppeal', weight: 0.3 }
                    break;
                case 'Shareability':
                    toPush = { name: 'Shareability', nameInDB: 'shareability', weight: 0.1 }
                    break;
                case 'Call to action':
                    toPush = { name: 'Call to action', nameInDB: 'callToAction', weight: 0.6 }
                    break;
                case 'Ad Message':
                    toPush = { name: 'Ad Message', nameInDB: 'adMessage', weight: 0.3 }
                    break;
                case 'Tone of voice':
                    toPush = { name: 'Tone of voice', nameInDB: 'toneOfVoice', weight: 0.3 }
                    break;
                case 'Emotion':
                    toPush = { name: 'Emotion', nameInDB: 'emotion', weight: 0.3 }
                    break;
                case 'Uniqueness':
                    toPush = { name: 'Uniqueness', nameInDB: 'uniqueness', weight: 0.2 }
                    break;
                case 'Messaging':
                    toPush = { name: 'Messaging', nameInDB: 'messaging', weight: 0.2 }
                    break;
                case 'Total':
                    toPush = { name: 'Total', nameInDB: 'total', weight: 1 }
                    break;
                default:
                    break;
            }
            result.push(toPush);
        }
        return (result);
    }
}

export default GetKPIs;
