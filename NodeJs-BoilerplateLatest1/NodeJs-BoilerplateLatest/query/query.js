var responseServices = require('../services/responseService')

/**
 * TO GET ERROR DETAILS
 * @param {STRING} key 
 * @returns STRING
 */
async function error(key) {
    var data = await responseServices.successOrErrors(key)
    return data
}

/**
 * INSERT QUERY 
 */
let create = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.create(query).then(result => {
            return resolve(result);
        }).then(err => {
            return reject(err)

        })
    })
}

/**
 * FIND ALL QUERY
 */
let find = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.findAll(query).then(result => {

            return resolve(result);
        }).catch(err => {
            return reject({ message: "DB query Failed :" + err });
        })

    })
}

/**
 * FIND WHERE QUERY
 */
let findSome = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.findAll({ where: query }).then(result => {
            return resolve(result);
        }).catch(err => {
            return reject({ message: "DB query Failed :" + err });
        })

    })
}

/**
 * FIND QUERY IN PAGINATION
 */
let findOnePagination = (collection, query, limit, offset) => {
    return new Promise((resolve, reject) => {
        collection.findAll({
            limit,
            offset,
            where: query
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            return reject(err);
        })

    })
}

/**
 * FIND ONE QUERY
 */
let findOne = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.findOne({ where: query }).then(result => {
            return resolve(result);
        }).catch(err => {
            return reject(err);
        })

    })
}

/**
 * UPDATE QUERY 
 */
let updateOne = (collection, findBy, query) => {
    return new Promise((resolve, reject) => {
        collection.update(query, { where: findBy }).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}

/**
 * UPDATE ONE QUERY
 */
let update = (collection, findBy, query) => {
    return new Promise((resolve, reject) => {
        collection.updateOne(findBy, query, (err, result) => {
            err ? reject(err) : resolve(result)
        });
    })
}

/**
 * REMOVE QUERY
 */
let remove = async(collection, query) => {
    return new Promise((resolve, reject) => {
        collection.destroy({ where: query }).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}

/**
 * DELETE MANY
 */
let deleteMany = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.destroy({ where: { query } }).then(result => {
            return resolve(result)
        }).catch(err => {
            return reject(err)
        })
    })
}
module.exports = {
    error,
    create,
    find,
    findOne,
    updateOne,
    remove,
    update,
    findOnePagination,
    findSome,
    deleteMany
}