import { Request, Response } from 'express';

import pool from '../database';

class SeriesController {
    public async getList(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const series = await pool.query('SELECT * FROM series WHERE userID = ? ORDER BY createdAt DESC', [id]);
        if (!series.length) {
            res.status(404).json({ data: "no series found" });
        }
        res.send(series);
    }

    public async getByFilter(req: Request, res: Response): Promise<any> {
        const { id, filter } = req.params;
        var sql = `SELECT * FROM series WHERE seriesTitle LIKE "%${filter}%" AND userID = ?`;
        const series = await pool.query(sql, [id]);
        if (series.length > 0) {
            res.send(series);
        }
        else res.status(404).json({ text: "The series doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO series set ?',
            [req.body]);
        res.send(result);
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldSeries = req.body;
        const newSeries = await pool.query('UPDATE series set ? WHERE seriesId = ?',
            [req.body, id]);
        res.json(newSeries);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM series WHERE seriesId = ?', [id]);
        res.json({ message: "The series was deleted" });
    }
}

const seriesController = new SeriesController;
export default seriesController;