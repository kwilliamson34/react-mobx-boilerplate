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

		const items = array.filter((ele) => {
			return category.toLowerCase() == ele.device_category.toLowerCase();
		});

		const _category = category.replace('-', '').toLowerCase();

		return {
			items: items
		}
	}

	filterDeviceDetailData(device) {
		return {
			path: encodeURIComponent(device.device_title).replace(/%20/g, '+'),
			features: device.device_features,
			deviceName: device.device_title.replace(/&amp;/g, '&'),
			deviceImg: device.device_image_url,
			deviceImgAlt: device.device_image_alt,
			terms: device.device_tnc.length > 0 ? device.device_tnc : null
		}
	}

	filterPurchasingInfo(object) {
		let test = {
			contact_name: "Don Johnson",
			contact_company: "Fast 'n Hot Speedboats'",
			contact_phone: "1-555-IAM-VICE",
			contact_email: "don_the_heat@hotmail.com",
			contact_website: "http://www.fastnhotspeedboats.com"
		}
		return _.pick(test, Object.keys(test).filter((p) => p.includes('contact_')));
	}
}

export const externalDeviceContentService = new ExternalDeviceContentService();
