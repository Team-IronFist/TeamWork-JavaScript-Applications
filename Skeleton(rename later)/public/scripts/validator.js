let validator = {
    isBasicType(value, type) {
        return (typeof value === type)
    },
    isEmptyString(value) {
        return value === '';
    }
}