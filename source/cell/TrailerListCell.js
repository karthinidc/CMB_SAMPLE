/*************************************************
 * InnovaZone
 * EquipmentLotCell.js
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
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class TrailerListCell extends Component {
    static propTypes = {
      rowData: PropTypes.string,
      index:PropTypes.number,
      didSelectValue : PropTypes.func,
    };
    static defaultProps = {
    }
    
    constructor(props) {
      super(props);
      this.state = {
     
      };
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
  
    _renderTrailerField(){
      const { rowData, index } = this.props;
      return(
        <View style={{flex:1}}>
       
          <View style={styles.sectionRowDataViewSeparator} />
          {/* Asset# */}
          <TouchableWithoutFeedback style={{flex:1, flexDirection: 'row',borderRadius:10}}
            onPress = {() => this.props.didSelectValue(rowData, index)}
          >
            <View style={[styles.rowContentView, {justifyContent: 'space-around', alignItems: 'flex-start', paddingHorizontal:15}]}>
             
              <Text style={[styles.rowText, {color:'black'}]}>
                {rowData}
              </Text>
            </View>
          </TouchableWithoutFeedback> 
         
         
        </View>
      );
    }
    render(){
      return(
        this._renderTrailerField()
      );
    }
    
}
let styles = StyleSheet.create({
  rowContentView: {
    height: 40,
    alignItems: 'center',
    paddingVertical: 5,
    borderColor: 'lightgray',
    borderBottomWidth: 1,
  },
  rowText: {
    fontSize: (Platform.OS == 'ios') ? 16 : 17,
    fontWeight: '500',
  },
  sectionRowDataViewSeparator: {
    width:Platform.OS=='ios'? deviceWidth/2.69 :deviceWidth/2.690,
    backgroundColor: 'lightgray',
  },
});