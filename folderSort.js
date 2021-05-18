let fs = require("fs");
let extensionsMapping = require("./util");

let testFolderPath = "./Downloads";

let allFiles = fs.readdirSync(testFolderPath);

for (let i = 0; i < allFiles.length; i++) {
  sortFiles(allFiles[i]);
}

function getExtension(file) {
  file = file.split(".");
  return file[1];
}

function checkExtensionFolder(extension) {
  let extensionsFolderName = testFolderPath;
  for (let key in extensionsMapping) {
    let extensions = extensionsMapping[key];
    if (extensions.includes(extension)) {
      extensionsFolderName = extensionsFolderName + "/" + key;
      break;
    }
  }

  //   let folderToBeChecked = testFolderPath + "/" + extensionsFolderName;
  let isFolderExists = fs.existsSync(extensionsFolderName);
  if (!isFolderExists) {
    fs.mkdirSync(extensionsFolderName);
  }
  return extensionsFolderName;
}

function moveFile(file, extensionFolderName) {
  let sourceFile = testFolderPath + "/" + file;
  let destinationFile = extensionFolderName + "/" + file;

  // cpoy file from src to destination
  fs.copyFileSync(sourceFile, destinationFile);
  // delete from src
  fs.unlinkSync(sourceFile);
}

function createExtensionFolder(extension) {}

function sortFiles(file) {
  let extension = getExtension(file);
  let extensionFolderName = checkExtensionFolder(extension);
  moveFile(file, extensionFolderName);
  //   if (isFolder) {
  //     // extension folder exist
  //     moveFile(file, extension);
  //   } else {
  //     // extension folder does not exist
  //     createExtensionFolder(extension);
  //     moveFile(file, extension);
  //   }
}
