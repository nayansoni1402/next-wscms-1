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

        const query = `SELECT id,image FROM Blog`;
        const [blogs] = await destinationDB.execute(query);

        if (blogs.length === 0) {
            console.log('No blogs found to transfer.');
            return;
        }
        console.log(`Transferring ${blogs.length} blogs...`);

        for (const blog of blogs) {
            const newData = {
                id: blog.id,
                image: await s3FuncTranfer(blog.image),
            };

            // await destinationDB.execute(`UPDATE Blog SET image = ? WHERE id = ?`, [newData.image, newData.id]);
        }

        console.log('Blog data transfer completed successfully.');

        // Close connections
        await destinationDB.end();
    } catch (error) {
        console.error('Error transferring data:', error);
    }
}

async function s3FuncTranfer(imageUrl) {
    const s3 = new AWS.S3();
    try {
        const imageBuffer = await downloadImage(`https://blog.woodenstreet.com/images/data/image_upload/${imageUrl}`);
        
        const imageName = path.basename(imageUrl);
        const s3Key = `images/${Date.now()}_${imageName}`;

        // Upload the image to S3
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: s3Key,
            Body: imageBuffer,
            ContentType: 'image/jpeg', // Assuming it's a JPEG image, change as needed
            ACL: 'public-read', // Make the image publicly readable
        };

        const { Location } = await s3.upload(params).promise();
        return Location; // Return the S3 URL
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
