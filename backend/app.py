from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import os, uuid
from utils.pdf_reader import extract_text
from utils.text_split import split_text
from utils.vector_store import store_chunks
from utils.job_tracker import create_job, update_job, get_job

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("upload", exist_ok=True)

@app.post("/upload")
async def upload_file(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    file_location = f"upload/{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())

    job_id = str(uuid.uuid4())
    create_job(job_id)

    background_tasks.add_task(process_pdf_task, file_location, job_id)

    return {"job_id": job_id, "message": "File uploaded, processing started"}

def process_pdf_task(file_path, job_id):
    try:
        update_job(job_id, status="processing", progress=10)

        text = extract_text(file_path)
        update_job(job_id, progress=40)

        chunks = split_text(text)
        update_job(job_id, progress=70)

        store_chunks(chunks)
        update_job(job_id, progress=100, status="done")

    except Exception as e:
        update_job(job_id, status="failed", progress=0, error=str(e))
        print(f"Error processing PDF {file_path}: {e}")


@app.get("/status/{job_id}")
async def status(job_id: str):
    return get_job(job_id)
