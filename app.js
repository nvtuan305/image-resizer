const sharp = require('sharp');

console.log('------------------------------------------');
console.log('            Image resizing                ');
console.log('------------------------------------------');

const SampleImage = [
    {
        fileName: 'land-rect',
        path: './images/land-rect.jpg',
        size: {
            width: 2048,
            height: 1536
        }
    },
    {
        fileName: 'portrait-rect',
        path: './images/portrait-rect.jpg',
        size: {
            width: 1152,
            height: 2048
        }
    },
    {
        fileName: 'portrait-rect-1',
        path: './images/portrait-rect-1.jpg',
        size: {
            width: 1536,
            height: 2048
        }
    },
    {
        fileName: 'square',
        path: './images/square.jpg',
        size: {
            width: 1080,
            height: 1080
        }
    }
];

const Size = [
    {
        width: 480,
        height: 480
    },
    {
        width: 960,
        height: 960
    }
];


function run() {
    Size.forEach((outputSize) => {
        SampleImage.forEach((image) => {
            resizeImage(image.path, image.fileName, image.size, outputSize);
        });
    });
}

function resizeImage(filePath, fileOutName, imageSize, expectedSize) {
    let ouputSize = calculateNewImageSize(imageSize, expectedSize);
    const fileName = './output/' + fileOutName + '-' + ouputSize.width +
        'x' + ouputSize.height + '.jpg';

    try {
        sharp(filePath)
            .resize(ouputSize.width, ouputSize.height, {
                kernel: sharp.kernel.lanczos2,
                interpolator: sharp.interpolator.nohalo
            })
            .background('white')
            .embed()
            .toFile(fileName)
            .then(() => {
                console.log('Resized image: ' + fileName);
            })
            .catch((error) => {
                console.log('ERROR (' + fileName + '): ' + error);
            });

    } catch (error) {
        console.log('ERROR: ' + error);
    }
}

function calculateNewImageSize(imageSize, outputSize) {
    let size = {
        width: 0,
        height: 0
    };

    if (imageSize.width < outputSize.width) {
        size.width = imageSize.width;
        size.height = imageSize.height;
        return size;
    }

    size.width = Math.floor(outputSize.width);
    size.height = Math.floor(imageSize.height / (imageSize.width / outputSize.width));
    return size;
}

run();