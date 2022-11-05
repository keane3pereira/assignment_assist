from sqlalchemy import Integer, Column, String, Float
from db import Base, engine


class Product(Base):
    
    __tablename__ = "product"
    
    id = Column(Integer, primary_key = True)
    product_name = Column(String, unique = True)
    price = Column(Float(2))
    quantity = Column(Integer)

Base.metadata.create_all(engine)