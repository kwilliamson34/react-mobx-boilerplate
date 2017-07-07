import _ from 'lodash';

class ExternalDeviceContentService {
	filterDeviceData(array) {
		return array.filter((device) => device.device_is_specialized === '1');
	}

	filterDeviceLandingData(array) {
		const devicesObj = {
			phones: [],
			tablets: [],
			invehicle: [],
			accessories: []
		}

		array.forEach((obj) => {
			let category = obj.device_category.replace('-', '').toLowerCase();
			devicesObj[category].push(obj);
		});
		return devicesObj;
	}

	filterDeviceCategoryData(array, category) {

		const _items = array.filter((ele) => {
			return category.toLowerCase() == ele.device_category.toLowerCase();
		});

		return {
			items: _items
		}
	}

	filterDeviceDetailData(device) {
		return {
			path: encodeURIComponent(device.device_title).replace(/%20/g, '+'),
			features: device.device_features,
			deviceName: device.device_title,
			deviceImg: device.device_image_url,
			deviceImgAlt: device.device_image_alt,
			terms: device.device_tnc.length > 0 ? device.device_tnc : null
		}
	}

	filterPurchasingInfo(object) {
		return _.pick(object, Object.keys(object).filter((p) => p.includes('contact_')));
	}
}

export const externalDeviceContentService = new ExternalDeviceContentService();
