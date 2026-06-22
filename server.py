from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
import os

app = FastAPI()

# الاتصال بقاعدة البيانات
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(os.environ["MONGO_URL"])
    app.database = app.mongodb_client[os.environ["DB_NAME"]]

@app.get("/")
async def root():
    return {"message": "API is running successfully"}
