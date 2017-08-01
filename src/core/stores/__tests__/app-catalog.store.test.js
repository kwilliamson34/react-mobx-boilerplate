jest.unmock('../app-catalog.store');
jest.unmock('axios');

import { observable, useStrict } from 'mobx';
import { appCatalogStore } from '../app-catalog.store';
import { apiService } from '../../services/api.service';

const store = appCatalogStore;
store.currentAppObject = {};
store.allApps = [];

const mockCatalogArray = [
	{
		name: 'NOAA Weather Radar & Alerts',
		publisher: 'Apalon Apps',
		rating: 4,
		reviews_count: 1,
		id: '6X6lup_0N2jMZDO44MQ6rQ',
		app_psk: '62864',
		isAvailable: null,
		isRecommended: null,
		mdm_install_status: 'NOT_INSTALLED',
		badge: false,
		operatingSystem: 'ANDROID',
		category: ['VIDEO SURVEILLANCE'],
		user_segment: ['LAW ENFORCEMENT'],
		screenshots: {
			mobile: [],
			tablet: []
		},
		version: {
			version_note: 'note',
			release_date: '20111031'
		}
	},
	{
		name: 'Workforce Manager for AT&T',
		publisher: 'Actsoft, Inc',
		rating: null,
		reviews_count: 0,
		id: '11uk0GVCGndE-g-gsWfQfg',
		app_psk: '73869',
		isAvailable: true,
		isRecommended: null,
		mdm_install_status: 'NOT_INSTALLED',
		badge: false,
		operatingSystem: 'IOS',
		category: ['PUBLIC SAFETY (COMMUNICATION)TOOLS'],
		user_segment: ['LAW ENFORCEMENT'],
		screenshots: {
			mobile: [],
			tablet: []
		},
		version: {
			version_note: 'note',
			release_date: '20111031'
		}
	},
	{
		name: 'RealNews',
		publisher: 'RealNews',
		rating: 3,
		reviews_count: 2,
		id: 'JmkdgEwJQI11uv9hJUdzSA',
		app_psk: '72299',
		isAvailable: true,
		isRecommended: true,
		mdm_install_status: 'NOT_INSTALLED',
		badge: true,
		operatingSystem: 'ANDROID',
		category: [
			'IN BUILDING COVERAGE & MAPPING',
			'CYBER SECURITY & FRAUD DETECTION'
		],
		user_segment: ['CRITICAL INFRASTRUCTURE'],
		screenshots: {
			mobile: [],
			tablet: []
		},
		version: {
			version_note: 'note',
			release_date: '20111031'
		}
	},
	{
		name: 'Doctors R Cool',
		publisher: 'Evan Kanter',
		rating: null,
		reviews_count: 0,
		id: 'i_yBfWe9sOIZozm7rKM3eg',
		app_psk: '25',
		isAvailable: true,
		isRecommended: true,
		mdm_install_status: 'NOT_INSTALLED',
		badge: false,
		operatingSystem: 'IOS',
		category: [
			'DEVICE SECURITY',
			'SECURE CONNECTIONS',
			'CLOUD SOLUTIONS',
			'NEXT GEN 9-1-1',
			'CAD SOLUTIONS',
			'VIDEO SURVEILLANCE',
			'IN BUILDING COVERAGE & MAPPING',
			'SITUATIONAL AWARENESS & DETECTION',
			'CYBER SECURITY & FRAUD DETECTION',
			'FORENSIC INTELLIGENCE',
			'PUBLIC SAFETY COMMUNITY'
		],
		user_segment: [
			'LAW ENFORCEMENT',
			'FIRE & RESCUE',
			'EMERGENCY MEDICAL',
			'HAZMAT DISPATCH',
			'EMERGENCY MANAGEMENT',
			'CRITICAL INFRASTRUCTURE'
		],
		screenshots: {
			mobile: [],
			tablet: []
		},
		version: {
			version_note: 'note',
			release_date: '20111031',
			version_num: '2.6.0'
		}
	}
];

const mockAppDetail = {
	mobileScreenshots: [
		{
			description: 'Mobile Screenshot_test',
			path:
				'https://image.png'
		}
	],
	tabletScreenshots: [],
	isInternalApp: true,
	rating: 5,
	isAvailable: true,
	isRecommended: false,
	id: 'Puco4dE1AhP82HqYSna94g',
	icon_path:
		'path/to/image.png',
	custom_metadata: {
		searchText: 'automation_script_created_app',
		device: 'mobile',
		title: '',
		description: '',
		projects: '',
		category: ['SECURE CONNECTIONS', 'VIDEO SURVEILLANCE'],
		user_segment: ['LAW ENFORCEMENT'],
		aboutApp: '',
		tablet_1_description: '',
		tablet_2_description: '',
		tablet_3_description: '',
		tablet_4_description: '',
		tablet_5_description: '',
		screenshot_1_description: 'Mobile Screenshot_test',
		screenshot_2_description: '',
		screenshot_3_description: '',
		screenshot_4_description: '',
		screenshot_5_description: '',
		developer_description: 'QA Automation Rockers',
		developer_website: 'http://publicis.sapient.com/en-us.html',
		store_link: '',
		status: 'LIVE',
		developer: '2175',
		rejectReason: '',
		removalReason: '',
		removal_date: '',
		submitted_date: '2017-07-20T11:13:42.727',
		release_date: '2017-07-20T11:13:42.727',
		app_type: 'ENDORSED',
		long_description: 'ios_mobile_longdescription    created from devconsole',
		short_description: 'ios_mobile_shortdescription '
	},
	app_psk: '255555',
	install_uri:
		'https://firstnet-ws.apperian.com/v1/downloads/install/applications/25',
	long_description: 'ios_mobile_longdescription    created from devconsole',
	platform: 'IOS',
	is_app_catalog: false,
	short_description: 'ios_mobile_shortdescription',
	reviews: [
		{
			reviewStar: 5,
			reviewDate: '2017-07-20 14:02:11.0',
			appId: '25',
			reviewId: '12',
			appUser: {
				attId: '2175',
				apperianId: 'ekanter@sapient.com',
				apperianPsk: 46
			},
			commentTitle: 'First Review',
			comment: 'First Review',
			userFirstName: 'Evan',
			userLastName: 'Kanter'
		}
	],
	reviews_count: 1,
	isEndorsed: false,
	version: {
		author: 'Udayauto tester',
		version_num: '2.6.0',
		release_date: '2017-07-20T16:15:02+00:00',
		size: '7',
		version_note: 'ios_mobile_versionnotes'
	},
	apperianToken: 'bfmWDVu4Q_27a7204wUVvw',
	deviceUDID: 'FFFFFFFF6383EEF5B7D849DE877EF31444491423',
	app_name: 'NOAA calculator_1',
	direct_download_binary_url:
		'https://firstnet-ws.apperian.com/v1/downloads/direct/applications/Puco4dE1AhP82HqYSna94g',
	operating_system: 'IOS',
	device: 'BOTH'
};

describe('AppCatalogStore', () => {

	apiService.getAdminApps = jest.fn()
	.mockReturnValue(new Promise(resolve => resolve(mockCatalogArray)));

	beforeEach(() => {
		//turn off strict mode when testing with mock store
		useStrict(false);
		return store.fetchAppCatalog();
	});

	it('stores response in allApps', () => {
		expect(store.allApps.length).toBe(4);
	});

	it('sets current app when passed a pskId ', () => {
		store.setCurrentApp(72299);
		expect(store.currentAppObject.publisher).toBe('RealNews');
	});

	it('Toggles App Availability', () => {
		store.changeAppAvailability(72299, false);
		expect(store.currentAppObject.isAvailable).toBe(false);
		expect(store.currentAppObject.isRecommended).toBe(false);
	});

	it('Toggles App Recommendation', () => {
		store.changeAppRecommended(73869, true);
		expect(store.currentAppObject.isRecommended).toBe(true);
	});


	describe('Fetches App Details', () => {

		apiService.getAppDetails = jest.fn()
			.mockReturnValue(new Promise(resolve => resolve(mockAppDetail)));

		beforeEach(() => {
			return store.fetchAppDetailByPsk(25);
		});

		it('retrieves and populates currentAppObject', () => {
			expect(store.currentAppObject.version.version_num).toBe('2.6.0');
		});

	});

});
