function successOrErrors(key) {

    /**
     *EORROR PARAMETER
     */
    var parameters = {
        "noParams": "",
        "page": "page",
        "registerRequire": "loginType, latitude, timeZone, longitude",
        "email": "email",
        "googleId": "googleId",
        "facebookId": "facebookId",
        "appleId": "appleId",
        "username": "username",
        "password": "password",
        "confirmPassword": "password, confirmPassword",
        "date": "dateOfBirth",
        "userId": "userId",
        "phone": "phone",
        "newPassword": "newPassword",
        "currentPassword": "currentPassword",
        "loginType0Require": "(email / phone, countryCode ), password, confirmPassword, ",
        "deviceRequire": " deviceType, deviceToken, deviceId  ",
        "confirmPassword": "confirmPassword",
        "loginType": "loginType",
        "loginRequire": "loginType, deviceType, deviceToken, deviceId, timeZone",
        "loginType0Login": "phone, countryCode / email, password",
        "loginType0": "phone / email",
        "countryCode": "countryCode",
        "deviceType": "deviceType",
        "firstName": "firstName",
        "lastName": "lastName",
        "profile": "profile",
        "latitude": "latitude",
        "longitude": "longitude",
        "requireRegisterAdmin": "email, password, confirmPassword",
        "adminId": "adminId",
        "login": "email, password",
        "title": "title",
        "message": "message",
        "sendToAll": "sendToAll",
        "amount": "amount",
        "currency": "currency",
        "paymentId": "paymentId",
        "StripeInvalidRequestError": "StripeInvalidRequestError",
        "timeZone": "timeZone",
        "post": "post",
        "hashTag": "hashTag",
        "feedsId": "feedsId",
        "commentRequireField": "comment, userId, feedId",
        "feedId": "feedId",
        "likeRequire": "usersId, feedsId",
        "usersId": "usersId",
        "feedsId": "feedsId",
        "likeId": "likeId",
        "commentId": "commentId",
        "uniqueLike": "usersId, feedsId",
        "stories": "stories",
        "mentionUser": "mention",
        "storiesRequire": "stories, userId",
        "storiesId": "storiesId",
        "adminLoginRequire": "email, password"
    }

    /**
     * SUCCESS MESSAGE
     */
    var successMessages = {
        "login": "Login Successfully",
        "register": "Registration Successfully",
        "update": "Updated Successfully",
        "delete": "Deleted Successfully",
        "get": "Fetched Single Successfully",
        "getall": "Get All Successful",
        "logout": "Logout Successful",
        "unblock": "User has been Unblocked Successfully",
        "block": "User has been Blocked Sccessfully",
        "forgotPassword": "You will receive email regarding resetting your password, if you are registered with us.",
        "send": "Send Notification Successfully",
        "createPayment": "Payment has been created successfully",
        "confirmPayment": "Payment has been confirmed successfully",
        "cancelPayment": "Payment has been canceled successfully",
        "getbyuserid": "Get by user id",
        "noNotificationFound": "No notification found",
        "commentedSuccessFully": "Comment created successfully",
        "deleteSuccessFully": "delete successfully",
        "added": "Addedd successfully"
    }

    /**
     * ERROR OBJECT
     */
    var obj = {
        "successMessage": successMessages,
        "ex_00": {
            code: "ex_00",
            failMsg: "Exception",
            message: "exception",
            parameters: parameters,
            location: "params"
        },
        "err_00": {
            code: "err_00",
            failMsg: "NotFound",
            message: "users list not found",
            parameters: parameters,
            location: "params"
        },
        "err_02": {
            code: "err_02",
            failMsg: "InvalidDetails",
            message: "Please enter required details",
            parameters: parameters,
            location: "body"
        },
        "err_03": {
            code: "err_03",
            failMsg: "InvalidEmail",
            message: "Please enter valid email",
            parameters: parameters,
            location: "body"
        },
        "err_04": {
            code: "err_04",
            failMsg: "AlreadyExits",
            message: "email address already exits",
            parameters: parameters,
            location: "body"
        },
        "err_05": {
            code: "err_05",
            failMsg: "GoogleIdAlreadyExits",
            message: "google id already exits",
            parameters: parameters,
            location: "body"
        },
        "err_06": {
            code: "err_06",
            failMsg: "InvalidGoogleId",
            message: "Please enter valid google id",
            parameters: parameters,
            location: "body"
        },
        "err_07": {
            code: "err_07",
            failMsg: "facebookIdAlreadyExits",
            message: "facebookid already exits",
            parameters: parameters,
            location: "body"
        },
        "err_08": {
            code: "err_08",
            failMsg: "InvalidFacebookId",
            message: "Please enter valid facebook id",
            parameters: parameters,
            location: "body"
        },
        "err_09": {
            code: "err_09",
            failMsg: "AppleIdAlreadyExits",
            message: "appleId already exits",
            parameters: parameters,
            location: "body"
        },
        "err_10": {
            code: "err_10",
            failMsg: "InvalidAppleId",
            message: "Please enter valid apple id",
            parameters: parameters,
            location: "body"
        },
        "err_28": {
            code: "err_28",
            failMsg: "UsernameAlreadyExits",
            message: "username already exits",
            parameters: parameters,
            location: "body"
        },
        "err_12": {
            code: "err_12",
            failMsg: "InvalidPassword",
            message: "Password should be 8 characters long, including at least one upper case, at least one lower case, at least one special character and at least one digit",
            parameters: parameters,
            location: "body"
        },
        "err_13": {
            code: "err_13",
            failMsg: "NotMatch",
            message: "NewPassword and ConfirmPssword doesn't match",
            parameters: parameters,
            location: "body"
        },
        "err_14": {
            code: "err_14",
            failMsg: "InvalidPhoneNumber",
            message: "Please enter valid phone number",
            parameters: parameters,
            location: "body"
        },
        "err_15": {
            code: "err_15",
            failMsg: "DateNotValid",
            message: "Invalid date format, Please use yyyy-mm-dd format",
            parameters: parameters,
            location: "body"
        },
        "err_16": {
            code: "err_16",
            failMsg: "NotRegister",
            message: "Something went wrong while registering device",
            parameters: parameters,
            location: "body"
        },
        "err_18": {
            code: "err_18",
            failMsg: "ErrorWhileDeleteUser",
            message: "Something went wrong while deleting user",
            parameters: parameters,
            location: "body"
        },
        "err_19": {
            code: "err_19",
            failMsg: "UserNotFound",
            message: "User details not found",
            parameters: parameters,
            location: "params"
        },
        "err_20": {
            code: "err_20",
            failMsg: "IncorrectDetails",
            message: "Incorrect login credentials",
            parameters: parameters,
            location: "body"
        },
        "err_21": {
            code: "err_21",
            failMsg: "InvalidDetails",
            message: "Please enter valid phone number / email ",
            parameters: parameters,
            location: "body"
        },
        "err_22": {
            code: "err_22",
            failMsg: "IncorrectDetails",
            message: "Incorrect google id, Please enter registered google id",
            parameters: parameters,
            location: "body"
        },
        "err_23": {
            code: "err_23",
            failMsg: "InvalidDetails",
            message: "Please enter registered googleId",
            parameters: parameters,
            location: "body"
        },
        "err_24": {
            code: "err_24",
            failMsg: "IncorrectDetails",
            message: "Incorrect facebook id, Please enter registered facebook id",
            parameters: parameters,
            location: "body"
        },
        "err_25": {
            code: "err_25",
            failMsg: "IncorrectDetails",
            message: "Incorrect apple id, Please enter registered apple id",
            parameters: parameters,
            location: "body"
        },
        "err_26": {
            code: "err_26",
            failMsg: "IncorrectDetails",
            message: "Incorrect login credentials phone number",
            parameters: parameters,
            location: "body"
        },
        "err_27": {
            code: "err_27",
            failMsg: "NotValid",
            message: "Please enter valid login details",
            parameters: parameters,
            location: "body"
        },
        "err_28": {
            code: "err_28",
            failMsg: "AlreadyExits",
            message: "username already exists",
            parameters: parameters,
            location: "body"
        },
        "err_29": {
            code: "err_29",
            failMsg: "SomethingWrong",
            message: "Something went wrong while update",
            parameters: parameters,
            location: "body"
        },
        "err_30": {
            code: "err_30",
            failMsg: "SomethingWrong",
            message: "Something went wrong while find by id",
            parameters: parameters,
            location: "params"
        },
        "err_32": {
            code: "err_32",
            failMsg: "invalidUserId",
            message: "Please enter valid user id",
            parameters: parameters,
            location: "params"
        },
        "err_33": {
            code: "err_33",
            failMsg: "NotMatch",
            message: "Current password doesn't match",
            parameters: parameters,
            location: "body"
        },
        "err_34": {
            code: "err_34",
            failMsg: "InvalidDetails",
            message: "Please enter new password",
            parameters: parameters,
            location: "body"
        },
        "err_35": {
            code: "err_35",
            failMsg: "InvalidDetails",
            message: "Please enter required field",
            parameters: parameters,
            location: "body"
        },
        "err_36": {
            code: "err_36",
            failMsg: "InvalidDetails",
            message: "Please enter device required  details",
            parameters: parameters,
            location: "body"
        },
        "err_37": {
            code: "err_37",
            failMsg: "InvalidDetails",
            message: "Please enter confirm new password",
            parameters: parameters,
            location: "body"
        },
        "err_38": {
            code: "err_38",
            failMsg: "InvalidDetails",
            message: "Invalid login type, only avaliable 0, 1, 2 and 3",
            parameters: parameters,
            location: "body"
        },
        "err_40": {
            code: "err_40",
            failMsg: "InvalidDetails",
            message: "Please enter valid country code",
            parameters: parameters,
            location: "body"
        },
        "err_41": {
            code: "err_41",
            failMsg: "InvalidDetails",
            message: "Phone number already exits",
            parameters: parameters,
            location: "body"
        },
        "err_42": {
            code: "err_42",
            failMsg: "InvalidDetails",
            message: "Invalid device type, Allow( 'A'/'I')",
            parameters: parameters,
            location: "body"
        },
        "err_43": {
            code: "err_43",
            failMsg: "InvalidDetails",
            message: "Invalid first name, allowed only letters, space, _, ', (), dot and comma",
            parameters: parameters,
            location: "body"
        },
        "err_44": {
            code: "err_44",
            failMsg: "InvalidDetails",
            message: "Invalid last name, allowed only letters, space, _, ', (), dot and comma",
            parameters: parameters,
            location: "body"
        },
        "err_45": {
            code: "err_45",
            failMsg: "InvalidDetails",
            message: "You must be at least 18 years old!",
            parameters: parameters,
            location: "body"
        },
        "err_46": {
            code: "err_46",
            failMsg: "InvalidDetails",
            message: "Profile image must have size of less than 5 mb",
            parameters: parameters,
            location: "body"
        },
        "err_47": {
            code: "err_47",
            failMsg: "InvalidDetails",
            message: "Invalid latitude / longitude",
            parameters: parameters,
            location: "body"
        },
        "err_48": {
            code: "err_48",
            failMsg: "InvalidDetails",
            message: "Invalid username, allowed only letters,  space, _, ', (), dot and comma",
            parameters: parameters,
            location: "body"
        },
        "err_49": {
            code: "err_49",
            failMsg: "IncorrectDetails",
            message: "Incorrect password, Please try again",
            parameters: parameters,
            location: "body"
        },
        "err_50": {
            code: "err_50",
            failMsg: "InvalidDetails",
            message: "Please enter registered facebook id",
            parameters: parameters,
            location: "body"
        },
        "err_51": {
            code: "err_51",
            failMsg: "InvalidDetails",
            message: "Please enter registered apple id",
            parameters: parameters,
            location: "body"
        },
        "err_52": {
            code: "err_52",
            failMsg: "InvalidDetails",
            message: "Please enter valid latitude",
            parameters: parameters,
            location: "body"
        },
        "err_53": {
            code: "err_53",
            failMsg: "InvalidDetails",
            message: "Please enter valid longitude",
            parameters: parameters,
            location: "body"
        },
        "err_54": {
            code: "err_54",
            failMsg: "InvalidDetails",
            message: "Please enter valid date of birth(yyyy-mm-dd)",
            parameters: parameters,
            location: "body"
        },
        "err_55": {
            code: "err_55",
            failMsg: "InvalidDetails",
            message: "Please enter email",
            parameters: parameters,
            location: "body"
        },
        "err_56": {
            code: "err_56",
            failMsg: "NotRegistered",
            message: "Something went wrong while registering admin",
            parameters: parameters,
            location: "body"
        },
        "err_57": {
            code: "err_57",
            failMsg: "InvalidDetails",
            message: "Please enter valid admin id",
            parameters: parameters,
            location: "body"
        },
        "err_59": {
            code: "err_59",
            failMsg: "Missing",
            message: "Please enter password",
            parameters: parameters,
            location: "body"
        },
        "err_60": {
            code: "err_60",
            failMsg: "Missing",
            message: "Please enter lastName",
            parameters: parameters,
            location: "body"
        },
        "err_61": {
            code: "err_61",
            failMsg: "Missing",
            message: "Please enter firstName",
            parameters: parameters,
            location: "body"
        },
        "err_62": {
            code: "err_62",
            failMsg: "Missing",
            message: "Please enter missing details",
            parameters: parameters,
            location: "body"
        },
        "err_63": {
            code: "err_63",
            failMsg: "NotFound",
            message: "Notification details not found",
            parameters: parameters,
            location: "body"
        },
        "err_64": {
            code: "err_64",
            failMsg: "NotFound",
            message: "Notification details not found",
            parameters: parameters,
            location: "params"
        },
        "err_65": {
            code: "err_65",
            failMsg: "Missing",
            message: "Please enter amount",
            parameters: parameters,
            location: "body"
        },
        "err_66": {
            code: "err_66",
            failMsg: "Missing",
            message: "Please enter currency",
            parameters: parameters,
            location: "body"
        },
        "err_67": {
            code: "err_67",
            failMsg: "Invalid",
            message: "Invalid payment id",
            parameters: parameters,
            location: "body"
        },
        "err_68": {
            code: "err_68",
            failMsg: "Invalid",
            message: "Please enter valid currency",
            parameters: parameters,
            location: "body"
        },
        "err_69": {
            code: "err_69",
            failMsg: "Invalid",
            message: "You cannot cancel this PaymentIntent because it has a status of canceled",
            parameters: parameters,
            location: "body"
        },
        "err_70": {
            code: "err_70",
            failMsg: "Invalid",
            message: "User id may not be empty",
            parameters: parameters,
            location: "body"
        },
        "err_71": {
            code: "err_71",
            failMsg: "Invalid",
            message: "sendToAll must have type boolean",
            parameters: parameters,
            location: "body"
        },
        "err_72": {
            code: "err_72",
            failMsg: "SomeThingWrong",
            message: "Something went wrong while updating profile picture",
            parameters: parameters,
            location: "body"
        },
        "err_73": {
            code: "err_73",
            failMsg: "Invalid",
            message: "Please enter valid profile picture",
            parameters: parameters,
            location: "body"
        },
        "err_74": {
            code: "err_74",
            failMsg: "InvalidDetails",
            message: "Post must have size of less than 5 mb",
            parameters: parameters,
            location: "body"
        },
        "err_75": {
            code: "err_75",
            failMsg: "SomeThingWrong",
            message: "Something went wrong while uploading post",
            parameters: parameters,
            location: "body"
        },
        "err_76": {
            code: "err_76",
            failMsg: "NotFound",
            message: "Feeds details not found",
            parameters: parameters,
            location: "params"
        },
        "err_77": {
            code: "err_77",
            failMsg: "SomeThingWrong",
            message: "Something went wrong while deleting dependencies",
            parameters: parameters,
            location: "body"
        },
        "err_78": {
            code: "err_78",
            failMsg: "SomeThingWrong",
            message: "Something went wrong while create comment",
            parameters: parameters,
            location: "body"
        },
        "err_79": {
            code: "err_79",
            failMsg: "SomeThingWrong",
            message: "Something went wrong while remove feed",
            parameters: parameters,
            location: "body"
        },
        "err_80": {
            code: "err_80",
            failMsg: "SomeThingWrong",
            message: "Something went wrong while add like",
            parameters: parameters,
            location: "body"
        },
        "err_81": {
            code: "err_81",
            failMsg: "NotFound",
            message: "Like details not found",
            parameters: parameters,
            location: "body"
        },
        "err_82": {
            code: "err_82",
            failMsg: "NotFound",
            message: "Comment details not found",
            parameters: parameters,
            location: "params"
        },
        "err_83": {
            code: "err_83",
            failMsg: "SomeThingWrong",
            message: "Some thing went wrong while remove comments",
            parameters: parameters,
            location: "params"
        },
        "err_84": {
            code: "err_84",
            failMsg: "AlreadyExits",
            message: "User alredy like",
            parameters: parameters,
            location: "params"
        },
        "err_85": {
            code: "err_85",
            failMsg: "InvalidDetails",
            message: "Stories must have size of less than 5 mb",
            parameters: parameters,
            location: "body"
        },
        "err_86": {
            code: "err_86",
            failMsg: "Invalid",
            message: "Please enter valid stories",
            parameters: parameters,
            location: "body"
        },
        "err_87": {
            code: "err_87",
            failMsg: "SomethingWrong",
            message: "Something went wrong while create stories",
            parameters: parameters,
            location: "body"
        },
        "err_88": {
            code: "err_88",
            failMsg: "NotFound",
            message: "Stories details not found",
            parameters: parameters,
            location: "body"
        },
        "err_89": {
            code: "err_88",
            failMsg: "NotFound",
            message: "Stories details not found",
            parameters: parameters,
            location: "body"
        },
    }
    return obj[key]
}

module.exports = {
    successOrErrors
}