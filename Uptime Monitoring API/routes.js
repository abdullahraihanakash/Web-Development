/**
 * Title: Routes
 * Description: Application Routes
 * Author: Abdullah Raihan Akash
 * Date: 12/10/2026
 */

import data from './lib/data.js';
import utilities from './utilities.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dataDir = fileURLToPath(new URL('./data', import.meta.url));

const handler = {};

handler._trash = {};

handler._trash.move = (dir, fileName, callback) => {
    const source = path.join(dataDir, dir, `${fileName}.json`);
    const trashDir = path.join(dataDir, 'trash', dir);
    
    const destination = path.join(trashDir, `${fileName}_${Date.now()}.json`);

    // trash ফোল্ডার না থাকলে বানাবে
    fs.mkdir(trashDir, { recursive: true }, (err1) => {
        if (!err1) {
            fs.rename(source, destination, (err2) => {
                callback(err2 || false);
            });
        } else {
            callback(err1);
        }
    });
};

handler.sampleHandler = (requestProperties,callback) => {
    callback(200, {
        message: 'This is a sample url'
    });
}

handler.notFoundHandler = (requestProperties,callback) => {
    callback(404, {
        message: 'Your request url was not found!'
    });
}

handler.userHandler = (requestProperties,callback) => {

    /* callback(200, {
        message: 'This is a user url',
    }); */

    const acceptedMehtods = ['get','post','put','delete']; // only accept this 4 methode
    if(acceptedMehtods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties,callback);
    }
    else {
        callback(405);
    }

}

handler._users = {};
handler._users.post = (requestProperties,callback) => {
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAgreement = typeof requestProperties.body.tosAgreement === 'boolean' ? requestProperties.body.tosAgreement : false;
    if(firstName && lastName && phone && password && tosAgreement) {
        // Make sure that the user doesn't already exists
        data.read('users',phone, (userError,user) => {
             if(userError) {
                let userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: utilities.hash(password),
                    tosAgreement
                }
                data.create('users',phone,userObject, (err) => {
                    if(!err) {
                        callback(200, {
                            'message': 'User was created successfully!'
                        });
                    }
                    else {
                        callback(500, {
                            'error': 'Could not create user!'
                        });
                    }
                });
             }
             else {
                callback(400, {
                    'error': 'User already exists!'
                });
             }
        })         
    }
    else {
        callback(400, {
            error: 'You have a problem in your request!'
        });
    };
};

handler._users.get = (requestProperties, callback) => {
    const phone = typeof requestProperties.queryStringObject.phone === 'string' &&
                  requestProperties.queryStringObject.phone.trim().length === 11
                  ? requestProperties.queryStringObject.phone : false;

    if (phone) {
        // Verify token
        const token = typeof requestProperties.headersObject.token === 'string'
                      ? requestProperties.headersObject.token : false;

        handler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                // lookup the user
                data.read('users', phone, (err, u) => {
                    if (!err && u) {
                        const user = { ...utilities.parseJSON(u) };
                        delete user.password;
                        callback(200, user);
                    } else {
                        callback(404, { error: 'Requested user was not found!' });
                    }
                });
            } else {
                callback(403, { error: 'Authentication failure!' });
            }
        });
    } else {
        callback(404, { error: 'Requested user was not found!' });
    }
};

handler._users.put = (requestProperties, callback) => {
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const phone = typeof requestProperties.body.phone === 'string' &&
                  requestProperties.body.phone.trim().length === 11
                  ? requestProperties.body.phone : false;

    if (phone) {
        if (firstName || lastName || password) {
            // Verify token
            const token = typeof requestProperties.headersObject.token === 'string'
                          ? requestProperties.headersObject.token : false;

            handler._token.verify(token, phone, (tokenId) => {
                if (tokenId) {
                    // Lookup the user
                    data.read('users', phone, (err1, uData) => {
                        if (!err1 && uData) {
                            const userData = { ...utilities.parseJSON(uData) };

                            if (firstName) userData.firstName = firstName;
                            if (lastName) userData.lastName = lastName;
                            if (password) userData.password = utilities.hash(password);

                            // Store to database
                            data.update('users', phone, userData, (err2) => {
                                if (!err2) {
                                    callback(200, { message: 'User was updated successfully!' });
                                } else {
                                    callback(500, { error: 'There was a problem in the server side!' });
                                }
                            });
                        } else {
                            callback(400, { error: 'You have a problem in your request!' });
                        }
                    });
                } else {
                    callback(403, { error: 'Authentication failure!' });
                }
            });
        } else {
            callback(400, { error: 'You have a problem in your request!' });
        }
    } else {
        callback(400, { error: 'Invalid phone number. Please try again!' });
    }
};

handler._users.delete = (requestProperties, callback) => {

    const rawPhone = requestProperties.queryStringObject?.phone ?? requestProperties.body?.phone;

    const phone = typeof rawPhone === 'string' && rawPhone.trim().length === 11
                  ? rawPhone.trim() : false;

    if (phone) {
        // Verify token
        const token = typeof requestProperties.headersObject.token === 'string'
                      ? requestProperties.headersObject.token : false;

        handler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                // Lookup the user
                data.read('users', phone, (err1, userData) => {
                    if (!err1 && userData) {
                        data.delete('users', phone, (err2) => {
                            if (!err2) {
                                callback(200, { message: 'User was successfully deleted!' });
                            } else {
                                callback(500, { error: 'There was a problem in server!' });
                            }
                        });
                    } else {
                        callback(404, { error: 'Requested user was not found!' });
                    }
                });
            } else {
                callback(403, { error: 'Authentication failure!' });
            }
        });
    } else {
        callback(400, { error: 'There was a problem in your request!' });
    }
};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._token = {};

// Login: create token
handler._token.post = (requestProperties, callback) => {
    const phone = typeof requestProperties.body.phone === 'string' &&
                  requestProperties.body.phone.trim().length === 11
                  ? requestProperties.body.phone : false;

    const password = typeof requestProperties.body.password === 'string' &&
                     requestProperties.body.password.trim().length > 0
                     ? requestProperties.body.password : false;

    if (phone && password) {
        data.read('users', phone, (err1, userData) => {
            if (!err1 && userData) {
                const hashedPassword = utilities.hash(password);

                if (hashedPassword === utilities.parseJSON(userData).password) {
                    const tokenId = utilities.createRandomString(20);
                    const expires = Date.now() + 60 * 60 * 1000;
                    const tokenObject = { phone, id: tokenId, expires };

                    // Store the token
                    data.create('tokens', tokenId, tokenObject, (err2) => {
                        if (!err2) {
                            callback(200, tokenObject);
                        } else {
                            callback(500, { error: 'There was a problem in server side!' });
                        }
                    });
                } else {
                    callback(400, { error: 'Password is not valid!' });
                }
            } else {
                callback(404, { error: 'User not found!' });
            }
        });
    } else {
        callback(400, { error: 'You have a problem in your request!' });
    }
};

// Read Token 
handler._token.get = (requestProperties, callback) => {
    const id = typeof requestProperties.queryStringObject.id === 'string' &&
               requestProperties.queryStringObject.id.trim().length === 20
               ? requestProperties.queryStringObject.id : false;

    if (id) {
        data.read('tokens', id, (err, tokenData) => {
            if (!err && tokenData) {
                callback(200, utilities.parseJSON(tokenData));
            } else {
                callback(404, { error: 'Requested token was not found!' });
            }
        });
    } else {
        callback(404, { error: 'Requested token was not found!' });
    }
};

handler._token.put = (requestProperties, callback) => {
    const id = typeof requestProperties.body.id === 'string' &&
               requestProperties.body.id.trim().length === 20
               ? requestProperties.body.id : false;

    const extend = typeof requestProperties.body.extend === 'boolean' &&
                   requestProperties.body.extend === true ? true : false;

    if (id && extend) {
        data.read('tokens', id, (err1, tokenData) => {
            if (!err1 && tokenData) {
                const tokenObject = utilities.parseJSON(tokenData);

                if (tokenObject.expires > Date.now()) {
                    tokenObject.expires = Date.now() + 60 * 60 * 1000;

                    // Store the updated token
                    data.update('tokens', id, tokenObject, (err2) => {
                        if (!err2) {
                            callback(200, { 
                                message: 'Token was extended successfully!'
                             });
                        } else {
                            callback(500, { 
                                error: 'There was a problem in server side!'
                             });
                        }
                    });
                } else {
                    callback(400, { 
                        error: 'Token already expired!' 
                    });
                }
            } else {
                callback(404, { 
                    error: 'Requested token was not found!' 
                });
            }
        });
    } else {
        callback(400, { 
            error: 'There was a problem in your request!' 
        });
    }
};

handler._token.delete = (requestProperties, callback) => {
    // Check the id is valid (query string এ আগে, না থাকলে body থেকে)
    const rawId = requestProperties.queryStringObject?.id ?? requestProperties.body?.id;

    const id = typeof rawId === 'string' && rawId.trim().length === 20
               ? rawId.trim() : false;

    if (id) {
        // Lookup the token
        data.read('tokens', id, (err1, tokenData) => {
            if (!err1 && tokenData) {
                data.delete('tokens', id, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'Token was successfully deleted!',
                        });
                    } else {
                        callback(500, {
                            error: 'There was a server side error!',
                        });
                    }
                });
            } else {
                callback(404, {
                    error: 'Requested token was not found!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'There was a problem in your request!',
        });
    }
};

handler._token.verify = (id, phone, callback) => {
    data.read('tokens', id, (err, tokenData) => {
         if (typeof id !== 'string' || id.trim().length !== 20) {
        return callback(false);
    }
        if (!err && tokenData) {
            const token = utilities.parseJSON(tokenData);
            if (token.phone === phone && token.expires > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};

handler.checkHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._check[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._check = {}
handler._check.post = (requestProperties,callback) => {
    // Validate inputs
    let protocol = typeof(requestProperties.body.protocol) === 'string' && ['http','https'].indexOf(requestProperties.body.protocol) > - 1 ? requestProperties.body.protocol : false;

    let url = typeof(requestProperties.body.url) === 'string' && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url : false;

    let method = typeof(requestProperties.body.method) === 'string' && ['get','post','put','delete'].indexOf(requestProperties.body.method) > - 1 ? requestProperties.body.method : false;  

    let successCodes = typeof(requestProperties.body.successCodes) === 'object' && requestProperties.body.successCodes instanceof Array ? requestProperties.body.successCodes : false;  // Type of array is Object

    let timeOutSeconds = typeof(requestProperties.body.timeOutSeconds) === 'number' && requestProperties.body.timeOutSeconds % 1 === 0 && requestProperties.body.timeOutSeconds >= 1 && requestProperties.body.timeOutSeconds <= 5 ? requestProperties.body.timeOutSeconds : false;

    if(protocol && url && method && successCodes && timeOutSeconds) {
        const token = typeof requestProperties.headersObject.token === 'string' ? requestProperties.headersObject.token : false;

        // Lookup the user phone by reading the token
        data.read('tokens', token, (err1,tokenData) => {
            if(!err1 && tokenData) {
                let userPhone = utilities.parseJSON(tokenData).phone;

                // Lookup the user data
                data.read('users', userPhone, (err2,userData) => {
                    if(!err2 && userData) {
                        handler._token.verify(token,userPhone,(tokenIsValid) => {
                            if(tokenIsValid) {
                              let userObject = utilities.parseJSON(userData)
                              let userChecks = typeof(userObject._check) === 'object' && userObject._check instanceof Array ? userObject._check : [];
                              
                              if(userChecks.length < 5) {
                                const checkId = utilities.createRandomString(20);
                                const checkObject = {
                                    id: checkId,
                                    userPhone: userPhone,
                                    protocol,
                                    url,
                                    method,
                                    successCodes,
                                    timeOutSeconds,
                                }
                                // Save the object
                                data.create('checks',checkId,checkObject,(err3) => {
                                    if(!err3) {
                                        // Add check id to the user's object
                                        userObject._check = userChecks;
                                        userObject._check.push(checkId);

                                        // Save the new user data
                                        data.update('users',userPhone,userObject,(err4) => {
                                            if(!err4) {
                                                // Return the data about the new check
                                                callback(200,checkObject)
                                            }
                                            else {
                                                callback(500, {
                                                    error: 'There was a problem in the server side!'
                                                })
                                            }
                                        })
                                    }
                                    else {
                                        callback(500, {
                                            error: 'There was a problem in the server side!'
                                                })
                                        }
                                })
                              }
                              else {
                                callback(403, {
                                    error: 'User has already reached max check limit!'
                                })
                              }
                            }
                            else {
                                callback(401, {
                                    error: 'Authentication problem!'
                                })
                            }
                        })
                    }
                    else {
                        callback(403, {
                            error: 'User not found!'
                        })
                    }
                })
            }
            else {
                callback(401, {
                    error: 'Authentication problem!'
                })
            }
        })
    }
    else {
        callback(400, {
            error: 'You have a problem in your information!'
        });
    }
}

handler._check.get = (requestProperties,callback) => {
    // Validate id
    const id = typeof requestProperties.queryStringObject?.id === 'string' && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id.trim() : false;

    if (id) {
        // Lookup the check
        data.read('checks', id, (err1, checkData) => {
            if (!err1 && checkData) {
                const checkObject = utilities.parseJSON(checkData);

                const token = typeof requestProperties.headersObject.token === 'string' ? requestProperties.headersObject.token : false;

                // Verify the token belongs to the owner of this check
                handler._token.verify(token, checkObject.userPhone, (tokenIsValid) => {
                    if (tokenIsValid) {
                        callback(200, checkObject);
                    } else {
                        callback(401, {
                            error: 'Authentication problem!'
                        });
                    }
                });
            } else {
                callback(404, {
                    error: 'Requested check was not found!'
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request!'
        });
    }
}

handler._check.put = (requestProperties,callback) => {
    // Validate id
    const id = typeof requestProperties.body.id === 'string' && requestProperties.body.id.trim().length === 20 ? requestProperties.body.id.trim() : false;

    // Optional fields (দেওয়া না হলে false)
    const protocol = typeof requestProperties.body.protocol === 'string' && ['http', 'https'].indexOf(requestProperties.body.protocol) > -1 ? requestProperties.body.protocol : false;

    const url = typeof requestProperties.body.url === 'string' && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url : false;

    const method = typeof requestProperties.body.method === 'string' && ['get', 'post', 'put', 'delete'].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method : false;

    const successCodes = typeof requestProperties.body.successCodes === 'object' && requestProperties.body.successCodes instanceof Array ? requestProperties.body.successCodes : false;

    const timeOutSeconds = typeof requestProperties.body.timeOutSeconds === 'number' && requestProperties.body.timeOutSeconds % 1 === 0 && requestProperties.body.timeOutSeconds >= 1 && requestProperties.body.timeOutSeconds <= 5 ? requestProperties.body.timeOutSeconds : false;

    if (id) {
        // কমপক্ষে একটা field দিতে হবে
        if (protocol || url || method || successCodes || timeOutSeconds) {
            // Lookup the check
            data.read('checks', id, (err1, checkData) => {
                if (!err1 && checkData) {
                    const checkObject = utilities.parseJSON(checkData);

                    const token = typeof requestProperties.headersObject.token === 'string' ? requestProperties.headersObject.token : false;

                    handler._token.verify(token, checkObject.userPhone, (tokenIsValid) => {
                        if (tokenIsValid) {
                            // Update only the provided fields
                            if (protocol) checkObject.protocol = protocol;
                            if (url) checkObject.url = url;
                            if (method) checkObject.method = method;
                            if (successCodes) checkObject.successCodes = successCodes;
                            if (timeOutSeconds) checkObject.timeOutSeconds = timeOutSeconds;

                            // Store the updated check
                            data.update('checks', id, checkObject, (err2) => {
                                if (!err2) {
                                    callback(200, checkObject);
                                } else {
                                    callback(500, {
                                        error: 'There was a problem in the server side!'
                                    });
                                }
                            });
                        } else {
                            callback(401, {
                                error: 'Authentication problem!'
                            });
                        }
                    });
                } else {
                    callback(404, {
                        error: 'Requested check was not found!'
                    });
                }
            });
        } else {
            callback(400, {
                error: 'You must provide at least one field to update!'
            });
        }
    } else {
        callback(400, {
            error: 'You have a problem in your request!'
        });
    }
}

handler._check.delete = (requestProperties,callback) => {
    const rawId = requestProperties.queryStringObject?.id ?? requestProperties.body?.id;

    const id = typeof rawId === 'string' && rawId.trim().length === 20 ? rawId.trim() : false;

    if (id) {
        // Lookup the check
        data.read('checks', id, (err1, checkData) => {
            if (!err1 && checkData) {
                const checkObject = utilities.parseJSON(checkData);

                const token = typeof requestProperties.headersObject.token === 'string' ? requestProperties.headersObject.token : false;

                handler._token.verify(token, checkObject.userPhone, (tokenIsValid) => {
                    if (tokenIsValid) {
                        // Delete the check file
                        handler._trash.move('checks', id, (err2) => {
                            if (!err2) {
                                // Lookup the user to remove the check id
                                data.read('users', checkObject.userPhone, (err3, userData) => {
                                    if (!err3 && userData) {
                                        const userObject = utilities.parseJSON(userData);
                                        const userChecks = typeof userObject._check === 'object' && userObject._check instanceof Array ? userObject._check : [];

                                        // Remove the deleted check id from user's checks
                                        userObject._check = userChecks.filter((checkId) => checkId !== id);

                                        // Save the updated user
                                        data.update('users', userObject.phone, userObject, (err4) => {
                                            if (!err4) {
                                                callback(200, {
                                                    message: 'Check was successfully deleted!'
                                                });
                                            } else {
                                                callback(500, {
                                                    error: 'There was a server side problem!'
                                                });
                                            }
                                        });
                                    } else {
                                        callback(500, {
                                            error: 'There was a server side problem!'
                                        });
                                    }
                                });
                            } else {
                                callback(500, {
                                    error: 'There was a server side problem!'
                                });
                            }
                        });
                    } else {
                        callback(401, {
                            error: 'Authentication problem!'
                        });
                    }
                });
            } else {
                callback(404, {
                    error: 'Requested check was not found!'
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request!'
        });
    }
}

export const routes = {
    sample: handler.sampleHandler,
    user: handler.userHandler,
    token: handler.tokenHandler,
    check: handler.checkHandler,
}

export const notFoundHandler = handler.notFoundHandler;