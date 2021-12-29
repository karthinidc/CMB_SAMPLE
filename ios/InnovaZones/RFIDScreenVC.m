//
//  RFIDScreenVC.m
//  InnovaZones
//
//  Created by PRADEEPKRISH on 28/05/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RFIDScreenVC.h"
#import "UIColorMake.h"
#import "DeviceListCell.h"
#import "AppDelegate.h"
#import "Utility.h"
#import "Constants.h"

@interface RFIDScreenVC (){
  NSMutableArray *arrSerialioDeviceList;
  BOOL isDidSelectRS3ToConnect;
}
@end

@implementation RFIDScreenVC
@synthesize RFIDScannerResponseDelegate;
- (void)viewDidLoad {
  [self customizeControl];

  activityIndicator.hidden = YES;
  activityIndicator.color = [UIColor whiteColor];
  tblDeviceList.tableFooterView = [[UIView alloc]initWithFrame:CGRectZero];
  arrSerialioDeviceList = [NSMutableArray new];
  imgRadioActive.hidden = YES;
  AppDelegate *appDelegate = (AppDelegate *) [[UIApplication sharedApplication] delegate];
//  [appDelegate.sdm connectToLastRecentDevice];
//  [appDelegate.sdm startSearchForBLEDeviceWithTimeout:1000];
  if ([appDelegate.dicConnectedRFIDDeviceInfo count]) {
    imgRadioActive.hidden = NO;
    lblConnectedDeviceName.text = [NSString stringWithFormat:@"%@ (%@)", appDelegate.dicConnectedRFIDDeviceInfo[@"deviceName"] , appDelegate.dicConnectedRFIDDeviceInfo[@"bluetoothAddress"]];
  }
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

/**
 * Customize the UIcontrols background colors and labels corner radius.
 */
- (void)customizeControl {
  vwNavigation.backgroundColor = [UIColorMake ColorFromString:@"686868"];
  vwTop.backgroundColor = [UIColor whiteColor];
  vwDeviceList.backgroundColor = [UIColor whiteColor];
  lblScreenTitle.textColor = [UIColor whiteColor];
  lblConnectedDeviceTitile.textColor = [UIColorMake ColorFromString: @"6d6d72"];
  lblFoundDeviceTitile.textColor = [UIColorMake ColorFromString: @"6d6d72"];
}

- (void)viewDidAppear:(BOOL)animated {
  AppDelegate *appDelegate = (AppDelegate *) [[UIApplication sharedApplication] delegate];
//  appDelegate.sdm = [SerialioDeviceManager defaultManager];
//  appDelegate.sdm.enableAutoReconnecting = YES;
//  [appDelegate.sdm addDelegate:self];
}

#pragma mark -- IBAction
/**
 * Button action for back button.
 */
- (IBAction)btnbackTouched:(id)sender {
  [self dismissViewControllerAnimated:YES completion:nil];
}

/**
 * Button action for search button.
 */
- (IBAction)btnSearchTouched:(id)sender {
  AppDelegate *appDelegate = (AppDelegate *) [[UIApplication sharedApplication] delegate];
  if ([appDelegate.strBluetoothStatus isEqualToString:@"PoweredOn"]) {
    appDelegate.isRFIDSearchButtonTap = true;
    NSString *strConnectedStatus = [[NSUserDefaults standardUserDefaults]  stringForKey:@"serialioDeviceConnect"];
    if (![strConnectedStatus isEqualToString:CONNECTED]) {
//      [appDelegate.sdm showDeviceManager:self fromSender:sender options:SDVCOptionsShowAsPopover];
//      [appDelegate.sdm isSearchingForBLEDevice];
//      [appDelegate.sdm startSearchForBLEDeviceWithTimeout:1000];
//      [appDelegate.sdm startSearchForWiSnapDeviceWithTimeout:1000];
    }else {
//      [appDelegate.sdm startSearchForBLEDeviceWithTimeout:1000];
    }
  } else if ([appDelegate.strBluetoothStatus isEqualToString:@"PoweredOff"]) {
    [Utility showAlert:APPLICATION_TITLE withMessage:BLUETOOTH_TURNED_OFF_MESSAGE withCancelButtonTitle:BUTTON_OK];
  } else if ([appDelegate.strBluetoothStatus isEqualToString:@"Unsupported"]) {
    [Utility showAlert:APPLICATION_TITLE withMessage:BLUETOOTH_NOT_SUPPORTED_MESSAGE withCancelButtonTitle:BUTTON_OK];
  } else {
    [Utility showAlert:APPLICATION_TITLE withMessage:BLUETOOTH_NOT_AUTHORIZED_MESSAGE withCancelButtonTitle:BUTTON_OK];
  }
}

  /**
   * Button action for connected device.
   * Call the dicconnect device events
   */
- (IBAction)btnConnectedDeviceTouched:(id)sender {
  lblConnectedDeviceName.text = @"";
  isDidSelectRS3ToConnect = false;
  imgRadioActive.hidden = YES;
  AppDelegate *appDelegate = (AppDelegate *) [[UIApplication sharedApplication] delegate];
  appDelegate.dicConnectedRFIDDeviceInfo = @{};
//  [appDelegate.sdm disconnectAllDevices];
//  [appDelegate.sdm disconnectAllBLEDevices];
}

#pragma mark -- Table View Delegates
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  tblDeviceList = tableView;
  tblDeviceList.backgroundColor = [UIColor clearColor];
  return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger) section {
  return [arrSerialioDeviceList count];
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
  return 50.0f;
}

- (UITableViewCell *)tableView : (UITableView *)atableView cellForRowAtIndexPath : (NSIndexPath *)indexPath {
  static NSString *cellIdentifier = @"deviceListIdentifier";
  DeviceListCell *deviceListCell = [atableView dequeueReusableCellWithIdentifier : cellIdentifier];
  if (deviceListCell == nil) {
    deviceListCell = [[DeviceListCell alloc]initWithStyle : UITableViewCellStyleDefault reuseIdentifier : cellIdentifier];
  }
  NSDictionary *dicDevice = arrSerialioDeviceList[indexPath.row];
  deviceListCell.lblDeviceName.textColor = [UIColorMake ColorFromString: @"#000000"];
  deviceListCell.lblDeviceName.text = dicDevice[@"modelName"];
  deviceListCell.lblDeviceName.textAlignment = NSTextAlignmentLeft;
  deviceListCell.selectionStyle = UITableViewCellSelectionStyleGray;
  return deviceListCell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  isDidSelectRS3ToConnect = true;
  AppDelegate *appDelegate = (AppDelegate *) [[UIApplication sharedApplication] delegate];
//  [appDelegate.sdm startSearchForBLEDeviceWithTimeout:1000];
//  [appDelegate.sdm setIsConnectingInProgress:YES];
//  [appDelegate.sdm connectedDevices];

}

#pragma mark - Serialio Device Manager Handlers
//
//- (void)onSerialioDeviceManagerDidConnect:(SerialioDevice*)device {
//  NSLog(@"************ DidConnect ************: %@", device.info);
//  AppDelegate *appDelegate = (AppDelegate *) [[UIApplication sharedApplication] delegate];
////     if ([device.info.modelName isEqualToString:@"RS3-D46C"]) {
////       NSString *strBluetoothAddress = (device.info.bluetoothAddress) ? [NSString stringWithFormat:@"(%@)", device.info.bluetoothAddress] : @"" ;
////       if (![strBluetoothAddress isEqualToString:@""]) {
////         lblConnectedDeviceName.text = [NSString stringWithFormat:@"%@ %@", device.info.deviceName,  strBluetoothAddress];
////         imgRadioActive.hidden = NO;
////         [appDelegate.sdm stopSearchForBLEDevice];
////       } else {
//////         [appDelegate.sdm startSearchForBLEDeviceWithTimeout:1000];
//////         [appDelegate.sdm disconnectAllDevices];
//////         [appDelegate.sdm setIsConnectingInProgress:YES];
////         [appDelegate.sdm connectedDevices];
////       }
////
////       for (int i =0; i < arrSerialioDeviceList.count; i++) {
////         NSDictionary *dicElements = arrSerialioDeviceList[i];
////         if (dicElements[@"modelName"] == device.info.modelName) {
////           [arrSerialioDeviceList removeObjectAtIndex:i];
////           [tblDeviceList reloadData];
////         }
////       }
////     }
//}

//- (void)onSerialioDeviceManagerDidFindDevice:(SDDeviceInfo*)deviceInfo {
////  if ([deviceInfo.modelName isEqualToString:@"RS3-D46C"]) {
////    NSMutableDictionary *dicDevice = [NSMutableDictionary new];
////    [dicDevice setObject:deviceInfo.friendlyName forKey:@"deviceName"];
////    [dicDevice setObject:deviceInfo.identifier forKey:@"deviceId"];
////    [dicDevice setObject:deviceInfo.modelName forKey:@"modelName"];
////    [dicDevice setObject:(deviceInfo.bluetoothAddress == nil) ? @"" : deviceInfo.bluetoothAddress forKey:@"bluetoothAddress"];
////
////    AppDelegate *appDelegate = (AppDelegate *) [[UIApplication sharedApplication] delegate];
////    [appDelegate.sdm connectTo:deviceInfo];
////    [appDelegate.sdm stopSearchForBLEDevice];
////    if (![arrSerialioDeviceList containsObject:dicDevice]) {
////      [arrSerialioDeviceList  addObject:dicDevice];
////      [tblDeviceList reloadData];
////    }
////  }
//}

-(void)onSerialioDeviceManagerDidStartSearch {
  if (!isDidSelectRS3ToConnect) {
    activityIndicator.hidden = NO;
    [activityIndicator startAnimating];
  }
}

-(void)onSerialioDeviceManagerDidFinishSearch {
  [NSTimer scheduledTimerWithTimeInterval:15.0 target:self selector:@selector(stopAnimating) userInfo:nil repeats:NO];
}

-(void)stopAnimating{
  activityIndicator.hidden = YES;
  [activityIndicator stopAnimating];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
