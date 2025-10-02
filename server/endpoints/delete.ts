import { Router } from 'express';
import pool from '../db/init';

const router = Router();

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted', task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
