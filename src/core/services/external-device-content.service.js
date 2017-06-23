import cheerio from 'cheerio';
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
		// let test = {
		// 	contact_name: "Don Johnson",
		// 	contact_company: "Fast 'n Hot Speedboats",
		// 	contact_phone: "1-555-IAM-VICE",
		// 	contact_email: "the_heat@hotmail.com",
		// 	contact_website: "http://bananas.fastnhotspeedboats.com",
		// }

		let test = {
			contact_name: "Don Johnson",
			contact_company: "",
			contact_phone: "",
			contact_email: "don_the_heat@hotmail.com",
			contact_website: "http://www.fastnhotspeedboats.com",
		}

		// let test = {
		// 	contact_name: "",
		// 	contact_company: "",
		// 	contact_phone: "",
		// 	contact_email: "",
		// 	contact_website: "",
		// }

		let testTNC = '<ol><li>Available space is less and varies due to many factors. A standard configuration uses approximately 4GB to 6GB of space (including iOS and built-in apps) depending on the model and settings.<\/li>\n\t<li>Size and weight vary by configuration and manufacturing process.<\/li>\n\t<li>FaceTime calling requires a FaceTime-enabled device for the caller and recipient and a Wi-Fi connection. Availability over a cellular network depends on carrier policies; data charges may apply.<\/li>\n\t<li>Data plan required. LTE Advanced, LTE, and Wi-Fi calling are available in select markets and through select carriers. Speeds are based on theoretical throughput and vary based on site conditions and carrier. For details on LTE support, contact AT&amp;T and see <a href=\"https:\/\/www.apple.com\/iphone\/LTE\">www.apple.com\/iphone\/LTE<\/a>.<\/li>\n\t<li>Cellular data plan is sold separately. Cellular data service is available only on Wi-Fi + Cellular models. The model you purchase is configured to work with a particular cellular network technology. Check with AT&amp;T for compatibility and cellular data plan availability.<\/li>\n\t<li>Embedded Apple SIM in iPad Pro (9.7-inch) may be disabled when purchased from some carriers. See AT&amp;T for details. Apple SIM and embedded Apple SIM not available in China.<\/li>\n\t<li>Battery life varies by use and configuration. See <a href=\"https:\/\/www.apple.com\/batteries\">www.apple.com\/batteries<\/a> for more information.<\/li>\n<\/ol><p>TM and \u00a9 2017 Apple Inc. All rights reserved.<\/p>';

		// device.device_tnc.length > 0 ? device.device_tnc : null

		//TODO: switch back to device
		let _contactInfo = _.pick(test, Object.keys(test).filter((p) => p.includes('contact_')));
		console.log(_contactInfo);
		return {
			path: encodeURIComponent(device.device_title).replace(/%20/g, '+'),
			features: device.device_features,
			deviceName: device.device_title,
			deviceImg: device.device_image_url,
			deviceImgAlt: device.device_image_alt,
			terms: testTNC,
			contactInfo: _contactInfo
		}
	}
}

export const externalDeviceContentService = new ExternalDeviceContentService();
