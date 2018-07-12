import FoodDeliveryPicture1 from '../../Assets/imgs/singleAd/foodDelivery_picture_1.png'
import FoodDeliveryPicture2 from '../../Assets/imgs/singleAd/foodDelivery_picture_2.png'
import FoodDeliveryPicture3 from '../../Assets/imgs/singleAd/foodDelivery_picture_3.png'
import FoodDeliveryPicture4 from '../../Assets/imgs/singleAd/foodDelivery_picture_4.png'
import NonFoodOfflinePicture1 from '../../Assets/imgs/singleAd/nonFoodOffline_picture_1.png'
import NonFoodOfflinePicture2 from '../../Assets/imgs/singleAd/nonFoodOffline_picture_2.png'
import NonFoodOfflinePicture3 from '../../Assets/imgs/singleAd/nonFoodOffline_picture_3.png'
import NonFoodOfflinePicture4 from '../../Assets/imgs/singleAd/nonFoodOffline_picture_4.png'
import OfflineFoodPicture1 from '../../Assets/imgs/singleAd/offlineFood_picture_1.png'
import OfflineFoodPicture2 from '../../Assets/imgs/singleAd/offlineFood_picture_2.png'
import OfflineFoodPicture3 from '../../Assets/imgs/singleAd/offlineFood_picture_3.png'
import OfflineFoodPicture4 from '../../Assets/imgs/singleAd/offlineFood_picture_4.png'
import OnlineOrderingPicture1 from '../../Assets/imgs/singleAd/onlineOrdering_picture_1.png'
import OnlineOrderingPicture2 from '../../Assets/imgs/singleAd/onlineOrdering_picture_2.png'
import OnlineOrderingPicture3 from '../../Assets/imgs/singleAd/onlineOrdering_picture_3.png'
import OnlineOrderingPicture4 from '../../Assets/imgs/singleAd/onlineOrdering_picture_4.png'

var _ = require('lodash')

class ImageOfAd {
	/**
	 * Get a color to use for the charts.
	 *
	 * @param {Int} num              Key of the color
	 * @returns {String}             The color in HEX to use
	 */

	constructor() {
		this.foodDelivery = [
			FoodDeliveryPicture1,
			FoodDeliveryPicture2,
			FoodDeliveryPicture3,
			FoodDeliveryPicture4
		]
		this.nonFoodOffline = [
			NonFoodOfflinePicture1,
			NonFoodOfflinePicture2,
			NonFoodOfflinePicture3,
			NonFoodOfflinePicture4
		]
		this.offlineFood = [
			OfflineFoodPicture1,
			OfflineFoodPicture2,
			OfflineFoodPicture3,
			OfflineFoodPicture4
		]
		this.onlineOrdering = [
			OnlineOrderingPicture1,
			OnlineOrderingPicture2,
			OnlineOrderingPicture3,
			OnlineOrderingPicture4
		]
	}

	getRandomImage = industry => {
		let imageToReturn = ''
		switch (industry) {
			case 'Food delivery':
				imageToReturn = _.sample(this.foodDelivery)
				break
			case 'Non-food offline':
				imageToReturn = _.sample(this.nonFoodOffline)
				break
			case 'Offline food':
				imageToReturn = _.sample(this.offlineFood)
				break
			case 'Online ordering':
				imageToReturn = _.sample(this.onlineOrdering)
				break
			default:
		}
		return imageToReturn
	}
}

export default ImageOfAd
