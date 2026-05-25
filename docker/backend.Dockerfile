# Lightweight Python image for Flask API
FROM python:3.12-slim

WORKDIR /app

# Install dependencies first (better layer caching)
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

# SQLite file lives here; mount a volume in production for persistence
ENV DATABASE_PATH=/app/database.db
ENV PORT=5000

EXPOSE 5000

CMD ["python", "app.py"]
