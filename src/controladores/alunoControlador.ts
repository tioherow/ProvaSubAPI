import { Request, Response } from 'express';
import pool from '../configuracao/bancoDeDados';
import { Aluno } from '../modelos/alunoModelo';

export const listarAlunos = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Students') as [Aluno[], any];
        res.render('alunos/lista', { alunos: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const criarAluno = async (req: Request, res: Response) => {
    const { nome, idade, email } = req.body; 
    try {
        await pool.query('INSERT INTO Students (name, age, email) VALUES (?, ?, ?)', [nome, idade, email]);
        res.redirect('/alunos');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const excluirAluno = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Verifica se o aluno está inscrito em algum curso
        const [inscricoes] = await pool.query('SELECT * FROM Enrollments WHERE student_id = ?', [id]);
        
        if (Array.isArray(inscricoes) && inscricoes.length > 0) {
            return res.status(400).render('erro', { message: 'Não é possível excluir aluno com inscrições ativas' });
        }

        await pool.query('DELETE FROM Students WHERE student_id = ?', [id]);
        res.redirect('/alunos');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
