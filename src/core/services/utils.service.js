import config from 'config';

class UtilsService {
	conditionData(objs) {
		let simplifiedObjs = objs.filter((obj) => {
			if (obj.custom_metadata === null || (obj.custom_metadata && (obj.custom_metadata.user_segment === null || (obj.custom_metadata.user_segment && obj.custom_metadata.user_segment.length < 1)))) {
					return false;
				} else {
					return true;
				}
			}).map((obj) => {
					let simplifiedObj = {
						name: obj.app_name,
						publisher: obj.author,
						imageUrl: config.apperianUploads + obj.icon_path,
						rating: obj.rating,
						id: obj.id,
						app_psk: obj.app_psk,
						isAvailable: obj.isAvailable,
						isRecommended: obj.isRecommended,
						badge: obj.is_endorsed,
						operatingSystem: obj.operating_system,
						category: [],
						user_segment: [],
						screenshots: {
							mobile: [],
							tablet: []
						},
						reviews: obj.reviews
					}
					if (obj.custom_metadata) {
						simplifiedObj.category = obj.custom_metadata.category;
						simplifiedObj.user_segment = obj.custom_metadata.user_segment;
					}

					return simplifiedObj;
				})

			return simplifiedObjs;
	}

}

export const utilsService = new UtilsService();
