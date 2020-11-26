from urllib import parse

JWT_SECRET_KEY = 'jwtshouldonlybeusedwithhttps'
CLUSTER_PASSWORD = parse.quote_plus("ilovekitties")
DB_URL = "mongodb+srv://krishnaak:%s@cluster0-gtklk.mongodb.net/<dbname>?retryWrites=true&w=majority"%(CLUSTER_PASSWORD)
DB_NAME = 'juego'
GAME_TIME_SECONDS = 60
CURRENT_BET_ID = None
USER_RESULTS = [0, 0, 0, 0, 0, 0]
CHOSEN_NO = None
DEBUG = False
THREADED = True
REDIS_HOST = "localhost"
REDIS_PORT = 6379
REDIS_PASSWORD = ""
MAX_ITEMS = 100;
