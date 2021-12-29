
/*************************************************
  * InnovaZone
  * Utility.js
  * Created by Selvin Thamodharan on 13/02/2018
  * Copyright © 2018 InnovaZone. All rights reserved.
  *************************************************/

import {
  Alert,
  AsyncStorage,
  Dimensions,
} from 'react-native';
  
import { VALIDATION_MSG , ALERT} from './../common/Constants';
import { NavigationActions } from 'react-navigation';
import { isDevelopment } from '../webservice/URL';

/**
* Has all the commonly used methods
*/
export default class Utility {
  
  /**
  * Shows alert to the user
  * - Parameter
  *    title: Title to be shown on the alert
  *    message: Message of the alert to show to the user
  */
  static showAlert(title, message) {
    Alert.alert(title,message),[
      {text: ALERT.BTN.OK},
    ];
  }
  
  /**
  * Shows alert to the user
  * - Parameter
  *    title: Title to be shown on the alert
  *    message: Message of the alert to show to the user
  */
  static showAlertWithPop(title, message, navigation) {
    Alert.alert(title,message,[
      {text: ALERT.BTN.OK, onPress: () => {navigation.goBack();}},
    ],
    { cancelable: false }
    );
  }
    
  /**
  * Shows session expires alert
  * - Parameter
  *    navigator: Get the current navigator object
  */
  static showExpiredAlert(navigation) {
    Alert.alert(ALERT.TITLE.EXPIRED,
      VALIDATION_MSG.EXPIRED,[
        {text: ALERT.BTN.OK, onPress: () => {
          const moveToFirst = NavigationActions.reset(
            {
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Login', 'params': { isLoggedIn: false}}),
              ],
            });
          navigation.dispatch(moveToFirst);
        }},
      ],
      { cancelable: false }
    );
  }
    
  
  /**
  * Check a JSON object whether it contains the particular key
  * - Parameter
  *    jsonObj: JSON Object
  *    key: Key to be checked in JSON
  */
  static hasJSONKey(jsonObj, key) {
    let value = jsonObj.hasOwnProperty(key);
    return value;
  }

  /**
   * Convert string to json format 
   * @param {*} str 
   */
  static isStringInJSONFormat(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  
  /**
   * 
   * @param {*} d 
   */
  static pad(d) {
    return (d < 10) ? `0${  d.toString()}` : d.toString();
  }
  
  /**
   * 
   * @param {*} str 
   */
  static toTitleCase(str) {
    if (str !== null && str !== undefined && str !== '' ) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    } else {
      return '';
    }
  }
  
  static clone(obj) {
    if (null == obj || 'object' != typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  /**
   * Height for autosuggestion 
   * @param {*} length 
   * @param {*} windowHeight 
   * @param {*} reduceHeight 
   */
  static dropdownHeight(length, windowHeight , reduceHeight) {
    console.log(`length : ${length} windowHeight: ${windowHeight} reduceHeight : ${reduceHeight}`);
    let height = length * 45;
    if (parseInt(height) > parseInt(windowHeight)) {
      console.log('out side screeen',windowHeight - reduceHeight);      
      return windowHeight - reduceHeight;  
    } else {
      console.log('in side screeen',height); 
      return height;
    }
  }

  /**
   * Height and width screen 
   */
  static screenDiemension() {
    let deviceWidth = Dimensions.get('window').width;
    let deviceHeight = Dimensions.get('window').height;

    const dim = Dimensions.get('screen');
    if (dim.height >= dim.width) {
      alert ('portrait');
    }else {
      alert ('landscape');
    } 
  }
}

/**
 * To show log if only isDevelopment is true 
 * @param {*} params 
 */
export function myLog(...params) {
  if (isDevelopment) {  
    console.log(...params);  
  }  
} 
  
/**
 * Set the app first time install status in Async Storage
 */
export function setAppStaus(value) {
  AsyncStorage.setItem('firstTimeInstall', value).then((value) => {
    // If need get the response value
  }).catch((error) => {
    myLog('Catch error : ',error);
  });
}

/**
 * Get the app first time install status in Async Storage
 */
export function getAppStaus(callback) {
  AsyncStorage.getItem('firstTimeInstall').then((value) => {
    callback(value);
  }).catch((error) => {
    myLog('Catch error : ',error);
  });
}

/**
 * Set the selected host name in Async Storage
 */
export function setHostName(value) {
  AsyncStorage.setItem('hostName', value).then((value) => {
    // If need get the response value
  }).catch((error) => {
    myLog('Catch error : ',error);
  });
}

/**
 * Get the host name in Async Storage
 */
export function getHostName(callback) {
  AsyncStorage.getItem('hostName').then((value) => {
    callback(value);
  }).catch((error) => {
    myLog('Catch error : ',error);
  });
}

/**
 * Set the API vesrion in Async Storage
 */
export function setAPIVersion(value) {
  AsyncStorage.setItem('apiVersion', value).then((value) => {
    // If need get the response value
  }).catch((error) => {
    myLog('Catch error : ',error);
  });
}

/**
 * Get the API vesrion in Async Storage
 */
export function getAPIVersion(callback) {
  AsyncStorage.getItem('apiVersion').then((value) => {
    callback(value);
  }).catch((error) => {
    myLog('Catch error : ',error);
  });
}