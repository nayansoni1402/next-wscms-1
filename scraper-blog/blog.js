require('dotenv').config();
const mysql = require('mysql2/promise');

async function transferBlogs() {
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

        // Fetch blogs from source database
        const [existingBlogRows] = await destinationDB.execute('SELECT ref_id FROM Blog');
        const existingBlogIds = existingBlogRows.map(row => row.ref_id);

        const query = `SELECT * FROM blogs WHERE id NOT IN (?)`;
        const [blogs] = await sourceDB.execute(query, [existingBlogIds]);

        if (blogs.length === 0) {
            console.log('No blogs found to transfer.');
            return;
        }

        console.log(`Transferring ${blogs.length} blogs...`);

        // Insert blogs into destination database
        for (const blog of blogs) {
            const randomAuthorId = Math.floor(Math.random() * 5) + 1;
            const [catId] = await destinationDB.execute(`SELECT * FROM Category where ref_id = ${blog.category_id.split(',')[0]}`);
            if (catId.length === 0) {
                console.log(`Category not found for blog ID: ${blog.id}, skipping...`);
                continue;
            }

            const category_id_org = catId[0].id;
            const publishDate = (blog.publish_date === '0000-00-00 00:00:00' || !isValidDate(blog.publish_date)) ? null : new Date(blog.publish_date);
            const newData = {
                ref_id: blog.id,
                author_id: randomAuthorId,
                title: blog.txttitle,
                meta_title: blog.txtheading,
                meta_description: blog.meta_description,
                short_content: blog.short_content,
                status: blog.status === 'active' ? 1 : 0,
                slug: blog.permalinks,
                view: blog.view,
                robots: 'Index, Follow',
                publish_date: publishDate,
                added_by: 1,
                category_id: category_id_org,
                image_alt: blog.image_alt,
                image: blog.img,
                description_old: blog.spaw1
            };


            await destinationDB.execute(
                `INSERT INTO Blog (ref_id, author_id, title, meta_title, meta_description, short_content, status, slug, view, robots, publish_date, added_by, category_id, image_alt, image,description_old) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?) 
                ON DUPLICATE KEY UPDATE 
                author_id = VALUES(author_id), 
                title = VALUES(title), 
                meta_title = VALUES(meta_title), 
                meta_description = VALUES(meta_description), 
                short_content = VALUES(short_content), 
                status = VALUES(status), 
                slug = VALUES(slug), 
                view = VALUES(view), 
                robots = VALUES(robots), 
                publish_date = VALUES(publish_date), 
                added_by = VALUES(added_by), 
                category_id = VALUES(category_id), 
                image_alt = VALUES(image_alt),
                image = VALUES(image),
                description_old = VALUES(description_old)
                `,
                [
                    newData.ref_id,
                    newData.author_id,
                    newData.title,
                    newData.meta_title,
                    newData.meta_description,
                    newData.short_content,
                    newData.status,
                    newData.slug,
                    newData.view,
                    newData.robots,
                    newData.publish_date,
                    newData.added_by,
                    newData.category_id,
                    newData.image_alt,
                    newData.image,
                    newData.description_old
                ]
            );
        }

        console.log('Blog data transfer completed successfully.');

        // Close connections
        await sourceDB.end();
        await destinationDB.end();
    } catch (error) {
        console.error('Error transferring data:', error);
    }
}

transferBlogs();

const isValidDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate);
};