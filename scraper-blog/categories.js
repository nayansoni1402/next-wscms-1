require('dotenv').config();
const mysql = require('mysql2/promise');

async function transferCategories() {
    try {
        // Create connections for source and destination databases
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

        // Fetch categories from source database
        const [categories] = await sourceDB.execute('SELECT * FROM categories');

        if (categories.length === 0) {
            console.log('No categories found to transfer.');
            return;
        }
        console.log(categories);

        console.log(`Transferring ${categories.length} categories...`);

        // Insert categories into destination database
        for (const category of categories) {
            const newData = {
                ref_id: category.id,
                title: category.categoryname,
                slug: category.permalinks,
                status: category.status === 'enable' ? 1 : 0,
                meta_title: category.meta_title,
                meta_description: category.meta_description,
                meta_keywords: category.meta_keyword,
                robots: 'Index, Follow',
                added_by: 1,
            };
            // console.log(newData)
            // return newData;
            await destinationDB.execute(
                `INSERT INTO Category (ref_id, title, slug, status, meta_title, meta_description, meta_keywords, robots,added_by) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?,?) 
                ON DUPLICATE KEY UPDATE 
                title = VALUES(title), 
                slug = VALUES(slug), 
                status = VALUES(status), 
                meta_title = VALUES(meta_title), 
                meta_description = VALUES(meta_description), 
                meta_keywords = VALUES(meta_keywords), 
                robots = VALUES(robots),
                added_by = VALUES(added_by)`,
                [newData.ref_id, newData.title, newData.slug, newData.status, newData.meta_title, newData.meta_description, newData.meta_keywords, newData.robots, newData.added_by]
            );
        }

        console.log('Category data transfer completed successfully.');

        // Close connections
        await sourceDB.end();
        await destinationDB.end();
    } catch (error) {
        console.error('Error transferring data:', error);
    }
}

transferCategories();
