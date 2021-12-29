/*************************************************
  * InnovaZone
  * Utility.js
  * Created by Selvin Thamodharan on 13/06/2019
  * Copyright © 2018 InnovaZone. All rights reserved.
  *************************************************/

import dateFormat from 'dateformat';
import uuid from 'uuid/v4';
import { ZONE_SELECTION } from '../common/AppSession';  
import { getValueFromConfigurationLabelData } from '../common/AppConfig';
import { CONFIGURATIONKEY, DATE_FORMAT } from '../common/Constants';
/**
* Has default product quantity used methods
*/

export default class ProductQuantity {

  static getDefault1QtyProduct(objProduct) {
    const currentDate = dateFormat(new Date(), DATE_FORMAT.DATE_FORMAT_yyyyMMdd_HHmmss, true);
    const uuidStr = uuid();

    const costCenterVisible  =  getValueFromConfigurationLabelData(CONFIGURATIONKEY.COST_CENTER_VISIBILITY);
    const workOrder  =  getValueFromConfigurationLabelData(CONFIGURATIONKEY.WORK_ORDER_MANDATORY);
    const costCenter  =  getValueFromConfigurationLabelData(CONFIGURATIONKEY.COST_CENTER_MANDATORY);
    const assetNumber  =  getValueFromConfigurationLabelData(CONFIGURATIONKEY.ASSET_NUMBER_MANDATORY);

    let  tempOrderItems = {
      'order_item_id': uuidStr,
      'order_id' : '',
      'product_id': objProduct.product_id,
      'product_title': objProduct.product_title,
      'product_description': objProduct.description,
      'product_quantity': 1,
      'product_price': objProduct.product_price,
      'actual_price': objProduct.product_price,
      'model_no': objProduct.model_no,
      'product_conversion': objProduct.product_conversion,
      'prm_no': objProduct.prm_no,
      'sub_no': objProduct.sub_no,
      'product_image': objProduct.product_image,
      'attribute_display': '', 
      'attributes': '', 
      'asset_no': objProduct.asset_no != null ? objProduct.asset_no : '', // AssetNo is missing from product list 
      'is_measurement': objProduct.is_measurement,
      'measurement': objProduct.measurement,
      'is_labour_cost': objProduct.is_laborcost,
      'is_non_returnable': objProduct.is_non_returnable,
      'is_completed': objProduct.is_non_returnable,
      'status': objProduct.status,
      'created_at': currentDate,
      'updated_at':currentDate,
      'is_export': 0,
      'json_tempData': '',
      'zone': ZONE_SELECTION.ROOT_ZONE_SLUG,
      'root_category_id':  ZONE_SELECTION.ROOT_ZONE_ID, 

      'bin_location': objProduct.bin_location,
      'hazard_items': objProduct.hazard_items,

      'chargeable_comment' : '',
      'chargeable_signature' : '',
      'chargeable_signature_base64' : '',
      'confirm_signature' : '',
      'confirm_signature_base64' : '',
      'cost_center' : costCenterVisible,
      'deleted_at' : '',
      'dz_answer_list' : '',
      'fm_approve_comment' : '',
      'fm_approve_flag' : false,
      'invoice_image' : '',
      'invoice_image_list' : '',
      'is_asset_novalid' : assetNumber,
      'is_chargeable' : false,
      'is_cost_center_valid' : costCenter,
      'is_driver_zone_valid' : false,
      'is_return_override' : false,
      'is_selected' : false,
      'is_tracked' : false,
      'is_unlimited' : 1,
      'is_validated' : false,
      'is_workorder_mandatory_valid' : workOrder,
      'is_workorder_valid' : workOrder,
      'kit_id' : '',
      'product_dep_attrId' : '',
      'selected_equipment_data' : '',
      'shorten_URL' : '',
      'supervisorId' : '',
      'transaction_type' : 'CART_CHECKOUT',
      'work_order_no' : '',
      'product_total_display_price' : objProduct.product_price,
    };
    return tempOrderItems;
  }
}
