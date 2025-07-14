const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const jobs = [
    { title: 'Frontend Developer', company: 'Tech Co', link: 'http://example.com/job1' },
    { title: 'Backend Developer', company: 'Web Solutions', link: 'http://example.com/job2' },
    { title: 'UX Designer', company: 'Creative Inc', link: 'http://example.com/job3' }
];

app.get('/api/jobs', (req, res) => {
    const search = req.query.search.toLowerCase();
    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(search) || 
        job.company.toLowerCase().includes(search)
    );
    res.json(filteredJobs);
});

app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});