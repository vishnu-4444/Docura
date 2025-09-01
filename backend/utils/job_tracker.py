jobs = {}  

def create_job(job_id):
    jobs[job_id] = {"status": "pending", "progress": 0}

def update_job(job_id, status=None, progress=None):
    if job_id not in jobs:
        return
    if status:
        jobs[job_id]["status"] = status
    if progress is not None:
        jobs[job_id]["progress"] = progress

def get_job(job_id):
    return jobs.get(job_id, {"status": "unknown", "progress": 0})