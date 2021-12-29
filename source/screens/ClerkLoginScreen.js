/*************************************************
 * InnovaZone
 * ClerkLoginScreen.js
 * Created by Selvin Thamodharan on 14/02/2018
 * Copyright © 2018 InnovaZone. All rights reserved.
 *************************************************/

'use strict';

import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
  Alert,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
 
import {
  SCREEN_TITLE, COLOR, VALIDATION_MSG, SUCCESS_MSG, ALERT, STORAGE, PASSWORD,
  CONFIGURATIONKEY, AUTHENTICATION_TYPE, REACT_TIMEOUT, NETWORK_ERROR, SCANNER, DEVICE_RESPONSE, FONT_SIZE, TOAST_DURATION, FONT_FAMILY, SERVER, KEYS,
} from '../common/Constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import screenStyle from './css/ClerkLoginScreenCSS';
import globalStyle from './css/GlobalStyleCSS';
import * as Animatable from 'react-native-animatable';
import Permissions from 'react-native-permissions';
import Spinner from 'react-native-spinkit';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Events from 'react-native-simple-events';
 
import _ from 'lodash';
import PreventDoubleClick from '../common/PreventDoubleClick';
import CognexScanner from '../utils/components/CognexScanner'; 
 
const TouchableOpacityEx = PreventDoubleClick(TouchableOpacity);
const TouchableHighlightEx = PreventDoubleClick(TouchableHighlight);
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
 
let timer;
let isLoginButtonSubmit;
 
/**
  * Handles Clerk Login functionality
  * Check the clerk id authentication in database 
  * After successful clerk id validation, we are navigating to clerk dashboard.
  */
class ClerkLoginScreen extends Component {
 
   static propTypes = {
     navigation: PropTypes.object,
   };
 
   constructor(props) {
     super(props);
     isLoginButtonSubmit = false;
 
     this.state = {
       isLandscape: false,
       selectedTab: AUTHENTICATION_TYPE.BARCODE,
       visibleHud: false,
       clerkIdInputTxt: '', //Value set for easy login during deveopment. It should be removed on Build Delivery.
       clerkPasswordInputTxt: '',
       isClerkHavePassword: false,
       powerByLogoImageURL: '',
       companyLogoImageURL: '',
       clerkLoginButtonTitle: 'Login',
       segBarcodeTitle: 'Barcode',
       segClerkIdTitle: 'Clerk ID',
       txtLableTitle: 'Clerk ID',
       isBarcodeSegmentHidden: false,
       isClerkIdSegmentHidden: false,
       activityIndicatorVisible: false,
       isRFIDEnabled: false,
       isInfineaLaserEnabled: false,
       isMagneticEnabled: false,
       messageHud: '',
       isInfraredEnabled: false,
       isScreenDataLoaded: true,
       isScanditEnabled: false,
       selectedIndex: 0,
       txtTempScanValue: '',
       isCognexEnabled: true,
 
       socketScannerResponse: '',
       isRescan: false,
       isRFIDAutoReconnect: false,
       infineaDeviceConnectStatus: global.infineaDeviceConnectStatus,
     };
   }
 
   componentDidMount() {
     this._checkCameraAndPhotos();
   }
 
   /**
    * Gets triggered when the view unlods
    * Removes all listeners
    */
   componentWillUnmount() {
   }
 

   /**
    * This method request permission to access user bluetooth
    */
   _requestPermission() {
     Permissions.request('bluetooth').then((response) => {
       // Returns once the user has chosen to 'allow' or to 'not allow' access
       // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
       this._CheckLocationEnabledClicked();
     }).catch((error) => console.log('Permissions.request : ', error));
   }
 
   /**
    * This method check permission to access user location
    * If authorized then get state short name
    * Then call speciality category list 
    */
   _CheckLocationEnabledClicked() {
     this.setState({ 'locationLoading': true });
     Permissions.check('bluetooth').then((response) => {
       // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
       this.setState({ bluetoothPermission: response });
       if (response === 'authorized') {
         // set state
       } else {
         this._showPermissionAlert(response);
       }
     }).catch((error) => console.log('Permissions.check : ', error));
   }
 
 
   /**
    * Show alert to enable location permission
    */
   _showPermissionAlert(response) {
     Alert.alert(
       ALERT.INFO,
       ALERT.TITLE.BLUETOOTH_TURNED_OFF_MESSAGE,
       [
         {
           text: 'Not Now',
           onPress: () => { },
           style: 'cancel',
         },
         response === 'undetermined'
           ? { text: 'OK', onPress: () => this._requestPermission() }
           : { text: 'Open Settings', onPress: () => Permissions.openSettings() },
       ],
     );
   }
 
 
   /**
    *  Check the status of multiple permissions
    */
   _checkCameraAndPhotos = () => {
     Permissions.check('camera').then((response) => {
       //response is an object mapping type to permission
       this.setState({
         cameraPermission: response.camera,
       });
     }).catch((error) => {
       // 
     });
   }

 
   /**
    * Navigates to Reset CRN Screen 
    */
   _navigateToResetCRNScreen() {
     
   }
 
   /**
    * After successful clerk user name / barcode validation, we are navigating to ClerkDashboard Screen.
    * Set clerk details to AppSession-CURRENTCLERK 
    * @param  {} clerkDetails - Clerk details values in dictionary
    */
   _navigateToClerkDashboardScreen(clerkDetails) {
    
   }
 
   /**
    * Method is called when user tapped login button validate the clerk id from data base 
    * Check if clerk contains password in database show the password field
    * After successful clerk login, Navigate to clerk dashboard screen.
    */
   _loginButtonSubmit(clerkID) {
     isLoginButtonSubmit = true;
     const { selectedTab, clerkIdInputTxt } = this.state;
     if (selectedTab == AUTHENTICATION_TYPE.USERID) {
       if (clerkIdInputTxt.trim() == '') {
         alert(VALIDATION_MSG.NO_CLERK_ID);
         return;
       }
     }
     this._loginAuthenticationWithDatabase(clerkID, selectedTab, 0);
   }
 
   _loginInfraredAuthenticationWithDatabase(clerkID, selectedTab, isScandit) {
     
   }
 
   /**
   * Method is called when user tapped login button validate the clerk id from data base 
   * Check if clerk contains password in database show the password field
   * After successful clerk login, Navigate to clerk dashboard screen.
   */
   _loginAuthenticationWithDatabase(clerkID, selectedTab, isScandit) {
     alert (clerkID);
 
   }
 
 
   /**
    * Method is called when user tapped login button validate the clerk password from data base
    * Navigate to clerk dashboard screen.
    */
   _passwordLoginButtonSubmit() {
    
   }
 
   /**
    * Method is called when user tapped back button hide the password text field and show the user id feild
    */
   _passwordBackButtonTapped() {
     this.setState({ isClerkHavePassword: false, clerkPasswordInputTxt: '' });
   }
 
   /**
    * Call the partial web service call for offline records sync to web server.
    */
   _syncButtonTap() {
   
   }
 
   _rfidButtonTap() {
     
   }
 
   /**
    * Method is called when view size changed due to screen orientation changed.
    */
   onLayout(e) {
     deviceWidth = Dimensions.get('window').width;
     deviceHeight = Dimensions.get('window').height;
     if (deviceWidth > deviceHeight) {
       this.setState({ isLandscape: true });
     } else {
       this.setState({ isLandscape: false });
     }
   }
 
   /**
    * On change clerk id called based on typing.
    * @param  {} value - Clerk id text
    */
   _onClerkIdValueChanged(value) {
     const { isInfraredEnabled, isMagneticEnabled } = this.state;
     this.setState({ clerkIdInputTxt: value });
     if ((isInfraredEnabled || isMagneticEnabled) && !isLoginButtonSubmit) {
       if (timer) {
         clearTimeout(timer);
       }
       timer = setInterval(() => {
         clearTimeout(timer);
         if (value.length && timer) {
           this._loginInfraredAuthenticationWithDatabase(value, 1, 0);
         }
       }, 1000); // 1000= 1 second , the timer will run every second
     }
   }
 
 

 
   handleIndexChange = (index) => {
     if (index === 0) {
       this.setState({
         ...this.state,
         selectedIndex: index,
         selectedTab: AUTHENTICATION_TYPE.BARCODE,
       });
       Events.trigger('onCognexScannerResume', {isScan : 1});
     } else {
       this.setState({
         ...this.state,
         selectedIndex: index,
         selectedTab: AUTHENTICATION_TYPE.USERID,
       });
       Events.trigger('onCognexScannerResume', {isScan : 2});
     }
 
   };
 
 
   /**
    * Render screen content with in card view
    */
   _renderBarcodeEmployee() {
     return (
       <View style={{ flex: 1, margin: (this.state.isRFIDEnabled === true || this.state.isInfineaLaserEnabled === true || this.state.isMagneticEnabled === true) ? 0 : 30 }}>
         <View style={{ flexDirection: 'row' }}>
           <View style={{ flex: 1 }} />
           <View style={{ flex: 6, borderWidth: 2, borderColor: COLOR.THEME }}>
             <View style={{ flexDirection: 'row' }}>
               {this._renderSegmentBarcode()}
 
               <View style={{ width: 2, backgroundColor: COLOR.THEME }} />
               {this._renderSegmentClerkId()}
             </View>
           </View>
 
           <View style={{ flex: 1 }} />
         </View>
 
         <View style={{ flex: 1, marginTop: 20 }}>
           {this._renderScannerOrManual()}
         </View>
       </View>
     );
   }
 
 
   /**
    * Render screen except header bar
    */
   _renderScreen() {
     return (
       <View style={screenStyle.cardContainer}>
         <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginVertical: 3 }}>
           {/* {this._renderRFIDImageView()}
           {this._renderBarcodeImageView()}
           {this._renderMagneticImageView()} */}
         </View>
         <View style={{
           height: (this.state.isLandscape) ? deviceHeight * (3 / 5) : deviceHeight / 2,
           width: (this.state.isLandscape) ? deviceWidth * (3 / 5) : deviceWidth * (4 / 5),
         }}
         >
           {
             !this.state.isBarcodeSegmentHidden &&
               !this.state.isClerkIdSegmentHidden ?
               this._renderScreenContent() : this._renderBarcodeEmployee()
           }
 
         </View>
       </View>
     );
   }
 
   /**
    * Render the segment title view
    * If EmployeeID feature is not Enables then Hide this Section from the Segment Control
    */
   _renderSegmentClerkId() {
     if (!this.state.isClerkIdSegmentHidden) {
       return (
         <TouchableHighlight style={{ flex: 1 }}
           underlayColor={'transparent'}
           onPress={() => {
             this.setState({ selectedTab: AUTHENTICATION_TYPE.USERID });
           }}
         >
           <Text style={[screenStyle.segmentText, {
             color: (this.state.selectedTab === AUTHENTICATION_TYPE.BARCODE) ? COLOR.THEME : 'white',
             backgroundColor: (this.state.selectedTab === AUTHENTICATION_TYPE.BARCODE) ? 'white' : COLOR.THEME,
           }]}
           >
             {this.state.segClerkIdTitle}
           </Text>
         </TouchableHighlight>
       );
     } else {
       return (
         <View />
       );
     }
   }
 
   /**
    * Render the segment title view
    * If Barcode feature is not Enables then Hide this Section from the Segment Control
    */
   _renderSegmentBarcode() {
     if (!this.state.isBarcodeSegmentHidden) {
       return (
         <TouchableHighlight style={{ flex: 1 }}
           underlayColor={'transparent'}
           onPress={() => {
             this.setState({ selectedTab: AUTHENTICATION_TYPE.BARCODE });
           }}
         >
           <Text style={[screenStyle.segmentText, {
             color: (this.state.selectedTab === AUTHENTICATION_TYPE.BARCODE) ? 'white' : COLOR.THEME,
             backgroundColor: (this.state.selectedTab === AUTHENTICATION_TYPE.BARCODE) ? COLOR.THEME : 'white',
           }]}
           >
             {this.state.segBarcodeTitle}
           </Text>
         </TouchableHighlight>
       );
     } else {
       return (
         <View />
       );
     }
   }
 
   /**
    * Render screen content with in card view
    */
   _renderScreenContent() {
     return (
       <View style={{ flex: 1, margin: (this.state.isRFIDEnabled === true || this.state.isInfineaLaserEnabled === true || this.state.isMagneticEnabled === true) ? 0 : 30, alignItems: 'center' }}>
         <View style={{ flexDirection: 'row' }}>
           <View style={{ flex: 1 }}>
             <SegmentedControlTab
               values={[this.state.segBarcodeTitle, this.state.segClerkIdTitle]}
               activeTabStyle={{ backgroundColor: 'white', shadowColor: 'gray', borderRadius: 10 }}
               activeTabTextStyle={{ color: '#000000' }}
               tabTextStyle={{ fontSize: 22, color: 'black', fontFamily: FONT_FAMILY.HELVETICA_CONDENSEDBOLD }}
               selectedIndex={this.state.selectedIndex}
               onTabPress={this.handleIndexChange}
               tabStyle={{ backgroundColor: '#F1F4F9', height: 50, borderColor: '#F1F4F6', borderWidth: 3 }}
             />
           </View>
         </View>
 
         <View style={{ flex: 1, marginTop: 20, width: 550 }}>
           {this._renderScannerOrManual()}
         </View>
       </View>
     );
   }
 
   /**
    * Render scanner or manual entry option based on selected tab option
    */
   _renderScannerOrManual() {
     const { isScanditEnabled, selectedTab, isClerkHavePassword, selectedIndex, isBarcodeSegmentHidden, isCognexEnabled } = this.state;
     if (!isBarcodeSegmentHidden && selectedIndex === 0) {
       return (
         <View style={{ flex: 1 }}>
            
           <CognexScanner
             isVisibleScanner={this.state.selectedTab}
             onBarCodeRead={(data) => {
               this._loginAuthenticationWithDatabase(data, 1, 1);
             }}
           />
               
          
            
         </View>
       );
     } else {
       if (isClerkHavePassword) {
         return (
           <View style={{ flex: 1, flexDirection: 'row' }}>
             <View style={{ flex: 1 }} />
 
             <View style={{ flex: 6, justifyContent: 'center' }}>
               <Animatable.View animation="fadeInRight"
                 duration={200}
                 delay={100}
               >
                 <Text style={screenStyle.crnNoTxt}>
                   Password :
                 </Text>
                 <TextInput
                   style={[screenStyle.textInputStyle]}
                   returnKeyType={'done'}
                   autoCapitalize="none"
                   autoCorrect= {true}
                   onChangeText={(clerkPasswordInputTxt) => this.setState({ clerkPasswordInputTxt })}
                   value={this.state.clerkPasswordInputTxt}
                   autoFocus={true}
                   secureTextEntry={true}
                 />
 
                 <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                   <TouchableOpacityEx style={[screenStyle.button, { flex: 1, marginRight: 10 }]}
                     underlayColor="transparent"
                     onPress={() => this._passwordBackButtonTapped()}
                   >
                     <Text style={screenStyle.buttonText}>
                       Back
                     </Text>
                   </TouchableOpacityEx>
                   <TouchableOpacityEx style={[screenStyle.button, { flex: 1, marginLeft: 10 }]}
                     underlayColor="transparent"
                     onPress={() => this._passwordLoginButtonSubmit()}
                   >
                     <Text style={screenStyle.buttonText}>
                       Login
                     </Text>
                   </TouchableOpacityEx>
                 </View>
               </Animatable.View>
             </View>
 
             <View style={{ flex: 1 }} />
           </View>
         );
       } else {
         return (
           <View style={{ flex: 1, flexDirection: 'row' }}>
             <View style={{ flex: 1 }} />
 
             <View style={{ flex: 6, justifyContent: 'center' }}>
               <Text style={[screenStyle.crnNoTxt, { fontSize: (Platform.OS === 'ios') ? deviceHeight / 40.96 : 24 }]}>
                 {this.state.txtLableTitle}
               </Text>
               <TextInput
                 ref="clerkIdInput"
                 style={[screenStyle.textInputStyle]}
                 returnKeyType={'done'}
                 autoCapitalize="none"
                 autoCorrect= {true}
                 onChangeText={(value) => { this._onClerkIdValueChanged(value); }}
                 value={this.state.clerkIdInputTxt}
                 autoFocus={true}
               />
 
               <TouchableHighlightEx style={screenStyle.button}
                 underlayColor="transparent"
                 onPress={() => this._loginButtonSubmit(this.state.clerkIdInputTxt)}
               >
                 <Text style={screenStyle.buttonText}>
                   {this.state.clerkLoginButtonTitle}
                 </Text>
               </TouchableHighlightEx>
             </View>
 
             <View style={{ flex: 1 }} />
           </View>
         );
       }
 
     }
   }
 
   /**
    * Renders Parent view
    */
   render() {
     const { isScreenDataLoaded, infineaDeviceConnectStatus } = this.state;
     let backgroundImg = require('../images/LaunchImagePortrait.png');
     if (this.state.isLandscape) {
       backgroundImg = require('../images/LaunchImageLandscape.png');
     } else {
       backgroundImg = require('../images/LaunchImagePortrait.png');
     }
 
     return (
       <View style={globalStyle.container}
         onLayout={this.onLayout.bind(this)}
       >
         <Image source={backgroundImg} resizeMode="cover" style={{ height: deviceHeight, width: deviceWidth }} />
         <View style={[globalStyle.container, { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center' }]}>
           {
             //toolbar starts
           }
           <View style={globalStyle.toolbar}>
 
             <View style={[globalStyle.toolbarLeftView, { height: 40, flex: 3, alignItems: 'center', justifyContent: 'center' }]}>
               <Text style={{ color: COLOR.DEVICE_CONNECTED_STATUS, fontFamily: 'HelveticaNeue-CondensedBold', fontWeight: 'bold', fontSize: FONT_SIZE.SCREEN_NAVIGATION_CONTENT }}>
                 {infineaDeviceConnectStatus}
               </Text>
             </View>
             {/* <View style={globalStyle.toolbarLeftView} /> */}
 
             <Text style={[globalStyle.toolbarTitleText, { left: (this.state.isRFIDEnabled) ? 30 : 0, flex: 3, textAlign: 'left' }]}>
               {SCREEN_TITLE.LOGIN}
             </Text>
  
             <TouchableHighlightEx
               underlayColor={'transparent'}
               onPress={() => {
                 this._syncButtonTap();
               }}
             >
               <Image
                 resizeMode="contain"
                 tintColor={'white'}
                 source={require('../images/Sync.png')}
                 style={{ height: 40, width: 40, marginRight: 25 }}
               />
             </TouchableHighlightEx>
 
             <TouchableHighlight
               underlayColor={'transparent'}
               onPress={() => this._navigateToResetCRNScreen()}
             >
               <Image
                 resizeMode="contain"
                 source={require('../images/Logout.png')}
                 style={{ height: 40, width: 40, marginRight: 20 }}
               />
             </TouchableHighlight>
           </View>
           {
             //toolbar ends
           }
 
           {
             (isScreenDataLoaded) ?
               <KeyboardAwareScrollView
                 extraHeight={70}
                 enableOnAndroid={true}
                 onKeyboardWillShow={(frames) => { }}
               >
                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                   <Image
                     style={{ height: (this.state.isLandscape) ? deviceHeight / 7 : deviceHeight / 8, width: deviceHeight / 2, marginVertical: (this.state.isLandscape) ? deviceHeight / 100 : deviceHeight / 26 }} resizeMode="contain"
                     // source={(this.state.companyLogoImageURL != '' && this.state.companyLogoImageURL != KEYS.DEFAULT_LOGO) ? { uri: this.state.companyLogoImageURL } : (this.state.ßcompanyLogoImageURL === KEYS.DEFAULT_LOGO) ? require('../images/TopLogo.png') : ''}
                     source={(_.includes(this.state.companyLogoImageURL, 'require(\'../images/TopLogo.png\')')) ? require('../images/TopLogo.png') : { uri: this.state.companyLogoImageURL }}
                   />
                 </View>
 
                 {this._renderScreen()}
 
               </KeyboardAwareScrollView>
               :
               <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                 <Spinner
                   isVisible={true}
                   size={deviceWidth * 0.05}
                   type={'FadingCircleAlt'}
                   color={COLOR.BLACK}
                 />
               </View>
           }
 
 
           <View style={[globalStyle.bottomPowerByLogoMainContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
 
             <Image
               style={{ height: 60, width: 500 }}
               resizeMode="contain"
               source={(this.state.powerByLogoImageURL) ? { uri: this.state.powerByLogoImageURL } : require('../images/Poweredby.png')}
             />
           </View>
 
           <View style ={[globalStyle.bottomPowerByLogoMainContainer,  {position: 'absolute', flex:1,  flexDirection : 'row'}]}>
             <View style={{flex:1}} />
             <View style ={{flexDirection : 'row', alignItems: 'center', justifyContent: 'center' }}>
               <Text style={[screenStyle.versionText, { fontSize: deviceHeight / 64, color: COLOR.THEME, marginRight: 10 }]}>
                 {'QA'}
               </Text>
               <Text style={[screenStyle.versionText, { fontSize: 14, fontWeight: '600' }]}>
               V {'4.79.5'}
               </Text>
 
             </View>
           </View>
 
         </View>
       </View>
     );
   }
}
 
 
export default ClerkLoginScreen;
 