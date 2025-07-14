async function searchJobs() {
    const query = document.getElementById('jobSearch').value;
    const response = await fetch(/api/jobs?search=${query});
    const jobs = await response.json();
    displayJobs(jobs);
}

function displayJobs(jobs) {
    const jobListings = document.getElementById('jobListings');
    jobListings.innerHTML = '';

    jobs.forEach(job => {
        const div = document.createElement('div');
        div.className = 'job-listing';
        div.innerHTML = <h3>$Graphic Designer</h3><p>$Wipro</p><a href="${job.link}">Apply Now</a>;
        jobListings.appendChild(div);
    });
}