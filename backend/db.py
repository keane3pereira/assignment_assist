from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine
import env


engine = create_engine(env.SQL_URI, echo = False)

SessionLocal = sessionmaker(
    autocommit = False,
    autoflush = False,
    bind = engine
)

Base = declarative_base()