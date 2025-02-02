require('dotenv').config();
const mysql = require('mysql2/promise');
async function insertAuthors() {
    try {
        const destinationDB = await mysql.createConnection({
            host: process.env.DEST_DB_HOST,
            user: process.env.DEST_DB_USER,
            password: process.env.DEST_DB_PASSWORD,
            database: 'blog_25'
        });


        const authors = [
            { name: 'John Doe', emailId: 'johndoe@example.com', linkedin: 'https://linkedin.com/in/johndoe', twitter: 'https://twitter.com/johndoe' },
            { name: 'Jane Smith', emailId: 'janesmith@example.com', linkedin: 'https://linkedin.com/in/janesmith', twitter: 'https://twitter.com/janesmith' },
            { name: 'Alice Johnson', emailId: 'alicejohnson@example.com', linkedin: 'https://linkedin.com/in/alicejohnson', twitter: 'https://twitter.com/alicejohnson' },
            { name: 'Robert Brown', emailId: 'robertbrown@example.com', linkedin: 'https://linkedin.com/in/robertbrown', twitter: 'https://twitter.com/robertbrown' },
            { name: 'Emily Davis', emailId: 'emilydavis@example.com', linkedin: 'https://linkedin.com/in/emilydavis', twitter: 'https://twitter.com/emilydavis' }
        ];

        for (const author of authors) {
            await destinationDB.execute(
                `INSERT INTO Author (name, emailId, linkedin, twitter) 
                VALUES (?, ?, ?, ?) 
                ON DUPLICATE KEY UPDATE 
                name = VALUES(name), 
                linkedin = VALUES(linkedin), 
                twitter = VALUES(twitter)`,
                [author.name, author.emailId, author.linkedin, author.twitter]
            );
        }

        console.log('Author data inserted successfully.');
        await destinationDB.end();
    } catch (error) {
        console.error('Error inserting author data:', error);
    }
};
insertAuthors();
