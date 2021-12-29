//
//  RFIDScreenVC.h
//  InnovaZones
//
//  Created by PRADEEPKRISH on 28/05/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
//#import <SDM/SDM.h>

@protocol RFIDScannerResponseDelegate <NSObject>
-(void)RFIDScannerResponseSuccess:(NSString *)scannerResponse;
@end

@interface RFIDScreenVC : UIViewController <UITableViewDelegate, UITableViewDataSource>{
  IBOutlet UIView *vwMain;
  IBOutlet UIView *vwNavigation;
  IBOutlet UIView *vwTop;
  IBOutlet UIView *vwDeviceList;
  IBOutlet UIButton *btnBack;
  IBOutlet UIButton *btnSearch;
  IBOutlet UITableView *tblDeviceList;
  IBOutlet UIImageView *imgRadioActive;
  IBOutlet UILabel *lblConnectedDeviceTitile;
  IBOutlet UILabel *lblConnectedDeviceName;
  IBOutlet UILabel *lblFoundDeviceTitile;
  IBOutlet UILabel *lblScreenTitle;
  IBOutlet UIButton *btnConnectedDevice;

  IBOutlet UIActivityIndicatorView *activityIndicator;
}
@property (nonatomic, retain)id <RFIDScannerResponseDelegate> RFIDScannerResponseDelegate;

@end
