/*************************************************
 * InnovaZone
 * EmployeeAssetReturnReportCell.js
 * Created by Vijayalakshmi on 01/10/2019
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

export default class EmployeeAssetReturnReportCell extends Component {
    static propTypes = {
      rowData: PropTypes.object,
      sectionID: PropTypes.string,
      rowID: PropTypes.string,
      showModal: PropTypes.func,
      _returnWebservice: PropTypes.func,
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
        <TouchableOpacity>
          <View style={{ flex: 2, flexDirection: 'row', backgroundColor: 'white',paddingVertical:2}}>
            {/* Asset# */}
            <View style={[styles.rowContentView, { flex: (Platform.OS == 'ios') ? 110 : 120, justifyContent: 'space-around', alignItems: 'flex-start', paddingHorizontal: 25 }]}>
              <Text style={styles.rowText}>
                {rowData.employee_name}
              </Text>
              <Text style={[styles.rowText, { color: 'darkgray' }]}>
                {rowData.employee_username}
              </Text>
            </View>
            <View style={styles.sectionRowDataViewSeparator} />
            {/* Product Name */}
            <TouchableOpacity onPress={() => { this.props._returnWebservice(rowData.employee_username); }}
              style={[styles.rowContentView, { flex: 314, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }]}
            >
              <Text style={[styles.rowText,{color:COLOR.THEME}]}>
                {rowData.returned_qty}
              </Text>
            </TouchableOpacity>
        
          </View>
        </TouchableOpacity>

      );
    }
    render(){
      return(
        this._renderEmpAssetReturn()
      );
    }
    
}
let styles = StyleSheet.create({
  rowContentView: {
    height: screenHeight / 12,
    alignItems: 'center',
    paddingVertical: 5,
    borderColor: 'lightgray',
    borderBottomWidth: 1,
  },
  rowText: {
    fontFamily: 'HelveticaNeue-CondensedBold',
    fontSize: (Platform.OS == 'ios') ? 18 : screenHeight / 75,
    color: COLOR.TEXT_LIGHT_GRAY_COLOR,
    fontWeight: '100',
  },
  sectionRowDataViewSeparator: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
});