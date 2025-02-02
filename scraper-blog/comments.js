require('dotenv').config();
const mysql = require('mysql2/promise');

async function transferComments() {
    try {
        const sourceDB = await mysql.createConnection({
            host: process.env.DEST_DB_HOST,
            user: process.env.DEST_DB_USER,
            password: process.env.DEST_DB_PASSWORD,
            database: 'wsblog'
        });

        const destinationDB = await mysql.createConnection({
            host: process.env.DEST_DB_HOST,
            user: process.env.DEST_DB_USER,
            password: process.env.DEST_DB_PASSWORD,
            database: 'blog_25'
        });

        const query = `Select * from comments where email NOT LIKE '%test%' AND name NOT LIKE '%test%' and comment NOT LIKE '%test%'`;
        const [comments] = await sourceDB.execute(query);

        if (comments.length === 0) {
            console.log('No Comments found to transfer.');
            return;
        }

        console.log(`Transferring ${comments.length} Comments...`);

        for (const comment of comments) {
            const [blog] = await destinationDB.execute(`SELECT id FROM Blog WHERE ref_id = ?`, [comment.blog_id]);

            if (blog.length === 0) {
                console.log(`Blog not found for comment ID: ${comment.id}, skipping...`);
                continue;
            }

            const blog_id = blog[0].id;
            const createdDate = (comment.created_date === '0000-00-00 00:00:00' || !isValidDate(comment.created_date))
                ? new Date()
                : new Date(comment.created_date);
                console.log(comment.id)
            await destinationDB.execute(
                `INSERT INTO Comment (blog_id, name, email, phone, comment, status, reply, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    blog_id,
                    comment.name,
                    comment.email,
                    comment.phone || null,
                    comment.comment,
                    comment.status === 1,
                    comment.reply || null,
                    createdDate
                ]
            );
        }

        console.log('Comment data transfer completed successfully.');

        await sourceDB.end();
        await destinationDB.end();
    } catch (error) {
        console.error('Error transferring data:', error);
    }
}

transferComments();

const isValidDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate);
};
