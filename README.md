# Data Compression

The `data compression` npm package provides a lightweight solution for compressing data using Huffman encoding and converting it into a URI-friendly string format. This makes it convenient for transferring data over URIs while minimizing the payload size. The package exposes two main methods, `encode` and `decode`, allowing users to efficiently compress and decompress data.

**Features:**
- **Huffman Encoding:** Utilizes Huffman coding, a widely used compression algorithm, to efficiently encode data.
  
- **URI-friendly:** Converts the compressed data into a URI-friendly string format, ensuring compatibility with URIs and minimizing transfer size.

- **Easy Integration:** Simple and straightforward API with two key methods, `encode` for compression and `decode` for decompression.

# Install
```bash
npm install data-compression
```

Enhance your data transfer efficiency with the `data-compression` npm package by seamlessly integrating Huffman encoding and URI-friendly serialization into your projects.

# Example Usage
```javascript
import { encode, decode } from 'data-compression'

// Sample data
const dataToEncode = {
    tile: 'dataToEncode',
    data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
};

// Encode data
const { encodedData, compression_ratio, binaryEnocded } = encode(dataToEncode);

// Decode data
const decodedData = decode(encodedData);

console.log('Compression Ratio', compression_ratio)
console.log('Binary Encoded Data', binaryEnocded)
console.log('Original Data:', dataToEncode);
console.log('Encoded Data:', encodedData);
console.log('Decoded Data:', decodedData);
```

