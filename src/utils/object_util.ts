export = {
    isEmpty(obj: any) {
        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that property is correct
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;

        // if it ins't an object at this point
        // it is empty, but it can't be anything but empty
        // Is it empty ? Depends on your application
        if (typeof obj !== "object") return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (const key in obj) {
            if (key.hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    },

    removeMask(value: any) {
        if (typeof value === 'undefined') {
            return '';
        }
        if (typeof value !== 'string') {
            return '';
        }
        if (value === '') {
            return '';
        }

        return value.replace(/(\.|\/|\-)/g, "");
    },


    normalize(text: string) {
        if (text == null || text == undefined) {
            return null;
        }
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    },

}

