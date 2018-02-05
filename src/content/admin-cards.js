export const adminCards = [
    {
        isPermitted: 'manageUsers',
        linkTo: 'manageUsersLink',
        className: 'manage-users',
        header: 'Manage users',
        description: 'Add, edit and remove users'
    },
    {
        isPermitted: 'manageApps',
        linkTo: '/admin/manage-apps',
        className: 'manage-apps',
        header: 'Manage apps',
        description: 'Push an app to your Mobile Device Management(MDM) solution, recommend apps, block apps'
    },
    {
        isPermitted: 'manageBilling',
        linkTo: 'manageServicesLink',
        className: 'manage-services',
        header: 'Manage services & billing',
        description: 'Assign or remove devices, change rate plans & features, view & pay bills, update information, manage push-to-talk'
    },
    {
        isPermitted: 'manageVoicemail',
        linkTo: 'manageVoicemailAndUsageLink',
        className: 'manage-voicemail-and-usage',
        header: 'Manage voicemail & usage',
        description: 'Manage voicemail and data usage for your devices'
    },
    {
        isPermitted: 'viewReports',
        linkTo: 'viewWirelessReportsLink',
        className: 'manage-wireless-reports',
        header: 'View wireless reports',
        description: 'View device inventory, rate plan summary, early termination fees, upgrade eligibility, device unlock eligibility'
    }
]

export const asideCards = [
    {
        isPermitted: 'shopStandardDevices',
        linkTo: 'shopStandardDevicesLink',
        className: 'shop-devices-rates',
        header: 'Shop standard devices & rate plans',
        navLinkName: 'Standard devices & rate plans',
        description: 'Add a new device, provision an existing device, add a rate plan, feature(s) and accessories',
        callToAction: 'Shop Devices & Plans'
    },
    {
        isPermitted: 'shopSpecializedDevices',
        linkTo: '/admin/devices',
        className: 'shop-specialized-devices',
        header: 'Shop specialized devices',
        navLinkName: 'Specialized devices',
        description: 'Purchase ruggedized devices, vehicle routers, etc.'
    },
    {
        isPermitted: 'shopPublicSafetySolutions',
        linkTo: '/admin/solutions',
        className: 'shop-solutions',
        header: 'Shop public safety solutions',
        navLinkName: 'Public safety solutions',
        description: 'Browse public safety solutions and choose which are best for your organization'
    }
]
