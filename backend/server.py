from fastapi import FastAPI
from database import db
from models import Listing
import os

app = FastAPI()

@app.on_event("startup")
async def startup_db():
    await db.connect()

@app.post("/api/listings")
async def create_listing(listing: Listing):
    result = await db.db.listings.insert_one(listing.dict())
    return {"id": str(result.inserted_id)}

@app.get("/api/listings")
async def get_listings():
    cursor = db.db.listings.find({})
    listings = await cursor.to_list(length=100)
    for l in listings:
        l["_id"] = str(l["_id"])
    return listings
