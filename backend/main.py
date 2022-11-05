from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from product.routes import router
from fastapi import FastAPI
import uvicorn


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["127.0.0.1", "*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(router, tags=["Products"], prefix = "/products")

@app.get("/", include_in_schema = False)
async def home_to_doc():
    return RedirectResponse("/docs")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host = "127.0.0.1",
        port = 8000,
        reload = True
    )