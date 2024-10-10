import { Request, Response } from 'express';
import pool from '../configuracao/bancoDeDados';

export const listarInscricoesPorAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [inscricoes] = await pool.query('SELECT * FROM Enrollments WHERE student_id = ?', [id]);
        res.render('inscricoes/listaPorAluno', { inscricoes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const listarInscricoesPorCurso = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [inscricoes] = await pool.query('SELECT * FROM Enrollments WHERE course_id = ?', [id]);
        res.render('inscricoes/listaPorCurso', { inscricoes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const criarInscricao = async (req: Request, res: Response) => {
    const { student_id, course_id } = req.body;
    try {
        await pool.query('INSERT INTO Enrollments (student_id, course_id) VALUES (?, ?)', [student_id, course_id]);
        res.redirect('/inscricoes');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
