require('dotenv').config();
const mysql = require('mysql2/promise');
const AWS = require('aws-sdk');
const https = require('https');
const fs = require('fs');
const path = require('path');
const stream = require('stream');

async function tranferImage() {
    try {
        const destinationDB = await mysql.createConnection({
            host: process.env.DEST_DB_HOST,
            user: process.env.DEST_DB_USER,
            password: process.env.DEST_DB_PASSWORD,
            database: 'blog_25'
        });

        const query = `SELECT id,image,slug FROM Blog`;
        const [blogs] = await destinationDB.execute(query);

        if (blogs.length === 0) {
            console.log('No blogs found to transfer.');
            return;
        }
        console.log(`Transferring ${blogs.length} blogs...`);

        for (const blog of blogs) {
            const newData = {
                id: blog.id,
                image: await s3FuncTranfer(blog.image, blog.slug),
            };

            await destinationDB.execute(`UPDATE Blog SET image = ? WHERE id = ?`, [newData.image, newData.id]);
        }

        console.log('Blog data transfer completed successfully.');

        // Close connections
        await destinationDB.end();
    } catch (error) {
        console.error('Error transferring data:', error);
    }
}

async function s3FuncTranfer(imageUrl, url) {
    const s3 = new AWS.S3();
    s3.config.update({
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        region: 'ap-south-1'
    });
    try {
        const imageBuffer = await downloadImage(`https://blog.woodenstreet.com/images/data/image_upload/${imageUrl}`);
        const extension = path.extname(imageUrl).toLowerCase();
        const s3Key = `blog-images/${url}/1${extension}`;
        let contentType;
        if (extension === '.jpg' || extension === '.jpeg') {
            contentType = 'image/jpeg';
        } else if (extension === '.png') {
            contentType = 'image/png';
        } else if (extension === '.gif') {
            contentType = 'image/gif';
        } else {
            contentType = 'application/octet-stream';
        }

        const params = {
            Bucket: 'wsnew2024',
            Key: s3Key,
            Body: imageBuffer,
            ContentType: contentType,
            ACL: 'public-read',
        };

        const { Location } = await s3.upload(params).promise();
        console.log(Location.replace('https://wsnew2024.s3.amazonaws.com/blog-images/', ''));
        return Location.replace('https://wsnew2024.s3.amazonaws.com/blog-images/', ''); // Return the S3 URL
    } catch (err) {
        console.error('Error uploading image to S3:', err);
        throw err; // Propagate the error
    }
}

// Helper function to download image as a buffer
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            const data = new stream.PassThrough();
            response.pipe(data);
            let buffer = Buffer.alloc(0);

            data.on('data', (chunk) => {
                buffer = Buffer.concat([buffer, chunk]);
            });

            data.on('end', () => resolve(buffer));
            data.on('error', reject);
        }).on('error', reject);
    });
}

tranferImage();
