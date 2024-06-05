const express = require('express');
const {createExam, findAllExams, findExamById, updateExam, deleteExam} = require("../db/exam.sb");
const router = express.Router();


router.post('/post', async (req, res) => {
    try {
        console.log("Request received to create a new exam");
        console.log("Request body:", req.body);

        // Validate required fields
        const { date, id, difficulty_rating, type, subject, materials } = req.body;
        if (!date || !id || !difficulty_rating || !type || !subject || !materials) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newExam = await createExam(req.body);
        res.status(201).json(newExam);
    } catch (error) {
        console.error("Error creating new exam:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/exams', async (req, res) => {
    try {
        const exams = await findAllExams();
        res.status(200).json(exams);
    } catch (error) {
        console.error("Error fetching all exams:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/exams/:id', async (req, res) => {
    try {
        const exam = await findExamById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(exam);
    } catch (error) {
        console.error("Error fetching exam by ID:", error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/exams/:id', async (req, res) => {
    try {
        const updatedExam = await updateExam(req.params.id, req.body, { new: true });
        if (!updatedExam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(updatedExam);
    } catch (error) {
        console.error("Error updating exam:", error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/exams/:id', async (req, res) => {
    try {
        const deletedExam = await deleteExam(req.params.id);
        if (!deletedExam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json({ message: 'Exam deleted successfully' });
    } catch (error) {
        console.error("Error deleting exam:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
