from pydantic import BaseModel, Field

class NewProduct(BaseModel):
    product_name: str = Field()
    price: float = Field()
    quantity: int = Field()
    
    class Config: orm_mode = True
    
class Product(NewProduct):
    id: int = Field()