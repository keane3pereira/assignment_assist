from product import controllers
from fastapi import APIRouter
from product import schemas


router = APIRouter()

@router.get("/", summary = "Retrieves all products")
async def get_products(product_name: str | None = None):
    if product_name:    res = await controllers.get_product(product_name)
    else:               res = await controllers.get_all_products()
    return res

@router.post("/new", summary = "Insert product")
async def insert_product(product: schemas.NewProduct):
    res = await controllers.insert_product(product)
    return res

@router.post("/update", summary = "Update product")
async def update_product(product: schemas.Product):
    res = await controllers.update_product(product)
    return res
   