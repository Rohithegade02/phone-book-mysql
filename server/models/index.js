import db from "../config.js"

const Table = {
    createTable: async () => {
        const ContactTable =
       ` CREATE TABLE if not exists contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            nickname VARCHAR(255),
            address VARCHAR(500),
            photo VARCHAR(255)
          )`
          
        const ContactPhoneTable =
            `
            CREATE TABLE if not exists phone_numbers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                contact_id INT,
                phone_number VARCHAR(255),
                FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);
        `
          
        try {
            db.query(ContactTable)
            db.query(ContactPhoneTable)
            
        } catch (err) {
            console.log(err)
        }
    }
}

export default Table;