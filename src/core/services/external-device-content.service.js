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

		//TODO: temporary hardcoding. This will require a separate API from Marketing Portal, which is in development.
		const allTitles = {
			accessories: 'Accessories to complement handsets, laptops, vehicles and premium devices',
			phones: 'Rugged and smart devices connect first responders with advanced video, data, apps and countless other public safety functions',
			tablets: 'All the screen needed to access apps and information to help make decisions faster and better',
			invehicle: 'Add more ability to your mobility with reliable and connected in-vehicle tools'
		}

		const allIntros = {
			accessories: 'Check out a select sampling of our accessories portfolio. To learn more about our full portfolio and pricing details, contact a FirstNet Specialist.',
			phones: 'Check out a select sampling of our smartphone and rugged device portfolio. To learn more about our full portfolio and pricing details, contact a FirstNet Specialist.',
			tablets: 'Check out a select sampling of our tablet portfolio. To learn more about our full portfolio and pricing details, contact a FirstNet Specialist.',
			invehicle: 'Check out a select sampling of our in-vehicle device portfolio. To learn more about our full in-vehicle portfolio and pricing details, contact a FirstNet Specialist.'
		}

		const items = array.filter((ele) => {
			return category.toLowerCase() == ele.device_category.toLowerCase();
		});

		const _category = category.replace('-', '').toLowerCase();

		return {
			title: allTitles[_category],
			intro: allIntros[_category],
			items: items
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

	filterDevicePurchasingInfo(device) {
		return _.pick(device, Object.keys(device).filter((p) => p.includes('contact_')));
	}
}

export const externalDeviceContentService = new ExternalDeviceContentService();
