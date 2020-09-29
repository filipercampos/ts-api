
/**
 * 
 * @author Filipe Campos
 * @description 
 * 
 * Usage:
 *  EnumUtils.getEnumKeys(NumberValueEnum, EnumType.Number);
 *  EnumUtils.getEnumValues(NumberValueEnum, EnumType.Number);
 *  
 *  EnumUtils.getEnumKeys(StringValueEnum, EnumType.String);
 *  EnumUtils.getEnumValues(StringValueEnum, EnumType.String);
 */

 export class EnumUtils {
  /**
   * Returns the enum keys
   * @param enumObj enum object
   * @param enumType the enum type
   */
  static getEnumKeys(enumObj: any, enumType: EnumType): any[] {
    return EnumUtils.getEnumValues(enumObj, enumType).map(value => enumObj[value]);
  }

  /**
   * Check enum value
   * @param enumObj enum object
   * @param enumValue enum value
   */
  static checkEnum(enumObj: any, enumValue: any) : any {

    let value = enumObj[enumValue];
    
    if (value) {
      return value;
    }
    return null;
  }

  /**
   * Returns the enum values
   * @param enumObj enum object
   * @param enumType the enum type
   */
  static getEnumValues(enumObj: any, enumType: EnumType): any[] {
    return Object.keys(enumObj).filter(key => typeof enumObj[key] === enumType);
  }
}

export enum EnumType {
  Number = 'number',
  String = 'string',
  Object = 'object'
}