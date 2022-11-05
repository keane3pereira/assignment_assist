from product.models import Product
from db import SessionLocal


db = SessionLocal()


async def get_all_products():
    res = db.query(Product).all()
    return res


async def get_product(product_name):
    res = db.query(Product).filter(
        Product.product_name.like(f"%{product_name}%")
    ).all()
    return res


async def insert_product(product):
    product = Product(**product.__dict__)
    
    try:
        db.add(product)
        db.commit()
        return True
    
    except Exception as e:
        db.rollback()
        return False


async def update_product(product):
    db.query(Product).filter(
        Product.id == product.id
    ).update(product.__dict__)

    try:
        db.commit()
        return True

    except Exception as e:
        db.rollback()
        return False