import cheerio from 'cheerio';

class ExternalDeviceContentService {

	cleanupDrupalTextReturn(str) {
		return (str) ? str.replace(/(\r\n|\n|\r|\t)/gm, '').trim() : '';
	}

	filterDeviceLandingData(htmlNode) {
		const $ = cheerio.load(htmlNode);
		const devicesObj = {
			phones: [],
			tablets: [],
			invehicle: [],
			accessories: []
		}

		const deviceRegions = [{
				section: devicesObj.phones,
				selector: '.bs-region[class*=bs-region--row-3-col]'
			},
			{
				section: devicesObj.tablets,
				selector: '.bs-region[class*=bs-region--row-4-col]'
			},
			{
				section: devicesObj.invehicle,
				selector: '.bs-region[class*=bs-region--row-5-col]'
			},
			{
				section: devicesObj.accessories,
				selector: '.bs-region[class*=bs-region--row-6-col]'
			}
		];

		deviceRegions.map((device) => {
			const cards = $(device.selector);
			cards.each(id => {
				const card = $(cards[id]);
				device.section.push({
					url: card.find('.atoms__link-field').attr('href'),
					title: card.find('.field--name-field-title').text(),
					image: card.find('.card__image-inner img').attr('src')
				})
			});
		});

		return devicesObj;
	}

	filterDeviceCategoryData(htmlNode) {
		const $ = cheerio.load(htmlNode);
		const cleanup = new ExternalDeviceContentService().cleanupDrupalTextReturn;
		const categoryObj = {
			title: cleanup($('.region-title').text()),
			intro: cleanup($('.region-description').html()),
			items: []
		};
		const cards = $('.molecules__image-card');
		cards.each(id => {
			const cardNode = $(cards[id]);
			const img = cardNode.find('.card__image-inner img');
			categoryObj.items.push({
				url: cardNode.find('.atoms__link-field').attr('href'),
				title: cleanup(cardNode.find('.card__title .atoms__text-field').text()),
				image: img.attr('src'),
				alt: img.attr('alt')
			});
		});
		return categoryObj;
	}

	filterDeviceDetailData(htmlNode) {
		const $ = cheerio.load(htmlNode);
		const cleanup = new ExternalDeviceContentService().cleanupDrupalTextReturn;
		const dtlImg = $('.fnmp__device-detail .article__image > img');
		const deviceDtl = {
			deviceName: cleanup($('.article__title div.atoms__text-field').text()),
			deviceImg: dtlImg.attr('src'),
			deviceImgAlt: dtlImg.attr('alt'),
			terms: cleanup($('.article__tnc .atoms__text-field').html()),
			features: []
		};
		const featuresList = $('.article__features li.atoms__list-item');
		featuresList.each(id => {
			deviceDtl.features.push(cleanup($(featuresList[id]).html()));
		});

		return deviceDtl;
	}

}

export const externalDeviceContentService = new ExternalDeviceContentService();
