/*************************************************
  * InnovaZone
  * Constants.js
  * Created by Selvin Thamodharan on 13/02/2018
  * Copyright © 2018 InnovaZone. All rights reserved.
  *************************************************/
'use strict';

/**
  * Returns all the constants used in the application
  * Separate constants according to the category and usage
  */
// module.exports = {

export const SERVER = {
  HOST_NAME: 'qa-aramarkinnovazones.com',
  API_VERSION: 'v1',
  VOUCHER_API_VERSION: 'voucher',
  PRINT_API_VERSION: 'utils',

  // Production server host name and api version.
  PRODUCTION_HOST_NAME: 'aramarkinnovazones.com',
  PRODUCTION_API_VERSION: 'v1',

  PROTOCAL: 'https://',
  PATH: '/api',

};

export const SCREEN_TITLE = {
  CRN_LOGIN: 'CRN Login',
  RESET_APPLICATION: 'Reset Application',
  SYNC_DATA: 'Sync Data',
  LOGIN: 'Login',
  ENROLL: 'Enroll',
  SELECT_EMPLOYEE: 'Select Employee',
  SUPERVISOR_REPORT: 'Supervisor Report',
  CAPTURE_PHOTO: 'CAPTURE PHOTO',
  EQUIPEMNT_ZONE: 'Equipment Zone',
  UNIFORM_ZONE: 'Uniform Zone',
  IUNIFORM_ZONE: 'iUniform Zone',
  FROCK_ZONE: 'Frock Zone',
  CART: 'CART',
  IMAGES: 'IMAGES',
  HELP: 'HELP',
  SUPPORT: 'SUPPORT',
  CALL_PHONE: '833-4IZ-HELP',
  INVOICE_IMAGE_UPLOAD: 'Images',
};

export const STORE_LINK = {
  ANDROID_PLAY_STORE: 'https://play.google.com/store/apps/details?id=com.InnovaZones.TreeIZHips',
  IOS_APP_STORE: 'https://apps.apple.com/gb/app/aramark-innova-zones/id1505777035?ign-mpt=uo%3D2',
  PRINT_APP_LINK: 'https://play.google.com/store/apps/details?id=com.epson.tmassistant',
};

export const CODE_PUSH = {
  ANDROID: {
    DEVELOPMENT: 'cXrdY-5IJVqjFGCmvDVSwhLIYe9F7xi885wQz',
    STAGING: 'zEUDIfPlwB5WaKIpdE9ICnUO5S3FuydRv48q7',
    PRODUCTION: 'rXNwrTyHZRutTjQuFNan8lbgaxs6TbcP1mBaD',
    IS_BETA: 'XqAEH53-gdRdgggrttofysKmkxKe779O-4qI6',
  },
  IOS: {
    DEVELOPMENT: 'LOKQPlxJxpmzwE7N92XWP-dscH3xAfIa9xZnA',
    STAGING: 'GfSiFzvyv1FXaYCv_NxwYlBF4WTodE3SMlWS8',
    PRODUCTION: 'zRJvLXqF1BZ3_wiMLQuq7BwFRsYvULeXkThio',
    IS_BETA: 'PQgE7PmU5JzfimL0Hksho14oThSQJBvTesNvD',
  },

  PRODUCTION_UPDATE_CHECK_TIMEOUT :12*1,  // hours-day
  IS_BETA_UPDATE_CHECK_TIMEOUT : 0.5*1,  // hours-day
  DEVELOPMENT_UPDATE_CHECK_TIMEOUT : 0.5*1,  // hours-day  
  // 0.084 --> 5mins
  // 0.25 --> 15mins
  // 0.5  --> 30mins
};

export const FONT_FAMILY = {
  HELVETICA_CONDENSEDBOLD: 'HelveticaNeue-CondensedBold',
  HELVETICA_CONDENSEDBLACK: 'HelveticaNeue-CondensedBlack',
  HELVETICA_CONDENSED_THIN: 'HelveticaNeue-Thin',
  HELVETICA_CONDENSED_ITALIC: 'HelveticaNeue-Italic',
  HELVETICA_CONDENSED_LIGHT: 'HelveticaNeue-Light',
};

export const FONT_SIZE = {
  SCREEN_TITLE: 24,
  SCREEN_NAVIGATION_CONTENT: 21,
  FONT_WEIGHT: '800',
};

export const FONT_WEIGHT = {
  TITLE_FONT_WEIGHT: '800',
};

export const TOP_PADDING = {
  IOS: 20,
  ANDROID: 27,
};

export const HUD_MSG = {
  LOADING: 'Loading...',
};

export const DEVICE_RESPONSE = {
  DEVICE_CONNECTED_STATUS: 'DEVICE_CONNECTED_STATUS',
  SCANNED_VALUE: 'SCANNED_VALUE',

  SCAN_TYPE_PRODUCT: 'PRODUCT',
  SCAN_TYPE_ENROLL: 'ENROLL',
  SCAN_TYPE_CART: 'CART',
  SCAN_TYPE_LOGIN: 'LOGIN',
  SCAN_TYPE_ASSET_NO: 'ASSET_NO',
  REPORT_ASSET_NO: 'REPORT_ASSET_NO',
  SCAN_TYPE_REPORT_ASSET_NO: 'REPORT_ASSET_NO',
  REPORT_TOTE_NO: 'REPORT_TOTE_NO',
  SCAN_TYPE_REPORT_TOTE_NO: 'REPORT_TOTE_NO',
  SCAN_TYPE_UNIFORM_EMPLOYEE_ID: 'UNIFORM_EMPLOYEE_ID',
  SCAN_TYPE_UNIFORM_ASSET_NO: 'UNIFORM_ASSET_NO',

  SCAN_TYPE : 'BARCODE',

};
export const COLOR = {
  THEME: '#e11f26',
  NAVIGATION_BAR_BG: '#252525',
  TEXT_GRAY_COLOR: '#6D6E70',
  SEPARATOR_GRAY: '#b8a8a8',
  SEPARATOR_LIGHT_GRAY: '#c5c5c5',
  TEXT_LIGHT_GRAY_COLOR: '#474646',
  LISTVIEW_ROW_TEXT_COLOR: '#555555',
  ACTIVITIY_INDICATOR_COLOR: '#000000',
  VIEW_BACKGROUUND_COLOR: '#ECECEC',
  TEXT_INPUT_BACKGROUND_COLOR: '#EFEFEF',
  BLACK: '#000000',
  LABEL_COLOR: '#686868',
  GREEN: '#008000',
  DARK_GREEN: '#006400',
  GREEN_1: '#228B22',
  WHITE: '#FFFFFF',
  LIGHT_GREEN: '#00ff00',
  DISABLE_COLOR: '#f47075',
  DARK_YELLOW: '#FED032',
  GRAY_LIGHT: '#b8b8b8',

};

export const VALIDATION_MSG = {
  NO_USERNAME: 'Username is required.',
  NO_CRN_NUMBER: 'CRN Number is required',
  NO_CLERK_ID: 'Clerk id is required',
  VALID_CLERK_ID: 'Invalid Clerk ID',
  INVALID_USER: 'Invalid User',
  NO_PASSWORD: 'Please Enter Password',
  NO_EMPLOYEE_ID: 'Please enter your employee ID',
  VALID_EMPLOYEE_ID: 'Invalid Employee ID',
  VALID_PASSWORD: 'Invalid Password',
  NO_FIRST_NAME: 'Please enter your first name.',
  NO_LAST_NAME: 'Please enter your last name.',
  NO_JOB_ZONE: 'Plesae select your Job Zone.',
  NO_DEPARTMENT: 'Plesae select Department#',
  NO_BARCODE_NO: 'Plesae scan barcode',
  NO_LOCATION_NO: 'Please enter Location No.',
  PASSWORD_NOT_MATCHED: 'Confirm password must be same to new password',
  NO_PROFILE_IMAGE: 'Please set your profile image.',
  NO_SEARCH_FIELD_TEXT: 'Search field is empty',
  PENDING_SYNC: 'You have pending data available on your device. Please sync first to proceed.',
  NO_PRODUCT_SEARCH_TEXT: 'Please enter character to search',
  ENTER_VALID_EMAIL: 'Please Enter Valid Email ID.',
  ENTER_ATLEAST_ONE_EMAIL: 'Please add atlease one email address',
  INVALID_CRN_NUMBER: 'Invalid CRN Number.',
  NOPRODUCT_INTO_CART: 'No product in cart.',
  QTY_IN_ANY_OF_SECTION: 'Please enter Quantity in any of section',
  QTY_EXCEED_IN_PRODUCT: 'Quantity exceed to total quantity',
  SELECT_MIN_ONE_PRODCUT: 'Please select atleast one product',
  PLEASE_ADD_SIGNATURE: 'Please add Signature.',
  NO_PRODUCT_INTO_CART: 'There is no product(s) into cart.',
  DRIVERZONE_ALREADY_ISSUED_MESSAGE: 'To issue a new truck please return previously checked out truck.',
  FEATURE_NOT_AVAILABLE_FOR_PRODUCT_MASSAGE: 'This feature is not available for this Product.',
  PRODUCT_NOT_AVAILABLE_OR_INVALID_MASSAGE: 'Product unavailable or invalid.',
  PLEASE_SELECT_EQUIPMENT_NO: 'Please select Lot # from list',
  PRODUCT_ADDED_INTO_CART_MESSAGE: 'Product added into the cart',
  BARCODE_ALREADY_EXISTS: 'Barcode number already exisits.',
  EMPLOYEEID_ALREADY_EXISTS: 'EmployeeID already exists.',
  NO_RETURN_REASONS_AVAILABLE: 'No return reasons available.',
  PLEASE_ADD_DZ_SIGNATURE: 'Please add Signature or click save button to save signature.',
  SEARCH_MINIMUM3_CHARACTER: 'Please enter minimum 3 character to search',
  CVC_NOTHING_SAVE_MESSAGE: 'Nothing to saved.',
  SEND_EMAIL_SUCCESS: 'Report sent successfully.',
  ASSET_ALREADY_EXSIT: 'Asset# already added into the cart.',
  INVALID_ENTRIES_DETECTED_MESSAGE: 'Invalid Entries detected',
  STATION_VC_SELECT_AREA: 'Please select area',
  ENTER_ASSET_NUMBER: 'Please enter Asset#',
  PRN_VALUES: 'Please select Prm Values',
  HOST_NAME: 'Host Name is required',
  API_VERSION: 'API Version is required',
};

export const CART_SCREEN_VALIDATION_MESSAGES = {
  CART_DZ_MESSAGE: 'Please enter Driver and Truck details.',
  CART_ATTACHMENT_MANDATORY: 'Please select an attachment image.',
  CART_ATTACHMENT_DELETE: 'Are you sure you want to delete image?.',
  RETURN_REASON_NOT_CHANGED: 'You can\'t change the Reason while you have items in Cart.',
  REMOVE_CART_ITEM_MESSAGE: 'Do you want to remove this product from the cart?',
  MAX_ALLOWED_INVOICE_IMAGES_MESSAGE: `You can not add more than ${5} Images.`,
};

export const EMPTY_MSG = {
  NO_SCHEDULE: 'You don\'t have any schedule',
  NO_EMPLOYEE: 'No result found',
  NO_DATA_FOUND: 'No data found',
  NO_PRODUCT_FOUND:'No Product Found',
  ASSET_NOT_ISSUED_MESSAGE : 'Asset# not issued to Employee',
  SELECT_REASON : 'Please select reason.',
  NO_ASSET_FOUND : 'No Asset Found',
};

export const SUCCESS_MSG = {
  EMPLOYEE_DETAIL_SAVED_MESSAGE: 'Employee detail saved successfully',
  CONFIRMED_MESSAGE: 'Confirmed',
  SYNC_DONE: 'Sync completed successfully',
};

export const ALERT = {
  TITLE: {
    INFO: 'INNOVA ZONES',
    ERROR: 'Error',
    FAILED: 'Failed',
    AUTH_FAILED: 'Authentication Failure',
    WENT_WRONG: 'Sorry, something went wrong',
    EXPIRED: 'Logout',
    CLERK_LOGOUT_MESSAGE: 'Do you want to logout as Clerk?',
    LOGOUT_MESSAGE: 'Do you want to logout?',
    UPDATE_LATEST_VERSION: 'Now update available. Application will exit.',
    CRN_RESET_SUCCESS_MESSAGE: 'Application reset successfull',
    CONFIRMATION_CART_MESSAGE: 'Are you sure, you want to place this order?',
    CONFIRMATION_CART_EXIT_MESSAGE: 'Are you sure, you want to logout after placing this order?',
    RFID_COULDNOT_FOUND: 'Couldn\'t find any RFID devices around.',
    SCAN_ACCESSORY: 'The "RS3-D46C" accessory would like to open "InnoVaZone"',
    BLUETOOTH_TURNED_OFF_MESSAGE: 'Bluetooth is turned off. Turn it on to find and connect devices',
    BLUETOOTH_NOT_SUPPORTED_MESSAGE: 'Bluetooth is not supported in your device',
    SYNC_ALERT_MESSAGE: 'Please sync device to use latest data',
    EMPTY_TRAILER_MESSAGE: 'Are you sure you want to empty this trailer s inventory',
    SCREEN_EXIT_MESSAGE: 'Are you sure you want to Exit?',
    PRINT_RECEIPT_MESSAGE: 'Print Receipt?',
    PRINT_ASSISTANT_APP_INSTALL_MESSAGE:  'Do you want to install Epson TM Print Assistant APP',

  },
  BTN: {
    OK: 'OK',
    CANCEL: 'Cancel',
    UPDATE: 'UPDATE',
    DONE: 'Done',
    YES: 'YES',
    NO: 'NO',
    CART: 'CART',
    RFID_SETTINGS: 'RFID Settings',
    CLOSE: 'Close',
    VIEW: 'View',
    SYNC: 'Sync',
    RESCAN: 'Rescan',
  },
};

export const STORAGE = {
  KEYCHAIN_NAME: 'InnovozoneKeyChain',
  SHARED_PREFERENCES_NAME: 'InnovozonePreferences',
  KEY_DEVICE_UDID: 'DEVICE_UDID',
  KEY_LAST_SYNC_DATE: 'LAST_SYNC_DATE',
  KEY_TRANSACTION_SYNC_DATE: 'TRANSACTION_SYNC_DATE',
  KEY_CLERK_ID: 'CLERK_ID',
  KEY_IS_INITIAL_SYNC_DONE: 'IS_INITIAL_SYNC_DONE',
  KEY_APP_TOKEN: 'APP_TOKEN',
  KEY_PUSH_REGISTRATION_ID: 'PUSH_REGISTRATION_ID',
  KEY_CRON_EXECUTED_ON: 'CRON_EXECUTED_ON',
  KEY_APP_VERSION: 'APP_VERSION',
  KEY_COMPANY_CONFIG_DATA: 'COMPANY_CONFIG_DATA',

  KEY_CONFIGURATON_VALUES: 'CONFIGURATON_VALUES',
  KEY_CURRENT_CLERK: 'CURRENTCLERK',
  KEY_CLERK_LOGIN: 'CLERK_LOGIN',
};

export const PASSWORD = {
  MASTER_PASSWORD_DEBUG_MODE: '123admin456',
};

export const LENGTH = {
  WORK_ORDER_NUMBER_LENGTH: 10,
  SYNC_TIME_DIFFERENCE_IN_MINUTE : 10,
};

export const CONFIGURATIONKEY = {
  COMPANY_LOGO: 'COMPANY_LOGO',
  POWERED_BY_LOGO: 'POWERED_BY_LOGO',
  COMPANY_NAME: 'COMPANY_NAME',
  CLERK_LOGIN: 'CLERK_LOGIN',
  LABEL_DATA: 'LABEL_DATA',
  LABEL_FOR_LOGINSCREEN_CLERK_BTN_BARCODE: 'LABEL_FOR_LOGINSCREEN_CLERK_BTN_BARCODE',
  LABEL_FOR_LOGINSCREEN_CLERK_BTN_EMPLOYEEID: 'LABEL_FOR_LOGINSCREEN_CLERK_BTN_EMPLOYEEID',
  LABEL_FOR_LOGINSCREEN_CLERK_BTN_LOGIN: 'LABEL_FOR_LOGINSCREEN_CLERK_BTN_LOGIN',
  LABEL_FOR_LOGINSCREEN_BTN_EMPLOYEEID: 'LABEL_FOR_LOGINSCREEN_BTN_EMPLOYEEID',
  LABEL_FOR_LOGINSCREEN_BTN_BARCODE: 'LABEL_FOR_LOGINSCREEN_BTN_BARCODE',
  LABEL_FOR_LOGINSCREEN_BTN_LOGIN: 'LABEL_FOR_LOGINSCREEN_BTN_LOGIN',
  INVENTORY_MANAGEMENT_FLOW_ENABLED: 'INVENTORY_MANAGEMENT_FLOW_ENABLED',
  APP_VERSION: 'APP_VERSION',
  DISCLAIMER_TITLE: 'DISCLAIMER_TITLE',
  DISCLAIMER_VALUE: 'DISCLAIMER_VALUE',
  AUTHENTICATION_TYPE: 'AUTHENTICATION_TYPE',
  RFID_AUTO_CONNECT: 'RFID_AUTO_CONNECT',
  AUTHENTICATION_TYPE_FOR_PRODUCT: 'AUTHENTICATION_TYPE_FOR_PRODUCT',
  LABEL_FOR_REPORT_BTN_SUPERVISORREPORT: 'LABEL_FOR_REPORT_BTN_SUPERVISORREPORT',
  LABEL_FOR_LOCKER_NO: 'LABEL_FOR_LOCKER_NO',
  LABEL_FOR_COMBINATION_NO: 'LABEL_FOR_COMBINATION_NO',
  LABEL_FOR_LOCATION_NO: 'LABEL_FOR_LOCATION_NO',
  LABEL_FOR_DEPARTMENT_NO: 'LABEL_FOR_DEPARTMENT_NO',
  LABEL_FOR_EQUIPMENT_NO: 'LABEL_FOR_EQUIPMENT_NO',
  LABEL_FOR_ASSET_NO: 'LABEL_FOR_ASSET_NO',
  LABEL_FOR_WORK_ORDER_NO: 'LABEL_FOR_WORK_ORDER_NO',
  LABEL_FOR_CC_NO: 'LABEL_FOR_CC_NO',
  ZONES_FOR_NO_ATTRIBUTE_POPUP: 'ZONES_FOR_NO_ATTRIBUTE_POPUP',
  ZONES_FOR_QUANTITY_TEXTBOX: 'ZONES_FOR_QUANTITY_TEXTBOX',
  ZONES_FOR_PRODUCT_ISSUE_BY_DEFAULT_QUANTITY_1: 'ZONES_FOR_PRODUCT_ISSUE_BY_DEFAULT_QUANTITY_1',
  PROFILE_PICTURE_MANDATORY: 'PROFILE_PICTURE_MANDATORY',
  PROFILE_SIGNATURE_MANDATORY: 'PROFILE_SIGNATURE_MANDATORY',
  ALL_ZONE_REPORTS: 'ALL_ZONE_REPORTS',
  COST_CENTER_DEFAULT_VALUE: 'COST_CENTER_DEFAULT_VALUE',
  COST_CENTER_VISIBILITY: 'COST_CENTER_VISIBILITY',
  SUPERVISOR_VISIBILITY: 'SUPERVISOR_VISIBILITY',
  COST_CENTER_DISABLED_ZONES: 'COST_CENTER_DISABLED_ZONES',
  ZONES_FOR_WORK_ORDER_VISIBLE: 'ZONES_FOR_WORK_ORDER_VISIBLE',
  ZONES_FOR_ASSET_NUMBER_VISIBLE: 'ZONES_FOR_ASSET_NUMBER_VISIBLE',
  ZONES_FOR_ASSET_NUMBER_MANDATORY: 'ZONES_FOR_ASSET_NUMBER_MANDATORY',
  ZONES_FOR_SHOW_ATTACHMENT: 'ZONES_FOR_SHOW_ATTACHMENT',
  ZONES_FOR_NOT_SHOW_PRICE: 'ZONES_FOR_NOT_SHOW_PRICE',
  ZONES_FOR_VOUCHER_FUNCTIONALITY: 'ZONES_FOR_VOUCHER_FUNCTIONALITY',
  WORK_ORDER_AS_DROPDOWN_ZONES: 'WORK_ORDER_AS_DROPDOWN_ZONES',
  ZONES_FOR_NOT_SHOW_PRODUCT_RETURN_SCREEN: 'ZONES_FOR_NOT_SHOW_PRODUCT_RETURN_SCREEN',
  INVOICE_ATTACHMENT_MANDATORY: 'INVOICE_ATTACHMENT_MANDATORY',
  COST: 'Cost',
  QUANTITY: 'Quantity',
  WORK_ORDER_MANDATORY: 'WORK_ORDER_MANDATORY',
  COST_CENTER_MANDATORY: 'COST_CENTER_MANDATORY',
  SUPERVISOR_NOTICEIABLE_PRODUCT_COST: 'SUPERVISOR_NOTICEIABLE_PRODUCT_COST',
  ZONES_FOR_NOT_VISIBLE_SUPERVISOR: 'ZONES_FOR_NOT_VISIBLE_SUPERVISOR',
  ZONES_FOR_PRM_SUB_IGNORE: 'ZONES_FOR_PRM_SUB_IGNORE',
  PRM_SUB_CC_LOGIC_ENABLED: 'PRM_SUB_CC_LOGIC_ENABLED',
  PRM_DEFAULT_VALUE: 'PRM_DEFAULT_VALUE',
  SUB_DEFAULT_VALUE: 'SUB_DEFAULT_VALUE',
  ASSET_NUMBER_MANDATORY: 'ASSET_NUMBER_MANDATORY',
  PRESERVE_IMAGES: 'PRESERVE_IMAGES',
  PIN_NUMBER_LABEL_TITLE: 'Pin No1',
  LOCATION_NUMBER_LABEL_TITLE: 'Location No',
  COMBINATION_LABEL_TITLE: 'Combination#',
  DEPARTMENT_LABEL_TITLE: 'Department#',
  EQUIPMENT_LABEL_TITLE: 'Equipment#',
  ASSET_LABEL_TITLE: 'Asset#',
  CC_LABEL_TITLE: 'CC#',
  WORK_ORDER_TITLE: 'Work Order#',
  MAIN_VC_FROCKZONE_INSPECTOR: 'ARAMARK INSPECTOR',
  MAIN_VC_STATIONZONE_INSPECTOR: 'Auditor',
  MAIN_VC_IUNIFORMZONE_INSPECTOR: 'RETURN',
  COST_CENTER_EDIT: 'COST_CENTER_EDIT',
  LABEL_FOR_KNIFE_NO: ' LABEL_FOR_KNIFE_NO',
  TAX_PERCENTAGE: 'TAX_PERCENTAGE',
  FOREIGN_MATERIALS_COMMENT_LIST: 'FOREIGN_MATERIALS_COMMENT_LIST',
  CHECK_SHARPEN_STATUS_FOR_ASSET: 'CHECK_SHARPEN_STATUS_FOR_ASSET',
  CHECK_EMPLOYEE_ASSOCIATION_FOR_SHARPEN: 'CHECK_EMPLOYEE_ASSOCIATION_FOR_SHARPEN',
  STATION_ZONE_AREA_MANDATORY: 'STATION_ZONE_AREA_MANDATORY',
  STATION_ZONE_AREA_VISIBILITY: 'STATION_ZONE_AREA_VISIBILITY',
  LABEL_FOR_EMPLOYEE_TITLE_STATION_ZONE: 'LABEL_FOR_EMPLOYEE_TITLE_STATION_ZONE',
  CHARGE_SIGNATURE: 'CHARGE_SIGNATURE',
};

export const CSV_GROUP = {
  EQUIPMENT_LIST: 'equipment_list',
  WORK_ORDER_NO_LIST: 'work_order_no_list',
  CC_MENU: 'cc_menu',
  VOUCHER_APPROVAL: 'voucher_approval',
  PRODUCT_CONVERSION: 'product_conversion',
  FROCK_ZONE_DEFECT_REASON: 5,
  FROCK_ZONE_LOST_REASON: 6,
  FROCK_ZONE_RETURN_REASON: 'frock_zone_return_reason',
  UNIFORM_ZONE_RETURN_REASON: 'uniform_zone_return_reason',
  STATION_ZONE_RETURN_REASON: 'station_zone_return_reason',
  AREA_LIST: 10,
};

export const CATEGORY_SLUG = {
  PPE_ZONE: 'ppe-zone',
  MAINTENANCE_ZONE: 'maintenance-zone',
  TOOL_ZONE: 'tool-zone',
  EQUIPMENT_ZONE: 'equipment-zone',
  DRIVER_ZONE: 'driver-zone',
  SECURITY_ZONE: 'security-zone',
  AUDIT_ZONE: 'audit-zone',
  TRAINING_ZONE: 'training-zone',
  CINTAS_ZONE: 'cintas-zone',
  INVOICE_ZONE: 'invoice-zone',
  KIT_ZONE: 'kit-zone',
  FROCK_ZONE: 'frock-zone',
  UNIFORM_ZONE: 'uniform-zone',
  STATION_ZONE: 'station-zone',
  IUNIFORM_ZONE: 'iuniform-zone',
  SHARPENING_ZONE: 'sharpening-zone',
};

export const DATE_FORMAT = {
  DATE_FORMAT_DDMMYY: 'dd/MM/yyyy',
  DATE_FORMAT_MMddyyyy: 'MM/dd/yyyy',
  DATE_FORMAT_mmddyyyy: 'mm/dd/yyyy',
  DATE_FORMAT_mmddyy: 'MM/dd/yy',
  DATE_FORMAT_yyyyMMdd: 'yyyy-MM-dd',
  DATE_FORMAT_yyyyMMdd_HHmmss: 'yyyy-mm-dd HH:mm:ss',
  DATE_FORMAT_MONTH_NAME_DD_YYYY: 'MMMM DD, YYYY',
  TIME_FORMAT_HHMMTT: 'hh:mm tt',
  TIME_FORMAT_hhmmTT: 'hh:mm TT',
  TIME_FORMAT_24_HHMMSS: 'HH:mm:ss',
  DATE_FORMAT_MMddyyyy_HHmm: 'MM/dd/yyyy HH:mm',
  DATE_FORMAT_yyyyMMdd_HHmm: 'yyyy-MM-dd HH:mm',
  DATE_FORMAT_MMddyyyy_hhSSTT: 'MM/dd/yyyy hh:mm tt',
  DATE_FORMAT_mmddyyyy_hhmmTT: 'mm/dd/yyyy hh:mm TT',

  DDMMYYYYHHmmss: 'DD-MM-YYYY HH:mm:ss',
  MMDDYYYY: 'MM/DD/YYYY',
  MM_DD_YYYY: 'MM-DD-YYYY',
  YYYYMMDD: 'YYYY-MM-DD',
  YYYYMMDD_HHmmss: 'YYYY-MM-DD HH:mm:ss',
  DDMMYYYY: 'DD/MM/YYYY',
  hhmm: 'HH:mm',
};

export const SYNC_TYPE = {
  ALL: 0,
  EMPLOYEES: 1,
  TRANSACTIONS: 2,
};

export const TOAST_DURATION = {
  ONE_SECOND: 1000,
  TWO_SECOND: 2000,
};

export const AUTHENTICATION_TYPE = {
  BARCODE: 1,
  USERID: 2,
};

export const REACT_TIMEOUT = {
  HUD_OPENCLOSE: 500,
  VALIDATION_ALERT: 100,
  WEBSERVICE_ALERT: 500,
  DATABASE_ALERT: 900,
  EMAIL_CLOSE : 1000, 
};

export const HTTP_CODE = {
  SUCCESS: 200,
  AUTHENTICATION_FAILURE: 401,
  REQUIRED_MISSING: 403,
  REQUEST_TIMED_OUT_FAILURE: 500,
};

export const ZONE_LAYOUT_TYPE = {
  PPEMAN_LAYOUT: 1,
  CATEGORY_TWO_COLUMN_LAYOUT: 2,
  SEARCH_LAYOUT: 3,
  FROCK_ZONE_LAYOUT: 4,
  KIT_LAYOUT: 5,
  UNIFORM_ZONE_LAYOUT: 6,
  IUNIFORM_ZONE_LAYOUT: 8,
};

export const NETWORK_ERROR = {
  INTERNET_CONNECTION_ERROR: 'No internet connection available.',
  ISSUE_WITH_INTERNET_CONNECTION_ERROR: 'There is some issue with your internet connection.',
  SERVER_CONNECTION_ERROR: 'Service is temporary unavailable. Please try later.',
  SERVICE_ERROR: 'There is some issue in the service.',
  TASK_WAS_CACELED_ERROR: 'A task was canceled.',
  REQUEST_TIMED_OUT_ERROR: 'The request timed out.',
  CONNECT_FAILURE_FULL_ERROR: 'ConnectFailure (Network is unreachable)',
  CONNECT_FAILURE_ERROR: 'ConnectFailure',
  HOSTNAME_NOT_FOUND_ERROR: 'A server with the specified hostname could not be found.',
  NAME_RESOLUTION_FAILURE_ERROR: 'NameResolutionFailure',
  ERROR_IN_DOWNLOAD: 'Error While Downloading Database',
  ERROR_WHILE_SYNCING_MESSAGE: 'Some error occured while syncing.',
  ERROR_WHILE_UPLOAD_BACKUP_DATABASE_MESSAGE: 'Some error occured while uploading backup database.',
  ERROR_WHILE_EMPLOYEE_LOGIN_MESSAGE: 'There is some issue getting the user detail. You will be logged out.',
  ERROR_WHILE_DELETE_EXSITING_SERVER_PATH: 'Some error occured while delete exsiting server path.',
  ORDER_SAVED_BUT_FAILED_TO_SYNC_MESSAGE: 'Order saved successfully but failed to sync.',
  OOPS_SOMETHING_WENT_WRONG_TRY_AGAIN_MESSAGE: 'Oops! Something went wrong. Please try again.',
  UPDATE_AVAILABLE_MESSAGE: 'New update available. Application will exit.',
};

export const ERROR_MSG = {
  ASSET_ALREADY_CHECKOUT: 'You have some asset# already checked out.',
};

export const ATTRIBUTE_VALIDATION = {
  ATTR_VOUCHER_NAME: 'Voucher',
  ATTR_VOUCHER_VALUE_YES: 'Yes',
  ATTR_VOUCHER_VALUE_NO: 'No',
  ATTR_VOUCHER_APPROVAL_NAME: 'Voucher Approval',
  ATTR_VOUCHER_APPROVAL_VALUE_NO: 'No Supervisor',
  ATTR_REMOVEALL_PRODUCT_CONFIRMATION: 'Do you want to remove all products?',
  ATTR_PLEASE_ENTER_ATTRIBUTE_VALUES: 'Please enter missing attribute values.',
  ATTR_PLEASE_SELECT_SUPERVISOR: 'Please select supervisor.',
  ATTR_VOURHCER_ATTRS_NOT_EXISTS: 'Vaoucher and Voucher Approval attributes do not exist.',
  ATTR_VOURHCER_ATTR_VOUCHER_NOT_EXISTS: 'Voucher attribute not exists.',
  ATTR_VOURHCER_ATTR_VOUCHER_APPROVAL_NOT_EXISTS: 'Voucher Approval attribute do not exist.',
  ATTR_VOURHCER_APPROVAL_VALID_MESSAGE: 'Please select voucher approval.',
};

export const DEFAULT = {
  COST: 'Cost',
  QUANTITY: 'Quantity',
  CURRENCY_SYMBOL: '$',
  PRICE_FORMAT: '#,##0.###',
  NUMBER_STRING: '0123456789',
  PAGE_SIZE: 50,
  REPORT_ROWS_PER_PAGE: 50,
  MAX_ALLOWED_INVOICE_IMAGES: 6,
  CRONJOB_EXECUTION_INTERVAL_IN_DAYS: 1,
  SYNC_TIME_DIFFERENCE_IN_MINUTE: 10,
};

export const CATEGORY = {
  CATEGORY_LEVEL1: 'CATEGORY_LEVEL_1',
  CATEGORY_LEVEL2: 'CATEGORY_LEVEL_2',
  CATEGORY_LEVEL3: 'CATEGORY_LEVEL_3',
};


export const INVENTORY = {
  INVENTORY_LEVEL1: 'INVENTORY_CATEGORY_LEVEL_1',
  INVENTORY_LEVEL2: 'INVENTORY_CATEGORY_LEVEL_2',
  INVENTORY_LEVEL3: 'INVENTORY_CATEGORY_LEVEL_3',
};


export const ENTRY_TYPE = {
  DROPDOWN: 0,
  TEXTBOX: 1,
  RADIO: 2,
  LABEL: 3,
  DATE: 4,
  TIME: 5,
};

export const TRANSACTION_TYPE = {
  CART_CHECKOUT: 'CART_CHECKOUT',
  INVENTORY_ISSUE: 'INVENTORY_ISSUE',
  INVENTORY_RETURN: 'INVENTORY_RETURN',
};

export const ATTRIBITE_TYPE = {
  INDEPENDENT: 0,
  DEPENDENT: 1,
};

export const QUANTITY_TYPE = {
  INDIVIDUAL: 'Individual',
  RANGE: 1,
};

export const ORDER_TYPE = {
  IN: 'IN',
  OUT: 'OUT',
};

export const STRING_COMPARISON = {
  CURRENT_CULTURE: 0,
};

export const WEBSERVICE = {
  TIMEPOUT: 230000,
};

export const REPORT_TYPE = {
  EMPLOYEE_REPORT: 1,
  PRODUCT_REPORT: 2,
  DEFECTIVE_PRODUCT_REPORT: 3,
  DISPOSAL_PRODUCT_REPORT: 4,
  // LOST_PRODUCT_REPORT : 5, Not used 
  PAYROLL_PRODUCT_REPORT: 6,
  MANUAL_ENTRY_REPORT: 11,
  // Uner Manuall
  EQUIPMENT: 7,
  // PPE_ZONE : 8,  // Not used 
  // TOOL_ZONE : 9,  // Not used  
  //
  DRIVER_ZONE_REPORT: 12,
  OPEN_ROUTE_REPORT: 13,
  INVOICE_ZONE_REPORT: 14,
  SECURITY_ZONE_REPORT: 15,
  // CINTAS_PAYROLL_REPORT : 16, // not used 
  TODAYS_OUT_REPORT: 17,
  FOREING_METERAIL_REPORT: 18,
  CUSTOMER_REPORT: 19,
  INVENTORY_REPORT: 20,
  TRAINING_REPORT: 21,
  LOANER_REPORT: 22,
  INVENTORY_ADJUSTMENT_REPORT: 23,
  ASSET_SCAN_REPORT: 24,
  UNISSUED_GARMENT_REPORT: 25,
  TRUCK_ZONE_REPORT: 26,
  AREA_REPORT: 27,
  TOTE_TRANSACTION_REPORT: 28,
  TOTE_SCAN_REPORT: 29,
  TRAILER_INVENTORY_REPORT: 30,
  KNIFE_SHARPENING_REPORT: 31,
  EMPLOYEE_SHARPENING_REPORT: 32,
  EMPLOYEE_ASSET_RETURN_REPORT: 33,
  EXPIRATION_REPORT: 34,
};

export const SCREEN_MSG = {
  NOT_SHARPENED_MESSAGE: 'DO NOT SHARPEN ASSET',
  SECURITY_ZONE_NOT_ENABLED : 'Security Zone HIP not toggled on for company',
};

export const QUESTION_TYPE = {
  TEXTBOX: 0,
  DROPDOWN: 1,
  RADIO: 2,
  HOUR: 3,
  BLANK: 8,
  SIGN: 4,
};

export const DZCALLLOGIC_TYPE = {
  VARIANCE: 1,
  DROPDOWN: 2,
  COMMENTBOX: 3,
  SIGNATURE: 4,
  RETURNOVERRIDE: 5,
};

export const ITEM_SCAN_TYPE = {
  Single: 0,
  Multiple: 1,
};

export const TAX_PERCENTAGE = {
  VALUE: 8,
};

export const SCANNER_POPUPMODE = {
  PRODUCT_SCAN: 0, //popup is launched to scan the products
  USER_SCAN: 1, //popup is launched to scan the users
};


export const DZQUESTION_ALIAS = {
  DriverName: 'driver-name',
  TruckNumber: 'truck-number',
  ClockOutTime: 'clock-out-time',
  StartMiles: 'start-miles',
  EngineHoursBeginning: 'engine-hours-beginning',
  EngineHoursEnding: 'engine-hours-ending',
  ClockInTime: 'clock-in-time',
  ActualRouteTime: 'actual-route-time-hhmm',
  ExpectedRouteTime: 'expected-route-time-hhmm',
  VarienceExplanation: 'variance-explanations',
  ReturnOverride: 'returns-override',
  SuperviserName: 'Superviser Name',
  FuelType: 'fuel-type',
  CngStartingPressure: 'cng-starting-pressure',
  CngStartingPressure2: 'cng-starting-pressure-2',
  CngEndingPressure: 'cng-ending-pressure',
  CngEndingPressure2: 'cng-ending-pressure-2',
  Lob: 'lob',
  DisposalTonePerHour: 'disposal-tons--per-hour',
  TotalEngineHours: 'total-engine-hours',
  TotalMiles: 'total-miles',
  EndMiles: 'end-miles',
  RouteNumber: 'route-number',
  RouteComplete: 'route-complete',
  NumberOfCustomersNotServiced: 'how-many-customers-were-not-serviced',
  InjuryORAccidentToday: 'injury-or-accident-today',
  TotalDisposalTones: 'total-disposal-tons',
  Signature: 'signature',
  SupervisorTruckReturn: 'supervisor-truck-return',
  SuperviserCheckout: 'supervisor-checkout',
  VcrPretrip: 'vcr-pre-trip',
  VcrCorrect: 'vcr-correct',
  VcrPosttrip: 'vcr-post-trip',
  RouteHazards: 'route-hazards',
  RouteSheetAccurateAndLegible: 'route-sheet-accurate-and-legible',
  RouteSequence: 'route-sequence',
  Phone: 'phone',
  DownTime: 'down-time',
  TruckLoaded: 'truck-loaded',
  Over12Hours: 'over-n-hours',
  DidYouCleanBehindTheBlade: 'did-you-clean-behind-the-blade',
  FuelGallons: 'fuel-gallons',
};


export const DZVALIDATION_MESSAGES = {
  DZ_AllFieldRequired: 'Please fill all required fields.',
  DZ_AddComment: 'Please add comment.',
  DZ_ENDHOURS_GREATER_STARTHOURS: 'Ending hours should be greater than starting hours.',
  DZ_ENDMILES_GREATER_STARTMILES: 'End miles should be greater than start miles.',
  DZ_AddProperEstimatedHour: 'Enter proper estimated route time.',
  DZ_SelectSuperviser: 'Please select superviser.',
  DZ_SelectOneOption: 'Please select one option.',
  DZ_AddExplanation: 'Please add explanation.',
  DZ_ConfirmInjuryAccidentMessage: 'Please confirm Injury or Accident.',
  DZ_Max_Noticiable_TotalMiles: 350,
  DZ_Max_Noticiable_TotalEngineHours: 12,
  DZ_Max_TotalMiles_Exceeds_Message: `Total Miles exceeds ${350}. Continue?`,
  DZ_Max_TotalEngineHours_Exceeds_Message: `Total Engine Hours exceeds ${12}. Continue?`,

};

export const DZ_OTHER_COMMENT = {
  DZ_OTHER_EXPLANATION_COMMENT: 'Other - Explanation Needed',
};

export const SCANNER = {
  SDK_RFID_SERIALIO: 'serialio_rfid',
  SDK_INFINIA_OMNI: 'infinea_omni_device',
  SDK_MAGNETIC_CARD: 'magnetic_card_read',
  EMPLOYEE_ID: 'employee_id',
  SDK_SCANDIT_SCANNER: 'barcode',
  SDK_CAMERA_SCANNER: 'device_camera',
  SDK_INFRARED: 'infrared',
  SDK_UHF_RFID: 'uhf_rfid',
  SDK_COGNEX: 'cognex',
};

export const SCAN_MESSAGE = {
  SCAN_EMPLOYEE_CARD_MESSAGE: 'Scan Employee Card',
  SCAN_ASSET_NUMBER_MESSAGE: 'Scan Asset Number',
  SCAN_PRODUCT_BARCODE_MESSAGE: 'Scan Product Bacode',
};

export const REPORT_WEB_SERVICE_TYPE = {
  TODAYS_OUT_REPORT : 'todays-out-reports',
  EMPLOYEE_REPORT : 'employee-reports',
  PRODUCT_REPORT : 'product-reports',
  ZONE_REPORT : 'zone-reports',
  PAYROLL_PRODUCT_REPORT : 'payroll-product-reports',
  OUT_REPORT : 'out-reports',
  DRIVER_ZONE_REPORT : 'driver-zone-reports',
  OPEN_ROUTE_REPORT : 'open-route-reports',
  INVOICE_ZONE_REPORT : 'invoice-zone-reports',
  CINTAS_PAYROLL_REPORT : 'cintas-payroll-product-reports',
  FOREING_METERAIL_REPORT : 'foreign-materials-report',
  INVENTORY_REPORT :'inventory-reports',
  TRAINING_REPORT : 'training-zone-reports',
  LOANER_REPORT : 'loaner-reports',
  INVENTORY_ADJUSTMENT_REPORT : 'inventory-adjustment-reports',
  ASSET_SCAN_REPORT : 'asset-scan-reports',
  UNISSUED_GARMENT_REPORT : 'unissued-garment-reports',
  TRUCK_ZONE_REPORT : 'truck-zone-reports',
  AREA_REPORT :'area-reports',
  TOTE_TRANSACTION_REPORT :'tote-transaction-reports',
  TOTE_SCAN_REPORT :'tote-scan-reports',
  EMPLOYEE_ASSET_RETURN_REPORT :'employee-asset-return-reports',
  TRAILER_INVENTORY_REPORT : 'trailer-inventory-reports',
  KNIFE_SHARPENING_REPORT : 'knife-sharpening-reports',
  EMPLOYEE_SHARPENING_REPORT : 'employee-sharpening-reports',
  EXPIRATION_REPORT : 'expiration-reports',
};
