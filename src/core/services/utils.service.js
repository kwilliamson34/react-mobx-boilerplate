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
            let simplifiedObj = {
              name: obj.app_name,
              publisher: obj.author,
              imageUrl: 'https://ease.apperian.com/uploads/' + obj.icon_path, // TODO - move data base url to global endpoints
              rating: obj.rating,
              id: obj.id,
              psk: obj.app_psk,
              isAvailable: obj.isAvailable,
              isRecommended: obj.isRecommended,
              badge: obj.is_endorsed,
              platforms: UtilsService.platform[obj.operating_system],
              category: [],
              user_segment: [],
              screenshots: {
                mobile: obj.mobileScreenshots,
                tablet: obj.tabletScreenshots
              }
            };

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
