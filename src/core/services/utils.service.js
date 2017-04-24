
class UtilsService {

    conditionData(objs) {
        let simplifiedObjs = objs.map((obj) => {
            let simplifiedObj = {};
            simplifiedObj.name = obj.name;
            simplifiedObj.imageUrl = obj.icon_path;
            simplifiedObj.rating = obj.average_rev_rating;
            if (obj.custom_metadata) {
                simplifiedObj.publisher = obj.custom_metadata.author;
                simplifiedObj.badge = obj.custom_metadata.is_FirstNetEndorsed;
                simplifiedObj.platforms = obj.custom_metadata.operating_system;
                simplifiedObj.category = obj.custom_metadata.category;
            } else {
                simplifiedObj.publisher = "";
                simplifiedObj.badge = false;
                simplifiedObj.platforms = "";
                simplifiedObj.category = [];
            }
            return simplifiedObj;
        })
        return simplifiedObjs;
    }

}

export const utilsService = new UtilsService();
