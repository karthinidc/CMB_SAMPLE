/*************************************************
 * InnovaZone
 * ToteTransactionReportCell.js
 * Created by KARTHI NALLIYAPPA on JUNE 21, 2020
 * Copyright © 2020 InnovaZone. All rights reserved.
 *************************************************/

import React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ListView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { FONT_FAMILY, COLOR} from '../common/Constants';
import Popover from 'react-native-popover-view';
import ImageLoad from 'react-native-image-placeholder';

 
let deviceHeight = Dimensions.get('window').height;
let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;
let deviceWidth = Dimensions.get('window').width;
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});
  
let arrToteTranscationModal = [];

/**
 * Class for Tote Transaction Report cell.
 * Hide and show componets dynamically based on data
 */
export default class PayrollproductReportCell extends React.Component {
    static propTypes = {
      rowData: PropTypes.object,
      rowID: PropTypes.string,
      selectedLoanerStatus: PropTypes.string,
      isLandscape: PropTypes.bool,
    };

    static defaultProps = {}

    constructor(props) {
      super(props);
      arrToteTranscationModal = [];
      this.state= {
        visibleModalSignature: false,
      };
    }

    componentWillMount() {
    }
 
  /**
   * Method is called when device layout is changed.
   * Generate and set new device width and height values.
   */
    onLayout(e) {
      screenWidth = Dimensions.get('window').width;
      deviceHeight = Dimensions.get('window').height;
      if (screenWidth > deviceHeight) {
        this.setState({ isLandscape: true });
      } else {
        this.setState({ isLandscape: false });
      }
    }
      

  /**
   * hide Modal Signature
   */
    hideModalSignature() {
      this.setState({
        visibleModalSignature: false,
      });
    }
  /**
    * Render profile image if url is not empty
    * @param  {} imageUrl - Profile image URL
    */
    _renderSignatureImage(imageUrl) {
      if (imageUrl) {
        return(
          <Image
            resizeMode="contain"
            source={{uri: imageUrl}}
            style={[styles.profileImageCell, {height: screenHeight/5.53, width:screenHeight/3.53}]}
          />
        );
      } else {
        return(
          <Image
            resizeMode="contain"
            source={require('../images/dummy_sign.png')}
            style={[styles.profileImageCell, {height: screenHeight/5.53, width:screenHeight/3.53}]}
          />
        );
      }
    }
  /**
    * Render profile image if url is not empty
    * @param  {} imageUrl - Profile image URL
    */
    _renderProfileImage(imageUrl) {
      if (imageUrl != '' && imageUrl != null && imageUrl != 'null' && !imageUrl.includes('profile_dummy.png')) {
        return(
          <ImageLoad
            style={[styles.profileImageCell, {height: 95, width: 95}]}
            loadingStyle={{ size: 'large', color: 'white' }}
            source={{ uri: imageUrl }}
            placeholderSource = {require('../images/ProfileDummy.png')}
            placeholderStyle ={[styles.profileImageCell, {height: 95, width: 95}]}
          />
        );
      }
    }

  /**
   * Show price amount of product if native value show in red color
   * @param {*} rowData 
   */
    _renderPrice(rowData){
      if (rowData.product_price < 0) {
        return(
          <View>
            <Text style = {
              [styles.sectionRowText, {
                color: 'red',
              }]
            }
            >
         -$ {
                rowData.product_price.length > 6 ? 
                  Math.abs(rowData.product_price).toExponential(0) : Math.abs(rowData.product_price)
              }
            </Text>
          </View>
        );
      }else{
        return(
          <View>
            <Text style={styles.sectionRowText}>$ {rowData.product_price}</Text>
          </View>
        );
      }
    }

  /**
   * Render the cell.
   */
    render() {
      let item = this.props.rowData;
      let index = this.props.rowID;
      let isSharpened = true;
      if (item.status === 'RETURN' && (item.sharpened_date === '' || item.sharpened_date === null)) {
        isSharpened = false;
      }
      return (
        <TouchableOpacity>
          <View>
            <View style={styles.listRowContainer}>
              {/* Empolyee */}
              <View style={[styles.sectionRowView, { width: 125}]}>
                {this._renderProfileImage(item.employee_img_url)}
              </View>
              <View style={styles.sectionRowViewSeparator} />
              {/* Empolyee & Product details */}
              <View style={[styles.sectionRowView, { flex:930, alignItems: 'flex-start',paddingHorizontal:10 }]}>
                <Text style={styles.sectionRowText}>{item.employee_name}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text style={[styles.sectionRowText, { fontWeight: '800'}]}>Product: </Text>
                  </View>
                  <View>            
                    <Text style={[styles.sectionRowText]}>{item.product_title}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.sectionRowText, { fontWeight: '800'}]}>Price:</Text>
                  {this._renderPrice(item)}
                </View>
              </View>
              <View style={styles.sectionRowViewSeparator} />
              {/* QTY */}
              <View style={[styles.sectionRowView, { flex: 144 }]}>
                <Text style={styles.sectionRowText}>{item.product_quantity}</Text>
              </View>
              <View style={styles.sectionRowViewSeparator} />
              {/* Confirm */}
              <View style = {[styles.rowContentView, {width: (Platform.OS == 'ios') ?  95 : 115, top:15}]}
                ref={(ref) => this.touchable = ref}
              >
                <TouchableOpacity
                  style={{alignItems:'center', justifyContent:'center' }}
                  onPress={() => {
                    this.setState({visibleModalSignature : true});
                  }}
                >
                  <Image
                    style={{ width: deviceWidth / 35.35, height: deviceWidth / 35.35, resizeMode: 'contain' }}
                    source={require('../images/file.png')}
                  />
                </TouchableOpacity>

                <Popover
                  popoverStyle = {{borderRadius:5, position: 'absolute',
                    shadowColor:'black',elevation:Platform.OS === 'ios' ? 0 :2,
                    borderColor: 'gray', borderWidth:0.7,
                    shadowOffset: {width: 5, height: 2},
                    shadowRadius: 4,
                    shadowOpacity: 0.8}}
                  Mode = {'js-modal'}
                  isVisible={this.state.visibleModalSignature}
                  fromView={this.touchable}
                  onClose={() => this.setState({visibleModalSignature : false})}
                  placement =  {Popover.PLACEMENT_OPTIONS.LEFT}
                  showBackground = {true}
                >
              
                  <View style={{width:screenWidth/2, marginVertical:10}}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.sectionHeaderText, {marginLeft:10}]}>Comment : </Text>
                      <ScrollView style={{ margin : 5, height:100 }}>
                        <Text style={styles.sectionHeaderText}>{item.chargeable_comment}</Text>
                      </ScrollView>
                    </View>
                    <View style={{ backgroundColor: 'lightgray', height: 2 }} />
                    <View style={{ flex: 1, marginVertical: 10 }}>
                      <Text style={[styles.sectionHeaderText, {marginLeft:10}]}>Signature :  </Text>
                      <View style={{ flex: 1, padding: 10 }}>
                        {this._renderSignatureImage(item.chargeable_signature)}
                      </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.hideModalSignature();
                        }}
                      >
                        <Image
                          style={{ width: deviceWidth / 20.35, height: deviceWidth / 20.35, resizeMode: 'contain' }}
                          source={require('../images/closeRoundBackgrounded.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                         
                </Popover>
              </View> 
            </View>
          </View>
        </TouchableOpacity>
      );
    }
}
 
const styles = StyleSheet.create({
  rowContentView: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderColor: 'lightgray',
    //borderBottomWidth: 1,
  },
  rowText: {
    fontFamily: 'HelveticaNeue-CondensedBold',
    fontSize: (Platform.OS == 'ios') ? 19 : 18,
    color: COLOR.TEXT_LIGHT_GRAY_COLOR,
    fontWeight: '100',
  },
  sectionRowDataViewSeparator: {
    width: 2,
    backgroundColor: 'lightgray',
  },
  modalBtnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  modalBtnTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    backgroundColor: COLOR.THEME,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  modalBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.HELVETICA_CONDENSEDBOLD,
  },
  modalListRowView:{
    alignItems:'center', 
    paddingVertical:10,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  modalListRowText: {
    fontSize: screenHeight / 55,
    fontWeight: '500',
    fontFamily: 'HelveticaNeue-CondensedBold',
  },
  sectionRowText: {
    fontFamily: 'HelveticaNeue-CondensedBold',
    fontSize: (Platform.OS == 'ios') ?  16 : 17 ,
    color: COLOR.TEXT_LIGHT_GRAY_COLOR,
  },
  sectionRowViewSeparator: {
    flex:2, 
    backgroundColor:'lightgray',
  },
  profileImageCell:{
    height: screenHeight/11.38, 
    width: screenHeight/11.38,
  },
  sectionHeaderText: {
    fontSize: (Platform.OS == 'ios') ?  18 : 19,
    fontWeight: '500',
    fontFamily: 'HelveticaNeue-CondensedBold',
    color: COLOR.BLACK,
    marginLeft:10,
  },

  listRowContainer:{
    flexDirection:'row',
    borderColor:'lightgray',
    borderTopWidth:1,
    borderBottomWidth:1,
    flex: 1,     
  },
  sectionRowView: {
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'space-around',
  },
});
 
 