/*************************************************
 * InnovaZone
 * KnifeSharpeningModalCell.js
 * Created by KARTHI on 21 MAY, 2020
 * Copyright © 2018 InnovaZone. All rights reserved.
 *************************************************/

'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { COLOR } from '../common/Constants';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let screenHeight = Dimensions.get('window').height;


export default class KnifeSharpeningModalCell extends Component {
    static propTypes = {
      rowData: PropTypes.object,
      sectionID: PropTypes.string,
      rowID: PropTypes.string,
      showModal: PropTypes.func,
    };
      static defaultProps = {
      }
      
      constructor(props) {
        super(props);
        this.state = {
       
        };
      } 
      /**
    * Method is called when component is mounted.
    * Get first page data from parent and load gridview
    */
      componentDidMount() {
      }  
  /**
    * Method is called when device orientation is changed.
    * Get device width and height and construct cell size
    */
      onLayout(e) {
        this.setState({ isLayoutChanged: true });
        console.log('changed');
        deviceWidth = Dimensions.get('window').width;
        deviceHeight = Dimensions.get('window').height;
        if (deviceWidth > deviceHeight) {
          let width = (deviceWidth - 60) / 3;
          this.setState({ isLandscape: true, cellWidth: width });
        } else {
          let width = (deviceWidth - 45) / 2;
          this.setState({ isLandscape: false, cellWidth: width });
        }
      } 
      _renderEmpAssetReturn(){
        const { rowData } = this.props;

        return(
          <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
            {/* product_title# */}
            <View style={[styles.rowContentView, { flex: 20, justifyContent: 'space-around', alignItems: 'flex-start', paddingHorizontal: 15 }]}>
              <Text style={styles.rowText}>
                {rowData.product_title}
              </Text>
            </View>
            <View style={styles.sectionRowDataViewSeparator} />
            {/* asset_no */}
            <View style={[styles.rowContentView, { flex: 41.5, justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 5 }]}>
              <Text style={styles.rowText}>
                {rowData.asset_no}
              </Text>
              
            </View>
   
          </View>
        );
      }
     
      render() {
        return(
          this._renderEmpAssetReturn()
        );
      }
}

let styles = StyleSheet.create({
  rowContentView: {
    height: screenHeight / 13.5,
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: 'lightgray',
    borderBottomWidth: 1,
  },
  rowText: {
    fontFamily: 'HelveticaNeue-CondensedBold',
    fontSize: (Platform.OS == 'ios') ? screenHeight / 65 : screenHeight / 75,
    color: COLOR.TEXT_LIGHT_GRAY_COLOR,
    fontWeight: '100',
  },
  sectionRowDataViewSeparator: {
    flex: .2,
    backgroundColor: 'lightgray',
  },
});