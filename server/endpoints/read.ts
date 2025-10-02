import { Router } from 'express';
import pool from '../db/init';

const router = Router();

const mapTask = (row: any) => ({
  id: row.id,
  title: row.title,
  description: row.description,
  status: row.status,
  dueDate: row.due_date,
});

router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM tasks ORDER BY id ASC`);
    res.json(result.rows.map(mapTask));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(mapTask(result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

export default router;
