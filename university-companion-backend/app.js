const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Sk@630388",
    database: "university_db"
});

con.connect().then(()=> console.log("Connected"));


// Create a new course
app.post('/api/courses', async (req, res) => {
    const { course_name, professor, start_date, end_date } = req.body;
    try {
      const result = await con.query(
        'INSERT INTO courses (course_name, professor, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
        [course_name, professor, start_date, end_date]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.log(error);
    }
});

// Get all courses
app.get('/api/courses', async (req, res) => {
    try {
      const result = await con.query('SELECT * FROM courses');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
});

// Update a course
app.put('/api/courses/:id', async (req, res) => {
    const { id } = req.params;
    const { course_name, professor, start_date, end_date } = req.body;
    try {
      const result = await con.query(
        'UPDATE courses SET course_name = $1, professor = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *',
        [course_name, professor, start_date, end_date, id]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
});

// Delete a course
app.delete('/api/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await con.query('DELETE FROM courses WHERE id = $1', [id]);
      res.status(200).json({ message: 'Course deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
});


//Handling the Assignments crud operations

app.post('/api/assignments', async (req, res) => {
    const { course_id, title, due_date, status } = req.body;
    try {
      const result = await con.query(
        'INSERT INTO assignments (course_id, title, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [course_id, title, due_date, status]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/assignments/:course_id', async (req, res) => {
    const { course_id } = req.params;
    try {
      const result = await con.query('SELECT * FROM assignments WHERE course_id = $1', [course_id]);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
});


// Update an assignment
app.put('/api/assignments/:id', async (req, res) => {
    const { id } = req.params;
    const { title, due_date, status } = req.body;
    try {
      const result = await con.query(
        'UPDATE assignments SET title = $1, due_date = $2, status = $3 WHERE id = $4 RETURNING *',
        [title, due_date, status, id]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
});

// Delete an assignment
app.delete('/api/assignments/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await con.query('DELETE FROM assignments WHERE id = $1', [id]);
      res.status(200).json({ message: 'Assignment deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
});

app.listen(3000, () => {
    console.log("Server");
});

