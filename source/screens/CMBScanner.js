/***********************************************************************************
 *  File name   : ScanController.swift
 *  Description : View controller for cmbSDK sample application
 *  Comments    :
 *
 *    This sample application has been designed to show how simple it is to write
 *    a single application with the cmbSDK that will work with any its supported
 *    devices: an MX-1xxx mobile terminal, an MX-100 (iOS ONLY) barcode reader, or just
 *    the built-in camera of a phone or tablet.
 *
 *    It implements a single view with a pick list for choosing which type of
 *    device to connection to. In our example, we are using the lifecycle of
 *    the viewControl to connect and disconnect to the device (since this is a
 *    single view application); however, this is not the only way to use the SDK;
 *    in a multiple view application you may not want to tie connecting and
 *    disconnecting to a viewController, but to a helper class or otherwise.
 *
 *  Copyright(C) : 2017-present, Cognex Corporation. All rights reserved.
 ***********************************************************************************/

import React, { Component } from 'react';
import { NativeModules } from 'react-native';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  NativeEventEmitter,
  Alert,
  FlatList,
  AppState,
} from 'react-native';

import { CMBReader, cmb } from 'cmbsdk-react-native';

const scannerListener = new NativeEventEmitter(cmb);

//----------------------------------------------------------------------------
// If usePreconfiguredDeviceType is true, then the app will create a reader
// using the values of deviceClass/cameraMode. Otherwise, the app presents
// a pick list for the user to select either MX-1xxx, MX-100, or the built-in
// camera.
//----------------------------------------------------------------------------
const usePreconfiguredDevice = false;
let deviceClass = CMBReader.DEVICE_TYPE.MXReader;
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
let scanResults = null;

let sampleApp = null;

//----------------------------------------------------------------------------
// This is the pick list for choosing the type of reader connection
//----------------------------------------------------------------------------
function selectDeviceFromPicker() {
  let readerOptions = [];

  //
  // Option for scanning with an MX-1000 or MX-1502
  //
  readerOptions.push
  (
    {text: 'MX Scanner (MX-1xxx)', onPress: () => 
    {
      deviceClass = CMBReader.DEVICE_TYPE.MXReader;
      createReaderDevice();
    },
    }
  );

  //
  // Option for scanning with an MX-100 (iOS ONLY)
  //
  if (Platform.OS == 'ios')
  {
    readerOptions.push
    (
      {text: 'MX-100', onPress: () => 
      {
        deviceClass = CMBReader.DEVICE_TYPE.Camera;
        cameraMode = CMBReader.CAMERA_MODE.ActiveAimer;
        createReaderDevice();
      },
      }
    );
  }

  //
  // Option for scanning with the phone/tablet's builtin camera
  //
  readerOptions.push
  (
    {text: 'Phone Camera', onPress: () => 
    {
      deviceClass = CMBReader.DEVICE_TYPE.Camera;
      cameraMode = CMBReader.CAMERA_MODE.NoAimer;
      createReaderDevice();
    },
    }
  );

  Alert.alert (
    'Select device',
    'Pick a ReaderDevice type',
    readerOptions
  );
}

// Create a readerDevice using the selected option from "selectDeviceFromPicker"
// Optionally, if you don't want to use multiple device types, you can remove the switch statement and keep only the one type that you need
function createReaderDevice(){
  if (sampleApp && sampleApp.state.connected == CMBReader.CONNECTION_STATE.Connected) {
    cmb.disconnect();
  }

  cmb.setCameraMode(cameraMode);
  cmb.setPreviewContainerPositionAndSize([25,25,50,50]);
  
  if (Platform.OS === 'ios') {
    cmb.registerSDK('Nix6OBNkjveqDocdXuyM9docE0KeSl5QIrrvFMxEwbc=');
  } else {
    cmb.registerSDK('WFGPFfdFvR0OXMod1E8nyAm1aMR2aYqhmOh/E/QK/Gk=');
  }
  cmb.loadScanner(deviceClass).then((response) => {
    connectToReaderDevice();
  });

  updateDeviceType();
}

// Before the self.readerDevice can be configured or used, a connection needs to be established
function connectToReaderDevice() {
  cmb.getAvailability().then((response) => {
    if (response == CMBReader.AVAILABILITY.Available) {

      if (deviceClass == CMBReader.DEVICE_TYPE.Camera && cameraMode == CMBReader.CAMERA_MODE.ActiveAimer) {
        cmb.toggleConnectionAlert(true);
      }

      cmb.connect().then((connectMethodResult) => {
      }).catch((failure) => {
        console.log(`CMB - connectReader failed: ${JSON.stringify(failure)}`);
      });
    }
  }).catch((rejecter) => {
    console.log(`CMB - getAvailability failed: ${JSON.stringify(rejecter)}`);
  });
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
function configureReaderDevice(){
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
    
  //---------------------------------------------------------------------------
  // Device specific configuration examples
  //---------------------------------------------------------------------------

  if (deviceClass == CMBReader.DEVICE_TYPE.Camera) {
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
}

function toggleScanner() {
  if (sampleApp) {
    if (sampleApp.state.isScanning) 
    {
      cmb.stopScanning().then((response) => {
        updateScanningState(false);
      });
    } else {
      cmb.startScanning().then((resolver) => {
        updateScanningState(true);
      }).catch((rejecter) => {
        updateScanningState(false);
      });
    }
  }
}

// Update sample app UI
function updateScanningState(isScanning) {
  if (sampleApp) {
    sampleApp.setState({
      isScanning,
      connected: sampleApp.state.connected,
      leaveAfterDisconnect: sampleApp.state.leaveAfterDisconnect,
      device: sampleApp.state.device,
      results: sampleApp.state.results,
    }
    );
  }
}

function updateReaderDeviceConnectionState(isConnected) {
  if (sampleApp) {
    sampleApp.setState({
      isScanning: sampleApp.state.isScanning,
      connected: isConnected,
      leaveAfterDisconnect: sampleApp.state.leaveAfterDisconnect,
      device: sampleApp.state.device,
      results: sampleApp.state.results,
    }
    );
  }
}

function updateDeviceType() {
  if (sampleApp) {
    sampleApp.setState({
      isScanning: sampleApp.state.isScanning,
      connected: sampleApp.state.connected,
      leaveAfterDisconnect: sampleApp.state.leaveAfterDisconnect,
      device: deviceClass,
      results: sampleApp.state.results,
    }
    );
  }
}

function setLeaveAfterDisconnect(leaveAfterDisconnect) {
  if (sampleApp) {
    sampleApp.setState({
      isScanning: sampleApp.state.isScanning,
      connected: sampleApp.state.connected,
      leaveAfterDisconnect,
      device: sampleApp.state.device,
      results: sampleApp.state.results,
    }
    );
  }
}

function leaveScannerScreen() {
  if (sampleApp.state.connected) {
    setLeaveAfterDisconnect(true);
    cmb.disconnect();
  } else {
    // Add your logic here for navigating out of this screen, depending on how it was presented (e.g. goBack, pop, or your custom implementation)

  }
}

// ReaderDevice EVENTS

// This is called when a MX-1xxx device has became available (USB cable was plugged, or MX device was turned on),
// or when a MX-1xxx that was previously available has become unavailable (USB cable was unplugged, turned off due to inactivity or battery drained)
function availabilityChanged(availability) {
  if (availability == CMBReader.AVAILABILITY.Available) {
    connectToReaderDevice();
  }
  console.log(`CMB - AvailabilityChanged ${JSON.stringify(availability)}`);
}

// This is called when a connection with the self.readerDevice has been changed.
// The self.readerDevice is usable only in the "CMBReader.CONNECTION_STATE.Connected" state
function connectionStateChanged(connectionState) {
  updateScanningState(false);
  updateReaderDeviceConnectionState(connectionState == CMBReader.CONNECTION_STATE.Connected);

  if (deviceClass == CMBReader.DEVICE_TYPE.Camera && 
    cameraMode == CMBReader.CAMERA_MODE.ActiveAimer && 
    (connectionState == CMBReader.CONNECTION_STATE.Connected || connectionState == CMBReader.CONNECTION_STATE.Disconnected)) {
    cmb.toggleConnectionAlert(false);
  }

  if (connectionState == CMBReader.CONNECTION_STATE.Connected) {
    configureReaderDevice();
  } else if (connectionState == CMBReader.CONNECTION_STATE.Disconnected && sampleApp.state.leaveAfterDisconnect) {
    leaveScannerScreen();
  }
}

// This is called after scanning has completed, either by detecting a barcode, canceling the scan by using the on-screen button or a hardware trigger button, or if the scanning timed-out
function readResultReceived(readResult) {
  console.log(JSON.stringify(readResult));
  if (sampleApp) {
    sampleApp.setState({
      isScanning: false,
      connected: sampleApp.state.connected,
      device: sampleApp.state.device,
      results: readResult.subReadResults.length > 0 ? readResult.subReadResults : readResult.readResults,
    }
    );
  }
}

// This is called when a sendCommand function completes
function commandCompleted(response) {
  if (response.commandID == 'DEVICE.TYPE') {
    // GET DEVICE.TYPE DMCC COMPLETED
  }

  if (response.commandID == 'DEVICE.FIRMWARE-VER') {
    // GET DEVICE.FIRMWARE-VER DMCC COMPLETED
  }

  console.log(`CMB - CommandCompleted ${JSON.stringify(response)}`);
}

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default class App extends Component<{}> {

  // REACT NATIVE LIFECYCLE
  componentDidMount() {
    sampleApp = this;

    //----------------------------------------------------------------------------
    // When an applicaiton is suspended, the connection to the scanning device needs
    // to be closed; Also, when we are resumed (become active) we
    // have to restore the connection (assuming we had one). This is the observer
    // we will use to do this, using the AppState RCT module.
    //---------------------------------------------------------------------------- 
    applicationStateChangeListener = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active'){
        connectToReaderDevice();
      } else {
        cmb.disconnect();
      }
    }
    );

    if (usePreconfiguredDevice) {
      createReaderDevice();
    } else {
      selectDeviceFromPicker();
    }
    
    if (!listenersNames.includes(CMBReader.EVENT.ReadResultReceived)) {
      listenersNames.push(CMBReader.EVENT.ReadResultReceived);
      listeners.push(
        scannerListener.addListener(
          CMBReader.EVENT.ReadResultReceived,
          (results) => { readResultReceived(results); }
        )
      );
    }
    
    if (!listenersNames.includes(CMBReader.EVENT.CommandCompleted)) {
      listenersNames.push(CMBReader.EVENT.CommandCompleted);
      listeners.push(
        scannerListener.addListener(
          CMBReader.EVENT.CommandCompleted,
          (response) => { commandCompleted(response); }
        )
      );
    }   

    if (!listenersNames.includes(CMBReader.EVENT.AvailabilityChanged)) {
      listenersNames.push(CMBReader.EVENT.AvailabilityChanged);
      listeners.push(
        scannerListener.addListener(
          CMBReader.EVENT.AvailabilityChanged,
          (availability) => { availabilityChanged(availability); }
        )
      );
    }

    if (!listenersNames.includes(CMBReader.EVENT.ConnectionStateChanged)) {
      listenersNames.push(CMBReader.EVENT.ConnectionStateChanged);
      listeners.push(
        scannerListener.addListener(
          CMBReader.EVENT.ConnectionStateChanged,
          (connectionState) => { connectionStateChanged(connectionState); }
        )
      );
    }
  }

  componentWillUnmount() {
    sampleApp = null;

    // Remove the AppState change observer
    applicationStateChangeListener.remove();

    // remove event listeners
    listenersNames = [];
    for (let i = listeners.length - 1; i >= 0; i--) {
      listeners[i].remove();
    }
    listeners = [];
  }

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
    
  render() {
    return (

      <View style={{width: '100%', height: '100%', padding:'5%'}}>
        <Button title={'Select Device'}
          onPress={function() { selectDeviceFromPicker(); }}    
        />

        <Text style = {styles.text}>
          { (this.state.connected ? 'Connected':'Disconnected') + ((this.state.device == CMBReader.DEVICE_TYPE.MXReader) ? ' - MX 1xxx' : ' - Phone Camera') }
        </Text>

        <FlatList
          data={this.state.results}
          renderItem={({ item }) => <Item title={item.goodRead ? `${item.symbologyString  }: ${  item.readString}` : 'NO READ'} />}
          keyExtractor={(item) => this.state.results.indexOf(item).toString()}
        />

        <Button 
          disabled={!this.state.connected}
          title={this.state.connected ? (this.state.isScanning ? 'Stop Scan' : 'Start Scan') : '(NOT CONNECTED)'} 
          onPress={function() { toggleScanner(); }}
        />

      </View>
    );
  } 
}

const styles = StyleSheet.create({
  // flat list
  item: {
    backgroundColor: '#f000',
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  text: {
    textAlign: 'center',
  },
});
