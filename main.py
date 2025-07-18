from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from uuid import uuid4
from datetime import datetime
import sqlite3
import json

# === FASTAPI APP ===
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# === DATABASE SETUP ===
DB_NAME = "realtalk_ai.db"

def db_connection():
    return sqlite3.connect(DB_NAME)

def initialize_database():
    conn = db_connection()
    cur = conn.cursor()
    cur.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT
        );

        CREATE TABLE IF NOT EXISTS history (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            message TEXT,
            model TEXT,
            response TEXT,
            timestamp TEXT
        );

        CREATE TABLE IF NOT EXISTS analytics (
            user_id TEXT PRIMARY KEY,
            data TEXT
        );

        CREATE TABLE IF NOT EXISTS settings (
            user_id TEXT PRIMARY KEY,
            preferred_model TEXT,
            tone TEXT,
            platforms TEXT,
            creativity INTEGER
        );
    """)
    conn.commit()
    conn.close()

# Automatically initialize DB tables on app startup
@app.on_event("startup")
def startup_event():
    initialize_database()

# === MODELS ===
class SuggestRequest(BaseModel):
    message: str
    user_id: str
    model: Optional[str] = "default"

class SuggestResponse(BaseModel):
    suggestions: List[str]

class HistoryEntry(BaseModel):
    id: str
    user_id: str
    message: str
    model: str
    response: List[str]
    timestamp: str

class User(BaseModel):
    id: str
    name: str

class Settings(BaseModel):
    user_id: str
    preferred_model: str
    tone: str
    platforms: List[str]
    creativity: int

# === UTILITIES ===
def generate_suggestions(message: str, model: str) -> List[str]:
    if model == "default":
        return [f"Default response 1 to: {message}", "Default response 2", "Default response 3"]
    elif model == "phi":
        return [f"[PHI] Response 1 to: {message}", "[PHI] Response 2", "[PHI] Response 3"]
    else:
        raise HTTPException(status_code=400, detail="Unsupported model selected.")

# === ROUTES ===
@app.post("/api/suggest", response_model=SuggestResponse)
async def suggest(data: SuggestRequest):
    suggestions = generate_suggestions(data.message, data.model)
    timestamp = datetime.utcnow().isoformat()
    entry_id = str(uuid4())

    conn = db_connection()
    cur = conn.cursor()

    # Log history
    cur.execute("""
        INSERT INTO history (id, user_id, message, model, response, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (entry_id, data.user_id, data.message, data.model, json.dumps(suggestions), timestamp))

    # Update analytics
    cur.execute("SELECT data FROM analytics WHERE user_id = ?", (data.user_id,))
    row = cur.fetchone()
    if row:
        analytics = json.loads(row[0])
        analytics["total_requests"] += 1
        analytics["model_usage"][data.model] = analytics["model_usage"].get(data.model, 0) + 1
        cur.execute("UPDATE analytics SET data = ? WHERE user_id = ?", (json.dumps(analytics), data.user_id))
    else:
        new_analytics = {
            "total_requests": 1,
            "model_usage": {data.model: 1}
        }
        cur.execute("INSERT INTO analytics (user_id, data) VALUES (?, ?)", (data.user_id, json.dumps(new_analytics)))

    conn.commit()
    conn.close()

    return {"suggestions": suggestions}

@app.get("/api/history/{user_id}", response_model=List[HistoryEntry])
async def get_history(user_id: str):
    conn = db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM history WHERE user_id = ? ORDER BY timestamp DESC", (user_id,))
    rows = cur.fetchall()
    conn.close()

    return [HistoryEntry(
        id=row[0], user_id=row[1], message=row[2], model=row[3],
        response=json.loads(row[4]), timestamp=row[5]
    ) for row in rows]

@app.get("/api/analytics")
async def get_analytics():
    conn = db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM analytics")
    data = {row[0]: json.loads(row[1]) for row in cur.fetchall()}
    conn.close()
    return data

@app.post("/api/register")
async def register_user(user: User):
    conn = db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE id = ?", (user.id,))
    if cur.fetchone():
        raise HTTPException(status_code=400, detail="User already exists.")
    cur.execute("INSERT INTO users (id, name) VALUES (?, ?)", (user.id, user.name))
    conn.commit()
    conn.close()
    return {"message": "User registered", "user": user}

@app.get("/api/users", response_model=List[User])
async def get_users():
    conn = db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    users = [User(id=row[0], name=row[1]) for row in cur.fetchall()]
    conn.close()
    return users

@app.get("/api/settings/{user_id}", response_model=Settings)
async def get_user_settings(user_id: str):
    conn = db_connection()
    cur = conn.cursor()
    cur.execute("SELECT preferred_model, tone, platforms, creativity FROM settings WHERE user_id = ?", (user_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Settings not found")
    return Settings(
        user_id=user_id,
        preferred_model=row[0],
        tone=row[1],
        platforms=json.loads(row[2]),
        creativity=row[3]
    )

@app.post("/api/settings")
async def save_user_settings(settings: Settings):
    conn = db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO settings (user_id, preferred_model, tone, platforms, creativity)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
            preferred_model=excluded.preferred_model,
            tone=excluded.tone,
            platforms=excluded.platforms,
            creativity=excluded.creativity
    """, (settings.user_id, settings.preferred_model, settings.tone, json.dumps(settings.platforms), settings.creativity))
    conn.commit()
    conn.close()
    return {"message": "Settings saved"}








