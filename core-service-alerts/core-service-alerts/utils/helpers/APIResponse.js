
class APIResponse {
    constructor(message = '', status = false, code = 200, data = null, error = null) {
        if (data) {
            this.data = data
        }
        if (status) {
            this.status = status
        }
        if (message) {
            this.message = message
        }
        if (code) {
            this.code = code
        }
        if (error) {
            this.error = error
        }
    }
}
module.exports = APIResponse