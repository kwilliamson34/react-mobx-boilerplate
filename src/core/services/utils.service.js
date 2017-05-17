class UtilsService {

	static platform = {
		1: 'iOS',
		2: 'Android',
		102: 'Android',
		104: 'Android',
		3: 'Android',
		401: 'Android'
	}

	conditionData(objs) {
		let simplifiedObjs = objs.filter((obj) => {
			if (obj.custom_metadata === null || (obj.custom_metadata && (obj.custom_metadata.user_segment === null || (obj.custom_metadata.user_segment && obj.custom_metadata.user_segment.length < 1)))) {
				return false;
			} else {
				return true;
			}
		}).map((obj) => {
			let simplifiedObj = obj;
			simplifiedObj.name = obj.app_name;
			simplifiedObj.publisher = obj.author;
			simplifiedObj.imageUrl = 'https://ease.apperian.com/uploads/' + obj.icon_path; // TODO - move data base url to global endpoints; see also screenshots below
			simplifiedObj.rating = obj.rating;
			simplifiedObj.id = obj.id;
			simplifiedObj.psk = obj.app_psk;
			simplifiedObj.isAvailable = obj.isAvailable;
			simplifiedObj.isRecommended = obj.isRecommended
			simplifiedObj.badge = obj.is_endorsed;
			simplifiedObj.platforms = UtilsService.platform[obj.operating_system];
			simplifiedObj.category = [];
			simplifiedObj.user_segment = [];
			simplifiedObj.screenshots = {
				mobile: [],
				tablet: []
			};


			if (obj.custom_metadata) {
				simplifiedObj.category = obj.custom_metadata.category;
				simplifiedObj.user_segment = obj.custom_metadata.user_segment;
			}

			if (obj.mobileScreenshots) {
				simplifiedObj.screenshots.mobile = obj.mobileScreenshots.map((val) => {
					return {
						description: val.description,
						path: 'https://ease.apperian.com/uploads/' + val.path
					}
				});
			}

			if (obj.tabletScreenshots) {
				simplifiedObj.screenshots.tablet = obj.tabletScreenshots.map((val) => {
					return {
						description: val.description,
						path: 'https://ease.apperian.com/uploads/' + val.path
					}
				});
			}

			return simplifiedObj;
		})
		return simplifiedObjs;
	}

}

export const utilsService = new UtilsService();
