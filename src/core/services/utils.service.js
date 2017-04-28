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
            if(obj.custom_metadata === null || (obj.custom_metadata && (obj.custom_metadata.user_segment === null || (obj.custom_metadata.user_segment && obj.custom_metadata.user_segment.length < 1)))){
                return false;
            } else {
                return true;
            }
        }).map((obj) => {
            let simplifiedObj = {};
            simplifiedObj.name = obj.app_name;
            simplifiedObj.publisher = obj.author;
            // TODO - move data base url to global endpoints
            simplifiedObj.imageUrl = 'https://ease.apperian.com/uploads/'+obj.icon_path;
            simplifiedObj.rating = obj.rating;
            simplifiedObj.id = obj.id;
            simplifiedObj.badge = obj.is_endorsed;
            simplifiedObj.platforms = UtilsService.platform[obj.operating_system];
            if (obj.custom_metadata) {
                simplifiedObj.category = obj.custom_metadata.category;
                simplifiedObj.user_segment = obj.custom_metadata.user_segment;
            } else {
                simplifiedObj.category = [];
                simplifiedObj.user_segment = [];
            }
            if(!obj.is_Available){ simplifiedObj.available = true; }
            if(!obj.is_Recommended){
                simplifiedObj.recommended = false;
            } else {
                simplifiedObj.recommended = obj.is_Recommended;
            }
            return simplifiedObj;
        })
        return simplifiedObjs;
    }

}

export const utilsService = new UtilsService();