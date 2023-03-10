export default function dataURItoBlob(dataURI, idx) {
    // Convert Base64/URLEncoded data component to raw Binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // Separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // Write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}