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
			phones: 'Phones',
			tablets: 'All the screen needed to access apps and information to help make decisions faster and better',
			invehicle: 'Add more ability to your mobility with reliable and connected in-vehicle tools'
		}

		const allIntros = {
			accessories: 'Check out a select sampling of our accessories portfolio. To learn more about our full portfolio and pricing details, contact a FirstNet Specialist.',
			phones: 'Rugged and smart devices connect first responders with advanced video, data, apps and countless other public safety functions',
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
		let test = {
			contact_name: "Don Johnson",
			contact_company: "Fast 'n Hot Speedboats",
			contact_phone: "1-555-IAM-VICE",
			contact_email: "don_the_heat@hotmail.com",
			contact_website: "http://www.fastnhotspeedboats.com",
		}

		// let test = {
		// 	contact_name: "Don Johnson",
		// 	contact_company: "",
		// 	contact_phone: "",
		// 	contact_email: "don_the_heat@hotmail.com",
		// 	contact_website: "http://www.fastnhotspeedboats.com",
		// }

		// let test = {
		// 	contact_name: "",
		// 	contact_company: "",
		// 	contact_phone: "",
		// 	contact_email: "",
		// 	contact_website: "",
		// }

		//TODO: switch back to device
		let _contactInfo = _.pick(test, Object.keys(test).filter((p) => p.includes('contact_')));
		console.log(_contactInfo);
		return {
			path: encodeURIComponent(device.device_title).replace(/%20/g, '+'),
			features: device.device_features,
			deviceName: device.device_title,
			deviceImg: device.device_image_url,
			deviceAlt: device.device_image_alt,
			terms: device.device_tnc.length > 0 ? device.device_tnc : null,
			contactInfo: _contactInfo
		}
	}

	// cleanupDrupalTextReturn(str) {
	// 	return (str) ? str.replace(/(\r\n|\n|\r|\t)/gm, '').trim() : '';
	// }
	//
	// filterDeviceLandingData(htmlNode) {
	// 	const $ = cheerio.load(htmlNode);
	// 	const devicesObj = {
	// 		phones: [],
	// 		tablets: [],
	// 		invehicle: [],
	// 		accessories: []
	// 	}
	//
	// 	const deviceRegions = [{
	// 			section: devicesObj.phones,
	// 			selector: '.bs-region[class*=bs-region--row-3-col]'
	// 		},
	// 		{
	// 			section: devicesObj.tablets,
	// 			selector: '.bs-region[class*=bs-region--row-4-col]'
	// 		},
	// 		{
	// 			section: devicesObj.invehicle,
	// 			selector: '.bs-region[class*=bs-region--row-5-col]'
	// 		},
	// 		{
	// 			section: devicesObj.accessories,
	// 			selector: '.bs-region[class*=bs-region--row-6-col]'
	// 		}
	// 	];
	//
	// 	deviceRegions.map((device) => {
	// 		const cards = $(device.selector);
	// 		cards.each(id => {
	// 			const card = $(cards[id]);
	// 			device.section.push({
	// 				url: card.find('.atoms__link-field').attr('href'),
	// 				title: card.find('.field--name-field-title').text(),
	// 				image: card.find('.card__image-inner img').attr('src')
	// 			})
	// 		});
	// 	});
	//
	// 	return devicesObj;
	// }
	//
	// filterDeviceCategoryData(htmlNode) {
	// 	const $ = cheerio.load(htmlNode);
	// 	const cleanup = new ExternalDeviceContentService().cleanupDrupalTextReturn;
	// 	const categoryObj = {
	// 		title: cleanup($('.region-title').text()),
	// 		intro: cleanup($('.region-description').html()),
	// 		items: []
	// 	};
	// 	const cards = $('.molecules__image-card');
	// 	cards.each(id => {
	// 		const cardNode = $(cards[id]);
	// 		const img = cardNode.find('.card__image-inner img');
	// 		categoryObj.items.push({
	// 			url: cardNode.find('.atoms__link-field').attr('href'),
	// 			title: cleanup(cardNode.find('.card__title .atoms__text-field').text()),
	// 			image: img.attr('src'),
	// 			alt: img.attr('alt')
	// 		});
	// 	});
	// 	return categoryObj;
	// }
	//
	// filterDeviceDetailData(htmlNode) {
	// 	const $ = cheerio.load(htmlNode);
	// 	const cleanup = new ExternalDeviceContentService().cleanupDrupalTextReturn;
	// 	const dtlImg = $('.fnmp__device-detail .article__image > img');
	// 	const deviceDtl = {
	// 		deviceName: cleanup($('.article__title div.atoms__text-field').text()),
	// 		deviceImg: dtlImg.attr('src'),
	// 		deviceImgAlt: dtlImg.attr('alt'),
	// 		terms: cleanup($('.article__tnc .atoms__text-field').html()),
	// 		features: []
	// 	};
	// 	const featuresList = $('.article__features li.atoms__list-item');
	// 	featuresList.each(id => {
	// 		deviceDtl.features.push(cleanup($(featuresList[id]).html()));
	// 	});
	//
	// 	return deviceDtl;
	// }

}

export const externalDeviceContentService = new ExternalDeviceContentService();
