# Phantom Promised
### A dead simple html to pdf lib/webservice

## Usage
You can import the module
```javascript
  const phantom = require('phantom-promised');
  phantom('<div>Hello World</div>', { format: 'A4', orientation: 'portrait', margin: '0' })
    // pdf is a buffer containing the PDF
    .then(pdf => ...);
```

Or simply run the bundled server and send POST request with as body parameter html
```bash
PORT=8080 npm start
```
then using httpie for example
```bash
http POST 0:8080 "html=<div>Hello World</div>" > out.pdf
```
