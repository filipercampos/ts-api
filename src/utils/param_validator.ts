import _ from 'lodash';

export = {
    /**
   * Get simple value from objet or .value
   * Check object is null or undefined
   * @param {Object to be verified} o 
   */
    toParamValue(o: any, defaultValue: any = undefined) {

        //TODO Test
        if (_.isNil(o)) {
            return this._validateValue(defaultValue);
        }
        //variables body
        else if (_.isNil(o.path)) {
            if (o == 'null') {
                return null;
            }
            return o;
        }
        else if (_.isNil(o.value)) {
            return this._validateValue(defaultValue);
        }
        //variables get
        else {
            if (o.value === 'null') {
                return null;
            }
            return o.value;
        }
    },

    _validateValue(value: any) {
        if (!_.isNil(value)) {
            return value;
        }
        return null;
    }

}

