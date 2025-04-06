// this file has been added to ad the review section on the car details page. 
// week 13


const pool = require("../database/");

async function addReview(review_text, inv_id, account_id) {
  const sql = `
    INSERT INTO review (review_text, inv_id, account_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const data = await pool.query(sql, [review_text, inv_id, account_id]);
  return data.rows[0];
}

async function getReviewsByInvId(inv_id) {
    try {
      const result = await pool.query(
        `SELECT r.*, a.account_firstname, a.account_lastname
         FROM review r
         JOIN account a ON r.account_id = a.account_id
         WHERE r.inv_id = $1
         ORDER BY r.review_date DESC`,
        [inv_id]
      );
      return result.rows;
    } catch (error) {
      throw new Error("Error getting reviews: " + error.message);
    }
  }

async function getReviewsByInventoryId(inv_id) {
  const sql = `
    SELECT r.review_id, r.review_text, r.review_date, a.account_firstname, a.account_lastname
    FROM review r
    JOIN account a ON r.account_id = a.account_id
    WHERE r.inv_id = $1
    ORDER BY r.review_date DESC;
  `;
  const data = await pool.query(sql, [inv_id]);
  return data.rows;
}

async function getReviewsByAccountId(account_id) {
  const sql = `
    SELECT r.*, i.inv_make, i.inv_model
    FROM review r
    JOIN inventory i ON r.inv_id = i.inv_id
    WHERE r.account_id = $1;
  `;
  const data = await pool.query(sql, [account_id]);
  return data.rows;
}

async function getReviewById(review_id) {
  const sql = `SELECT * FROM review WHERE review_id = $1;`;
  const data = await pool.query(sql, [review_id]);
  return data.rows[0];
}

async function updateReview(review_id, review_text) {
  const sql = `
    UPDATE review SET review_text = $1, review_date = CURRENT_TIMESTAMP
    WHERE review_id = $2;
  `;
  return await pool.query(sql, [review_text, review_id]);
}

async function deleteReview(review_id) {
  const sql = `DELETE FROM review WHERE review_id = $1;`;
  return await pool.query(sql, [review_id]);
}

module.exports = {
  addReview,
  getReviewsByInvId,
  getReviewsByInventoryId,
  getReviewsByAccountId,
  getReviewById,
  updateReview,
  deleteReview,
};