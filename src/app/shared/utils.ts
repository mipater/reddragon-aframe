function random_id() {
  return '_' + (
    Number(String(Math.random()).slice(2)) +
    Date.now() +
    Math.round(performance.now())
  ).toString(36);
}

function getExtension(filename: string) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

function isImage(filename: string) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
      //etc
      return true;
  }
  return false;
}

export {
  random_id,
  getExtension,
  isImage
}
