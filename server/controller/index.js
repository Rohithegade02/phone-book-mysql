import db from "../config.js";

//add contact controller
export const addContact = async (req, res) => {
      console.log(req.body)
    const { firstname, lastname, nickname, address } = req.body;
      const photo = req.file ? req.file.filename : null;
      const phonenumbers = JSON.parse(req.body.phonenumbers);
  
    try {
      if (!firstname || !lastname || !phonenumbers || phonenumbers.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields and at least one phone number."
        });
      }


      const query1 = `INSERT INTO contacts (first_name, last_name, nickname, address, photo) VALUES (?, ?, ?, ?, ?)`;
      db.query(query1, [firstname, lastname, nickname, address, photo], (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }
  
        const contactId = data.insertId;
  
        // Insert into phone_numbers table
        const phoneNumbersQuery = 'INSERT INTO phone_numbers (contact_id, phone_number) VALUES ?';
        const phoneNumbersParams = phonenumbers.map(number => [contactId, number]);
  
        db.query(phoneNumbersQuery, [phoneNumbersParams], (err, data) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message
            });
          }
  
          res.status(201).json({
            success: true,
            message: "Contact added successfully."
          });
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error."
      });
    }
  };
  
  
  
//get details controller
  export const getContact = async (req, res) => {
    try {
      const query = `
      SELECT 
          c.id,
          c.first_name,
          c.last_name,
          c.nickname,
          c.address,
          c.photo,
          COALESCE(c.nickname, CONCAT(c.first_name, ' ', c.last_name)) AS name,
          JSON_ARRAYAGG(JSON_OBJECT('id', p.id, 'phone_number', p.phone_number)) AS phonenumbers
      FROM 
          contacts c
      LEFT JOIN 
          phone_numbers p
      ON 
          c.id = p.contact_id
      GROUP BY 
          c.id
      LIMIT 5;
  `;
        
        db.query(query, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            const result = data.map(contact => ({
                ...contact,
                photo: contact.photo ? `http://localhost:4000/uploads/${contact.photo}` : null,
                phonenumbers: JSON.parse(contact.phonenumbers) // Parse the JSON array of phone numbers
            }));

            res.status(200).json({
                success: true,
                result
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};


//delete contact controller
export const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        const query1 = `DELETE From contacts where id=?`
        db.query(query1,[id],  (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message:err
                })
            }
            res.status(200).json({
                success: true,
                data
            })
        })
    } catch (err) {
        console.log(err)
    }
}

//upadate contact controller
export const updateContact = async (req, res) => {
  const { id } = req.params; 
  const { firstname, lastname, nickname, address, phonenumbers } = req.body;

  try {
    const updateFields = []; 
    const queryParams = [];

    if (firstname) {
      updateFields.push('first_name = ?');
      queryParams.push(firstname);
    }
    if (lastname) {
      updateFields.push('last_name = ?');
      queryParams.push(lastname);
    }
    if (nickname) {
      updateFields.push('nickname = ?');
      queryParams.push(nickname);
    }
    if (address) {
      updateFields.push('address = ?');
      queryParams.push(address);
    }

    // Update contacts table
    let query = `UPDATE contacts SET ${updateFields.join(', ')} WHERE id = ?`;
    queryParams.push(id);

    // Execute the main contact update query
    db.query(query, queryParams, async (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      // Update phone_numbers table if phonenumbers array is provided
      if (phonenumbers && phonenumbers?.length > 0) {
        console.log('first')
        try {
          const promises = phonenumbers.map((number) => {
            const query2 = 'UPDATE phone_numbers SET phone_number = ? WHERE id = ? AND contact_id = ?';
            return new Promise((resolve, reject) => {
              db.query(query2, [number.phone_number, number.id, id], (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(data);
                }
              });
            });
          });

          await Promise.all(promises);

          res.status(200).json({
            success: true,
            message: "Updated Successfully"
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: "Failed to update phone numbers"
          });
        }
      } else {
        // No phonenumbers to update
        res.status(200).json({
          success: true,
          message: "Updated Successfully"
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error."
    });
  }
};


