from PyPDF2 import PdfReader

def extract_text(file_path):
    reader = PdfReader(file_path)
    text = ''
    for page in reader.pages:  # remove the parentheses
        text += page.extract_text() + "\n"
    return text
