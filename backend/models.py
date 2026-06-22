from pydantic import BaseModel
from typing import Optional

class Listing(BaseModel):
    title: str
    price: float
    description: Optional[str] = None
