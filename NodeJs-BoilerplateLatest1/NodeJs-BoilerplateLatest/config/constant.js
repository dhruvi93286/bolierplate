/**
 * COUNTRY CODE REGEX 
 */
var kCountryCodeRegex = /^(\d{1}\-)?(\d{1,2})$/

/**
 * EMAIL REGEX
 */
var kEmailRegex = /\S+@\S[a-z]+\.\S+/;

/**
 * PHONE NUMBER REGEX
 */
var kPhoneRegex = /^(0|[1-9]\d*)$/

/**
 * DATE REGEX
 */
var kDateRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/

/**
 * PASSWORD REGEX
 */
var kPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,200}$/

/**
 * FIRST NAME, LAST NAME, USERNAME REGEX
 */
var kFirstNameRegex = /(?=.*[A-Za-z])(?!^\d+$)^.+$/

/**
 * LATITUDE AND LONGITUDE REGEX
 */
var kLatLongitude = /^[-|+]?[0-9]{0,3}(.[0-9]{0,7})?$/

/**
 * IF MULTIPLE LOGIN TRUE -> SAME EMAIL IS ALLOW FOR DIFFERENT LOGIN TYPE
 *  */
var kmultipleLogin = true

module.exports = {
    kCountryCodeRegex,
    kEmailRegex,
    kPhoneRegex,
    kDateRegex,
    kPasswordRegex,
    kFirstNameRegex,
    kLatLongitude,
    kmultipleLogin
}