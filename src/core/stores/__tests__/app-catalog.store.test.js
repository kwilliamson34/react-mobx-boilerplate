jest.unmock('../app-catalog.store');
jest.unmock('../card-list.store');
jest.unmock('axios');

import {observable, useStrict} from 'mobx';
import { appCatalogStore } from '../app-catalog.store';
import {apiService} from '../../services/api.service';

const store = appCatalogStore;
const mockCatalogArray = [{
	"name": "NOAA Weather Radar & Alerts",
	"publisher": "Apalon Apps",
	"imageUrl": "https://ease.apperian.com/uploads/https://ease.apperian.com/uploads/org_5945/android_market_62864/appIcon.png",
	"rating": 4,
	"reviews_count": 1,
	"id": "6X6lup_0N2jMZDO44MQ6rQ",
	"app_psk": "62864",
	"isAvailable": null,
	"isRecommended": null,
	"mdm_install_status": "NOT_INSTALLED",
	"badge": false,
	"operatingSystem": "ANDROID",
	"category": ["VIDEO SURVEILLANCE"],
	"user_segment": ["LAW ENFORCEMENT"],
	"screenshots": {
		"mobile": [],
		"tablet": []
	}
}, {
	"name": "Workforce Manager for AT&T",
	"publisher": "Actsoft, Inc",
	"imageUrl": "https://ease.apperian.com/uploads/https://ease.apperian.com/uploads/org_5945/appstore_73869/version_238189/appIcon.png",
	"rating": null,
	"reviews_count": 0,
	"id": "11uk0GVCGndE-g-gsWfQfg",
	"app_psk": "73869",
	"isAvailable": true,
	"isRecommended": null,
	"mdm_install_status": "NOT_INSTALLED",
	"badge": false,
	"operatingSystem": "IOS",
	"category": ["PUBLIC SAFETY (COMMUNICATION)TOOLS"],
	"user_segment": ["LAW ENFORCEMENT"],
	"screenshots": {
		"mobile": [],
		"tablet": []
	}
}, {
	"name": "RealNews",
	"publisher": "RealNews",
	"imageUrl": "https://ease.apperian.com/uploads/https://ease.apperian.com/uploads/org_5945/android_72299/version_230085/logo.png",
	"rating": 3,
	"reviews_count": 2,
	"id": "JmkdgEwJQI11uv9hJUdzSA",
	"app_psk": "72299",
	"isAvailable": true,
	"isRecommended": true,
	"mdm_install_status": "NOT_INSTALLED",
	"badge": true,
	"operatingSystem": "ANDROID",
	"category": ["IN BUILDING COVERAGE & MAPPING", "CYBER SECURITY & FRAUD DETECTION"],
	"user_segment": ["CRITICAL INFRASTRUCTURE"],
	"screenshots": {
		"mobile": [],
		"tablet": []
	}
}, {
	"name": "Doctors R Cool",
	"publisher": "Evan Kanter",
	"imageUrl": "https://ease.apperian.com/uploads/https://ease.apperian.com/uploads/org_5945/iphone_73650/AppIcon-260x60@3x.png",
	"rating": null,
	"reviews_count": 0,
	"id": "i_yBfWe9sOIZozm7rKM3eg",
	"app_psk": "73650",
	"isAvailable": true,
	"isRecommended": true,
	"mdm_install_status": "NOT_INSTALLED",
	"badge": false,
	"operatingSystem": "IOS",
	"category": ["DEVICE SECURITY", "SECURE CONNECTIONS", "CLOUD SOLUTIONS", "NEXT GEN 9-1-1", "CAD SOLUTIONS", "VIDEO SURVEILLANCE", "IN BUILDING COVERAGE & MAPPING", "SITUATIONAL AWARENESS & DETECTION", "CYBER SECURITY & FRAUD DETECTION", "FORENSIC INTELLIGENCE", "PUBLIC SAFETY COMMUNITY"],
	"user_segment": ["LAW ENFORCEMENT", "FIRE & RESCUE", "EMERGENCY MEDICAL", "HAZMAT DISPATCH", "EMERGENCY MANAGEMENT", "CRITICAL INFRASTRUCTURE"],
	"screenshots": {
		"mobile": [],
		"tablet": []
	}
}];

describe("AppCatalogStore", () => {

  apiService.getAdminApps = jest.fn()
    .mockReturnValueOnce(new Promise( resolve => resolve(mockCatalogArray) ));

		beforeEach(() => {
			//turn off strict mode when testing with mock store
			useStrict(false);
			return store.fetchAppCatalog();
		});

  test("fetches App Catalog", () => {
    expect(store.allApps.length).toBe(4);
  });


});
