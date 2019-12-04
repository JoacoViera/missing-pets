const fs = require('fs');
const path = require('path');

const getTemplate = (userName, petName, creatorEmail, message) => {
  const file = fs.readFileSync(path.resolve(__dirname, 'template.txt'));
  let stringFile = file.toString();

  stringFile = stringFile.replace('{Name}', userName);
  stringFile = stringFile.replace('{PetName}', petName);
  stringFile = stringFile.replace('{Email}', creatorEmail);
  stringFile = stringFile.replace('{Message}', message);

  return stringFile;
};

module.exports = {
  getTemplate,
};
