exports.generateValuesForSQL2 = (filesToSave, idName) => {
  let SQL = '';

  const filesLength = filesToSave.length;
  for(let file of filesToSave){
    const {fileName, filePathName, fileSize} = file;
    SQL += `(${idName}, '${fileName}', '${filePathName}', '${fileSize}')`;
    if(file != filesToSave[filesLength - 1]){
      SQL += `,\n`;
    } else {
      SQL += `;`;
    }
  }
  return SQL;
}

exports.generateValuesForSQL = (attachments, idName) => {
  let SQL = '';

  const attachmentsLength = attachments.length;
  for(let attachment of attachments){
    SQL += `(${idName}, '${attachment}')`;
    if(attachment != attachments[attachmentsLength - 1]){
      SQL += `,\n`;
    } else {
      SQL += `;`;
    }
  }
  return SQL;
}