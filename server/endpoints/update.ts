import { Router } from 'express';
import pool from '../db/init';

const router = Router();

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
        description = $2,
        status = $3,
        due_date = $4
       WHERE id = $5
       RETURNING *`,
      [title, description, status, dueDate, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = {
      ...result.rows[0],
      dueDate: result.rows[0].due_date,
    };
    delete updatedTask.due_date;

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

export default router;
