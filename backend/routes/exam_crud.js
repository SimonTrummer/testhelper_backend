const express = require('express');
const ExamDB = require("../db/exam.model.db");
const router = express.Router();

router.post('/post', async (req, res) => {
    try {
        console.log("HEllo")
        const newExam = await ExamDB.create(req.body);
        res.status(201).json(newExam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/exams', async (req, res) => {
    try {
        const exams = await ExamDB.findAll();
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/exams/:id', async (req, res) => {
    try {
        const exam = await ExamDB.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/exams/:id', async (req, res) => {
    try {
        const updatedExam = await ExamDB.update(req.params.id, req.body, { new: true });
        if (!updatedExam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(updatedExam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/exams/:id', async (req, res) => {
    try {
        const deletedExam = await ExamDB.delete(req.params.id);
        if (!deletedExam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json({ message: 'Exam deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
