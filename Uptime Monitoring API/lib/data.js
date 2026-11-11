// Dependencies
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the current directory in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Module scaffolding
const lib = {};

// Base directory of the data folder
lib.basedir = path.join(__dirname, '..', 'data');

// Create a new JSON file and write data to it
// Write data to file
lib.create = function (dir, file, data, callback) {
    // Create the directory path and filename
    const directoryPath = path.join(lib.basedir, dir);
    const filePath = path.join(directoryPath, `${file}.json`);

    // Create the directory if it doesn't exist
    fs.mkdir(directoryPath, { recursive: true }, (mkdirError) => {
        if (mkdirError) {
            return callback('Error creating directory!');
        }

        // Open the file for writing ('wx' prevents overwriting)
        fs.open(filePath, 'wx', (err, fileDescriptor) => {
            if (err || !fileDescriptor) {
                return callback(
                    'Could not create new file; it may already exist!'
                );
            }

            // Convert data to a JSON string
            const stringData = JSON.stringify(data);

            // Write data to the file
            fs.writeFile(fileDescriptor, stringData, (writeError) => {
                if (writeError) {
                    return fs.close(fileDescriptor, () => {
                        fs.unlink(filePath, () => {
                            callback('Error writing to new file!');
                        });
                    });
                }

                // Close the file after writing
                fs.close(fileDescriptor, (closeError) => {
                    if (closeError) {
                        return callback('Error closing the new file!');
                    }

                    callback(false);
                });
            });
        });
    });
};

// Read data from file

lib.read = (dir, file, callback) => {
    const filePath = path.join(lib.basedir, dir, `${file}.json`);
    fs.readFile(filePath, 'utf8', (err, data) => {
        callback(err, data);
    });
};


 // Update existing file

// lib.update = (dir,file,data,callback) => {
//     const filePath = path.join(lib.basedir, dir, `${file}.json`);
//     fs.open(filePath, 'r+',(openError,fileDescriptor) => {
//         if(!openError && fileDescriptor) {
//             // Convart the data to string
//             const stringData = JSON.stringify(data);

//             fs.ftruncate(fileDescriptor,(openError) => {
//                 if(!openError) {
//                     // Write to the file and close it
//                     fs.writeFile(fileDescriptor,stringData,(writeError) => {
//                         if(!writeError) {
//                             // Close the file
//                             fs.close(fileDescriptor, (closeError) => {
//                                 if(!closeError) {
//                                     callback(false);
//                                 }
//                                 else {
//                                     callback('Error closing file!');
//                                 }
//                             });
//                         }
//                         else {
//                             callback('Error writing to file!');
//                         }
//                     });
//                 }
//                 else {
//                     callback('Error truncating file!');
//                 }

//             });
//         }
//         else {
//             callback('Error opening file. File may not exist!');
//         }
//     });
// };

// Update existing file
lib.update = (dir, file, data, callback) => {

    const filePath = path.join(lib.basedir, dir, `${file}.json`);

    fs.open(filePath, 'r+', (openError, fileDescriptor) => {

        if (!openError && typeof fileDescriptor === 'number') {

            const stringData = JSON.stringify(data);

            // Remove old data
            fs.ftruncate(fileDescriptor, (truncateError) => {

                if (!truncateError) {

                    // Write updated data
                    fs.writeFile(fileDescriptor, stringData, (writeError) => {

                        if (!writeError) {

                            // Close file
                            fs.close(fileDescriptor, (closeError) => {

                                if (!closeError) {
                                    callback(false);
                                } else {
                                    callback('Error closing file!');
                                }

                            });

                        } else {

                            fs.close(fileDescriptor, () => {
                                callback('Error writing to file!');
                            });

                        }

                    });

                } else {

                    fs.close(fileDescriptor, () => {
                        callback('Error truncating file!');
                    });

                }

            });

        } else {

            callback('Error opening file. File may not exist!');

        }

    });

};

// Delete existing file
lib.delete = (dir,file,callback) => {
    const filePath = path.join(lib.basedir, dir, `${file}.json`);
    // Unlink file
 // Update existing file
    fs.unlink(filePath,(err) => {
        if (!err) {
            callback(false);
        }
        else {
            callback('Error deleting file');
        }
    });
}

// List all files inside a directory
lib.list = (dir, callback) => {

    const directoryPath = path.join(lib.basedir, dir);

    fs.readdir(directoryPath, (err, fileNames) => {

        if (!err && fileNames && fileNames.length > 0) {

            const trimmedFileNames = [];

            fileNames.forEach((fileName) => {

                if (fileName.endsWith('.json')) {
                    trimmedFileNames.push(
                        fileName.replace('.json', '')
                    );
                }
            });
            callback(false, trimmedFileNames);
        } else {
            callback('Error occurred while reading directory');
        }
    });
};

// Export the library
export default lib;
