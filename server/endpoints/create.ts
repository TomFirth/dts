import { Router } from 'express';
import pool from '../db/init';

const router = Router();

router.post('/', async (req, res) => {
  const { title, description, status, due_date } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, due_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, status || 'pending', due_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

export default router;
