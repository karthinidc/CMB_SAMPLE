/* eslint-disable indent */

/*************************************************
 * InnovaZone
 * CognexScanner.js
 * Created by KARTHI NALLIYAPPAN on December 8, 2021
 * Copyright © 2021 InnovaZone. All rights reserved.
 *************************************************/


 'use strict';

 import React, { Component } from 'react';
import {
  Platform,
  View,
  NativeEventEmitter,
  AppState,
} from 'react-native';
import PropTypes from 'prop-types'; 
import { CMBReader, cmb } from 'cmbsdk-react-native';
import Events from 'react-native-simple-events';

const scannerListener = new NativeEventEmitter(cmb);

//----------------------------------------------------------------------------
// If usePreconfiguredDeviceType is true, then the app will create a reader
// using the values of deviceClass/cameraMode. Otherwise, the app presents
// a pick list for the user to select either MX-1xxx, MX-100, or the built-in
// camera.
//----------------------------------------------------------------------------
const usePreconfiguredDevice = true;
let deviceClass = CMBReader.DEVICE_TYPE.Camera;
let cameraMode = CMBReader.CAMERA_MODE.NoAimer;

// cmbSDK Event listeners used in sample app
let listenersNames = [];
let listeners = [];
let applicationStateChangeListener = null;

//----------------------------------------------------------------------------
// The cmbSDK supports multi-code scanning (scanning multiple barcodes at
// one time); thus scan results are returned as an array. Note that
// this sample app does not demonstrate the use of these multi-code features.
//----------------------------------------------------------------------------

 export default class CognexScanner extends Component {

  static defaultProps = {
    isVisibleScanner: false,
  };

  static propTypes = {
    onScanStop: PropTypes.func,
    isVisibleScanner: PropTypes.bool,
    onBarCodeRead: PropTypes.func,
  };

  constructor(){
    super();
    this.state = {
      isScanning:false, 
      connected: false,
      leaveAfterDisconnect: false,
      device: deviceClass,
      results: [],
    };
  }

      // REACT NATIVE LIFECYCLE
  componentDidMount() {
     //----------------------------------------------------------------------------
    // When an applicaiton is suspended, the connection to the scanning device needs
    // to be closed; Also, when we are resumed (become active) we
    // have to restore the connection (assuming we had one). This is the observer
    // we will use to do this, using the AppState RCT module.
    //---------------------------------------------------------------------------- 
    applicationStateChangeListener = AppState.addEventListener('change', (nextAppState) => {
        console.log('************@@@ 3333 nextAppState @@@************:', nextAppState);

        if (nextAppState === 'active'){
            console.log('************@@@ 3333 @@@************');
          this.connectToReaderDevice();
        } else {
          cmb.disconnect();
        }
      }
      );

      if (usePreconfiguredDevice) {
        this.createReaderDevice();
      } else {
        // selectDeviceFromPicker(); // 7777
      }
      
      if (!listenersNames.includes(CMBReader.EVENT.ReadResultReceived)) {
        listenersNames.push(CMBReader.EVENT.ReadResultReceived);
        listeners.push(
          scannerListener.addListener(
            CMBReader.EVENT.ReadResultReceived,
            (results) => {this.readResultReceived(results); }
          )
        );
      }
      
      if (!listenersNames.includes(CMBReader.EVENT.CommandCompleted)) {
        listenersNames.push(CMBReader.EVENT.CommandCompleted);
        listeners.push(
          scannerListener.addListener(
            CMBReader.EVENT.CommandCompleted,
            (response) => { this.commandCompleted(response); }
          )
        );
      }   
  
      if (!listenersNames.includes(CMBReader.EVENT.AvailabilityChanged)) {
        listenersNames.push(CMBReader.EVENT.AvailabilityChanged);
        listeners.push(
          scannerListener.addListener(
            CMBReader.EVENT.AvailabilityChanged,
            (availability) => { this.availabilityChanged(availability); }
          )
        );
      }
  
      if (!listenersNames.includes(CMBReader.EVENT.ConnectionStateChanged)) {
        listenersNames.push(CMBReader.EVENT.ConnectionStateChanged);
        listeners.push(
          scannerListener.addListener(
            CMBReader.EVENT.ConnectionStateChanged,
            (connectionState) => { this.connectionStateChanged(connectionState); }
          )
        );
      }
      this.configureReaderDevice();

      Events.on('onCognexScannerResume', 'Cognex', this._cognexScannerResumEventHandlerFunc.bind(this));

  }
 
  componentWillUnmount() {
    // sampleApp = null;

    // // Remove the AppState change observer
    // applicationStateChangeListener.remove();

    // // remove event listeners
    // listenersNames = [];
    // for (let i = listeners.length - 1; i >= 0; i--) {
    //   listeners[i].remove();
    // }
    // listeners = [];
  }


  _cognexScannerResumEventHandlerFunc(data){
    console.log('********** @@@ data @@@ *************:', data);
    if( data.isScan === 2){
      console.log('********* IF data.isScan ************:', data.isScan);
      cmb.stopScanning();
    }else {
      console.log('********* ELSE data.isScan ************:', data.isScan);
      cmb.startScanning();
      // cmb.connect();
    }
  }

  // This is called when a sendCommand function completes
commandCompleted(response) {
    if (response.commandID == 'DEVICE.TYPE') {
      // GET DEVICE.TYPE DMCC COMPLETED
    }
  
    if (response.commandID == 'DEVICE.FIRMWARE-VER') {
      // GET DEVICE.FIRMWARE-VER DMCC COMPLETED
    }
  
    console.log(`CMB - CommandCompleted ${JSON.stringify(response)}`);
  }

  // This is called after scanning has completed, either by detecting a barcode, canceling the scan by using the on-screen button or a hardware trigger button, or if the scanning timed-out
readResultReceived(readResult) {
        this.setState({
        isScanning: false,
        connected: this.state.connected,
        device: this.state.device,
        results: readResult.subReadResults.length > 0 ? readResult.subReadResults : readResult.readResults,
      }
      );
      let scannedValue = readResult.subReadResults.length > 0 ? readResult.subReadResults[0].readString : readResult.readResults[0].readString;
    console.log('********** scannedValue ************:', scannedValue);
      if (scannedValue) {
        this.props.onBarCodeRead(scannedValue);
      }
  }

  // This is called when a connection with the self.readerDevice has been changed.
// The self.readerDevice is usable only in the "CMBReader.CONNECTION_STATE.Connected" state
connectionStateChanged(connectionState) {
    console.log('*********** connectionStateChanged **********:', connectionState);
    this.updateScanningState(false);
    this.updateReaderDeviceConnectionState(connectionState == CMBReader.CONNECTION_STATE.Connected);
  
    if (deviceClass == CMBReader.DEVICE_TYPE.Camera && 
      cameraMode == CMBReader.CAMERA_MODE.ActiveAimer && 
      (connectionState == CMBReader.CONNECTION_STATE.Connected || connectionState == CMBReader.CONNECTION_STATE.Disconnected)) {
      cmb.toggleConnectionAlert(false);
    }
  
    if (connectionState === CMBReader.CONNECTION_STATE.Connected) {
      this.configureReaderDevice();
    } else if (connectionState === CMBReader.CONNECTION_STATE.Disconnected && this.state.leaveAfterDisconnect) {
      this.leaveScannerScreen();
    }
  }

  leaveScannerScreen() {
    if (this.state.connected) {
      this.setLeaveAfterDisconnect(true);
      cmb.disconnect();
    } else {
      console.log('*********** leaveScannerScreen *************:' );
      // Add your logic here for navigating out of this screen, depending on how it was presented (e.g. goBack, pop, or your custom implementation)
  
    }
  }

  setLeaveAfterDisconnect(leaveAfterDisconnect) {
    // if (sampleApp) {
      this.setState({
        isScanning: this.state.isScanning,
        connected: this.state.connected,
        leaveAfterDisconnect,
        device: this.state.device,
        results: this.state.results,
      }
      );
    // }
  }

  //----------------------------------------------------------------------------
// This is an example of configuring the device. In this sample application, we
// configure the device every time the connection state changes to connected (see
// the connectionStateChanged event below), as this is the best
// way to garentee it is setup the way we want it. Not only does this garentee
// that the device is configured when we initially connect, but also covers the
// case where an MX reader has hibernated (and we're reconnecting)--unless
// setting changes are explicitly saved to non-volatile memory, they can be lost
// when the MX hibernates or reboots.
//
// These are just example settings; in your own application you will want to
// consider which setting changes are optimal for your application. It is
// important to note that the different supported devices have different, out
// of the box defaults:
//
//    * MX-1xxx Mobile Terminals have the following symbologies enabled by default:
//        - Data Matrix
//        - UPC/EAN
//        - Code 39
//        - Code 93
//        - Code 128
//        - Interleaved 2 of 5
//        - Codabar
//    * MX-100 (iOS ONLY) Barcode Reader has the following symbologies enabled by default:
//        - UPC/EAN
//        - Code 39
//        - Code 128
//        - GS1 Databar
//        - PDF417
//        - QR Code
//    * camera reader has NO symbologies enabled by default
//
// For the best scanning performance, it is recommended to only have the barcode
// symbologies enabled that your application actually needs to scan. If scanning
// with an MX-1xxx, that may mean disabling some of the defaults (or enabling
// symbologies that are off by default).
//
// Keep in mind that this sample application works with all three types of devices,
// so in our example below we show explicitly enabling symbologies as well as
// explicitly disabling symbologies (even if those symbologies may already be on/off
// for the device being used).
//
// We also show how to send configuration commands that may be device type
// specific--again, primarily for demonstration purposes.
//----------------------------------------------------------------------------
configureReaderDevice(){
    //----------------------------------------------
    // Explicitly enable the symbologies we need
    //----------------------------------------------
    cmb.setSymbology(CMBReader.SYMBOLOGY.DataMatrix, true, CMBReader.SYMBOLOGY_NAME.DataMatrix);
    cmb.setSymbology(CMBReader.SYMBOLOGY.C128, true, CMBReader.SYMBOLOGY_NAME.C128);
    cmb.setSymbology(CMBReader.SYMBOLOGY.UpcEan, true, CMBReader.SYMBOLOGY_NAME.UpcEan);
  
    //-------------------------------------------------------
    // Explicitly disable symbologies we know we don't need
    //-------------------------------------------------------
    cmb.setSymbology(CMBReader.SYMBOLOGY.QR, false, CMBReader.SYMBOLOGY_NAME.QR);
    cmb.setSymbology(CMBReader.SYMBOLOGY.C39, false, CMBReader.SYMBOLOGY_NAME.C39);
  
    //---------------------------------------------------------------------------
    // Below are examples of sending DMCC commands and 
    // getting the response in the CMBReader.EVENT.CommandCompleted event
    //---------------------------------------------------------------------------
    cmb.sendCommand('GET DEVICE.TYPE', 'DEVICE.TYPE');
    cmb.sendCommand('GET DEVICE.FIRMWARE-VER', 'DEVICE.FIRMWARE-VER');
  
    //---------------------------------------------------------------------------
    // We are going to explicitly turn off image results (although this is the
    // default). The reason is that enabling image results with an MX-1xxx
    // scanner is not recommended unless your application needs the scanned
    // image--otherwise scanning performance can be impacted.
    //---------------------------------------------------------------------------
    cmb.enableImage(false).then((resolve) => {
    }).catch((failure) => {
      console.log(`CMB - enableImage failed: ${JSON.stringify(failure)}`);
    });
  
    cmb.enableImageGraphics(false).then((resolve) => {
    }).catch((failure) => {
      console.log(`CMB - enableImageGraphics failed: ${JSON.stringify(failure)}`);
    });
    
    // Do not interrupt scan if application rotates
    cmb.setStopScannerOnRotate(false);
    // cmb.setPreviewContainerFullScreen();
    // cmb.setPreviewContainerPositionAndSize([0,0,100,50]);    
      
    //---------------------------------------------------------------------------
    // Device specific configuration examples
    //---------------------------------------------------------------------------
  
    if (deviceClass === CMBReader.DEVICE_TYPE.Camera) {
      //---------------------------------------------------------------------------
      // Phone/tablet/MX-100
      //---------------------------------------------------------------------------
  
      // Set the SDK's decoding effort to level 3
      cmb.sendCommand('SET DECODER.EFFORT 3', 'DECODER.EFFORT');
    } else if (deviceClass == CMBReader.DEVICE_TYPE.MXReader) {
      //---------------------------------------------------------------------------
      // MX-1xxx
      //---------------------------------------------------------------------------
  
      //---------------------------------------------------------------------------
      // Save our configuration to non-volatile memory (on an MX-1xxx; for the
      // MX-100/phone, this has no effect). However, if the MX hibernates or is
      // rebooted, our settings will be retained.
      //---------------------------------------------------------------------------
      cmb.sendCommand('CONFIG.SAVE', 'CONFIG.SAVE');
    }
  
    cmb.sendCommand('GET DEVICE.TYPE', new Date().getTime().toString());
    cmb.sendCommand('SET DECODER.MAX-SCAN-TIMEOUT 0', 'timeoutCmdID');

    cmb.startScanning().then((resolver) => {
        console.log('************@@@ startScanning @@@************', resolver);

        this.updateScanningState(true);
      }).catch((rejecter) => {
        this.updateScanningState(false);
      });
  }

  // ReaderDevice EVENTS

// This is called when a MX-1xxx device has became available (USB cable was plugged, or MX device was turned on),
// or when a MX-1xxx that was previously available has become unavailable (USB cable was unplugged, turned off due to inactivity or battery drained)
availabilityChanged(availability) {
    if (availability == CMBReader.AVAILABILITY.Available) {
      console.log('************@@@ 1111 @@@************');
      this.connectToReaderDevice();
    }
    console.log(`CMB - AvailabilityChanged ${JSON.stringify(availability)}`);
  }

// Create a readerDevice using the selected option from "selectDeviceFromPicker"
// Optionally, if you don't want to use multiple device types, you can remove the switch statement and keep only the one type that you need
     createReaderDevice(){
    if (this.state.connected === CMBReader.CONNECTION_STATE.Connected) {
      cmb.disconnect();
    }
  
    cmb.setCameraMode(cameraMode);
    cmb.setPreviewContainerPositionAndSize([10,38,80,40]);
  
    if (Platform.OS === 'ios') {
      cmb.registerSDK('Nix6OBNkjveqDocdXuyM9docE0KeSl5QIrrvFMxEwbc=');
    } else {
      cmb.registerSDK('WFGPFfdFvR0OXMod1E8nyAm1aMR2aYqhmOh/E/QK/Gk=');
    }
    cmb.loadScanner(deviceClass).then((response) => {
        console.log('************@@@ 2222 @@@************');
      this.connectToReaderDevice();
    });
  
    // this.updateDeviceType();

   
  }

  

  // Before the self.readerDevice can be configured or used, a connection needs to be established
connectToReaderDevice() {
    cmb.getAvailability().then((response) => {
        console.log('*********** getAvailability ***********:', response);
    //   if (response == CMBReader.AVAILABILITY.Available) {
  
        if (deviceClass === CMBReader.DEVICE_TYPE.Camera && cameraMode === CMBReader.CAMERA_MODE.ActiveAimer) {
          cmb.toggleConnectionAlert(true);
        }
  
        cmb.connect().then((connectMethodResult) => {
           console.log('*********** connect ***********:', connectMethodResult);
        }).catch((failure) => {
          console.log(`CMB - connectReader failed: ${JSON.stringify(failure)}`);
        });
    //   }
    }).catch((rejecter) => {
      console.log(`CMB - getAvailability failed: ${JSON.stringify(rejecter)}`);
    });
  }

  // Update sample app UI
updateScanningState(isScanning) {
    // if (sampleApp) {
    //     this.setState({
    //     isScanning,
    //     connected: this.state.connected,
    //     leaveAfterDisconnect: this.state.leaveAfterDisconnect,
    //     device: this.state.device,
    //     results: this.state.results,
    //   }
    //   );
    // }
  }


updateReaderDeviceConnectionState(isConnected) {
    // if (sampleApp) {
        this.setState({
        isScanning: this.state.isScanning,
        connected: isConnected,
        leaveAfterDisconnect: this.state.leaveAfterDisconnect,
        device: this.state.device,
        results: this.state.results,
      }
      );
    // }
  }


updateDeviceType() {
    // if (sampleApp) {
        this.setState({
        isScanning: this.state.isScanning,
        connected: this.state.connected,
        leaveAfterDisconnect: this.state.leaveAfterDisconnect,
        device: deviceClass,
        results: this.state.results,
      }
      );
    // }
  }

   
  render() {
    return (
      <View style={{width: 200, height: 200, padding:'5%'}} />
    );
  } 
 }