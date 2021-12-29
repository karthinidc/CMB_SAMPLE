package com.InnovaZones.RNARTreeQAIZHips;

import com.InnovaZones.RNARTreeQAIZHips.nativemodules.RFIDModule;
import com.InnovaZones.RNARTreeQAIZHips.nativemodules.SocketScannerModule;
import com.InnovaZones.RNARTreeQAIZHips.nativemodules.UHFRFIDModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * React native custom module register.
 *
 * @author  Jagadish Sellamuthu
 * @since   2016-11-30
 */

public class CustomReactPackage implements ReactPackage {
    public static UHFRFIDModule mUHFRFIDModule;
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        mUHFRFIDModule = new UHFRFIDModule(reactContext);
        modules.add(mUHFRFIDModule);
        modules.add(new RFIDModule(reactContext));
        modules.add(new SocketScannerModule(reactContext));
        return modules;
    }
}
