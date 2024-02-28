const constants = {
    SUCCESS: false,
    ERROR: true,
    HTTP_SUCCESS: 200, // Success
    HTTP_NOT_FOUND: 404, // Not Found
    HTTP_BAD_REQUEST: {
        code: 400,
        message: 'Bad Request'
    }, // Bad Request
    HTTP_UNAUTHORIZED: {
        code: 401,
        message: 'Unauthorized'
    },
    HTTP_SERVER_ERROR: 500, // Server Error
    is_debug: 1,
    //"DEBUG_TYPE": "email",
    DEBUG_TYPE: 'database' // email, database/ both
}
let messages = {
    "LOGIN": {
        "SUCCESS": "Login Successfull",
        "FAILURE": "Invalid UserName or Password"
    },
    "SIGNUP": {
        "USEREXIST": "User Already Exist",
        "CREATE": "User Created Successfully",
        "UPDATE": "User Updated Successfully",
        "DELETE": "User Deleted Successfully"
    },
    FIELDS: {
        FIELDEMPTY: 'Not entered all the required fields'
    },
    CHAT: {
        ADDEDSUCCESS: 'Chat added successfully',
        ADDEDFAILURE: 'Some error occured while adding chat',
        FETCHEDSUCCESS: 'Chat fetched successfully',
        FETCHEDFAILURE: 'Some error occured while fetching chat',
        UPDATEDSUCCESS: 'Chat updated successfully',
        UPDATEDFAILURE: 'Some error occured while updating chat',
        DELETEDSUCCESS: 'Chat deleted successfully',
        DELETEDFAILURE: 'Some error occured while deleting chat',
        NOTGROUPCHAT: 'This chat ID is not of a group chat',
        GROUPCHAT: 'This is a group chat, not one-to-one',
        CHATMEMBERSUCCESS: 'This user is member of chat',
        CHATMEMBERFAILURE: 'This user is not the member of chat',
        CHATMEMBERADDFAILURE: 'This user is already art of group',
        CHATMEMBERREMOVEFAILURE: 'Cant remove this user',
        GROUPSMALL: 'Group chat must have atleast 3 members',
        NOTSENDEROFMESSAGE: 'This user is not the sender of the message'
    },
    STATUS: {
        INVALIDSTATUS: "This is invalis status"
    },
    "USER": {
        "NOTFOUND": "No User Found"
    },
    "CANDIDATE": {
        "CREATE": "Candidate Created Successfully",
        "UPDATE": "Candidate Updated Successfully",
        "DELETE": "Candidate Deleted Successfully"
    },
    "CATEGORY": {
        "CREATE": "Category Created Successfully",
        "UPDATE": "Category Updated Successfully",
        "DELETE": "Category Deleted Successfully"
    },
    "CURRICULUM": {
        "CREATE": "Curriculum Created Successfully",
        "UPDATE": "Curriculum Updated Successfully",
        "DELETE": "Curriculum Deleted Successfully"
    },
    "NOTE": {
        "CREATE": "Note Created Successfully",
        "UPDATE": "Note Updated Successfully",
        "DELETE": "Note Deleted Successfully"
    },
    "QUESTION": {
        "CREATE": "Question Created Successfully",
        "UPDATE": "Question Updated Successfully",
        "DELETE": "Question Deleted Successfully"
    },
    "TEST": {
        "CREATE": "Test Created Successfully",
        "UPDATE": "Test Updated Successfully",
        "DELETE": "Test Deleted Successfully"
    },
    "TOPIC": {
        "CREATE": "Topic Created Successfully",
        "UPDATE": "Topic Updated Successfully",
        "DELETE": "Topic Deleted Successfully"
    },
}

let obj = {
    messages: messages,
    constants: constants
}

module.exports = obj;