from fastapi import FastAPI
from app.routes import access, admin

app = FastAPI(title="Soulace API")

app.include_router(access.router, prefix="/access", tags=["Access"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])

@app.get("/")
def read_root():
    return {"message": "Soulace Backend is live"}
