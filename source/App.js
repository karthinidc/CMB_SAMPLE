/*************************************************
 * InnovaZone
 * App.js
 * Created by Jagadisg Sellamuthu on 13/02/2018
 * Copyright © 2018 InnovaZone. All rights reserved.
 *************************************************/

'use strict';

import {
  AppRegistry,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import BackboneEvents from 'backbone-events-standalone';
import codePush from 'react-native-code-push';

import ClerkLoginScreen from './screens/ClerkLoginScreen';
import CMBScanner from './screens/CMBScanner';
import CognexScanner from './utils/components/CognexScanner';

// global event bus   
window.EventBus = BackboneEvents.mixin({});
const App = StackNavigator({
  CMBScanner : {screen : CMBScanner},
  ClerkLoginScreen: { screen: ClerkLoginScreen },
  // CognexScanner: {screen: CognexScanner},

}, {initialRouteName: 'ClerkLoginScreen', mode: 'card', headerMode: 'none', navigationOptions: {gesturesEnabled: false}});

AppRegistry.registerComponent('InnovaZones', () => codePush(App));

