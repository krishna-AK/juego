from config import*
from pymongo import MongoClient
from redis import Redis
from datetime import datetime as dt
import time,random


r = Redis(host=REDIS_HOST,port=REDIS_PORT,password=REDIS_PASSWORD,decode_responses=True)
def get_db():
    client = MongoClient(DB_URL)
    print('connected to database')
    db = client[DB_NAME]
    return db

# if __name__ == '__main__':
db = get_db()
i = MAX_ITEMS
while True:
    i-=1
    # creating new item
    r.set('GAME_TIMER', 'wait')
    #print('creating new item')
    CURRENT_ITEM_ID = str(db.stats.find_one({'id':0})['total_items']+1)

    new_item = {'item_id': CURRENT_ITEM_ID,
             'created_time': str(int(dt.timestamp(dt.utcnow()))),
             'availability': 'expired',
             'result': -1}


    #print('updating stats')
    db.stats.update_one({'id': 0}, {'$inc': {'total_items': 1}})


    # Allowing users to make requests in available time slot

    GAME_TIMER = GAME_TIME_SECONDS
    r.set('CURRENT_ITEM_ID', CURRENT_ITEM_ID)
    r.set('GAME_TIMER',GAME_TIMER)
    r.set('ACCESS_FLAG',"True")
    #print('starting timer')
    while GAME_TIMER > 0:
        # print("TIMER : ",GAME_TIMER)
        # print(r.get('CURRENT_ITEM_ID'))
        time.sleep(1)
        GAME_TIMER -= 1
        r.set('GAME_TIMER', GAME_TIMER)

    #print('Timer ended')
    r.set('ACCESS_FLAG',"False")
    r.set('GAME_TIMER','wait')

    # Closing item
    db.items.update_one({'item_id':CURRENT_ITEM_ID},{'$set':{'availability':'expired'}})
    #print('Item closed')

    # Calculating result
    min_val = min(USER_RESULTS)
    temp = [i for i in USER_RESULTS if i == min_val]
    # CHOSEN_NO = temp[random.randint(1,len(temp)-1)]
    CHOSEN_NO = random.randint(0,5)
    #print("array : ",USER_RESULTS)
    db.items.update_one({'item_id': CURRENT_ITEM_ID}, {'$set': {'result': CHOSEN_NO}})
    #print('Calculated result')

    # Processing all user orders
    #print('Processing all user orders')
    db['p_orders'].update_many({'item_id':CURRENT_ITEM_ID},
                                         {'$set':{'status':'delivered','result':'fail'}})
    db['p_orders'].update_many({'item_id': CURRENT_ITEM_ID, 'selected_no': CHOSEN_NO},
                                        {'$set': {'result': 'win'}})

    # rewarding winners
    all_orders = db.p_orders.find()

    for order in all_orders:
        if(order['selected_no'] == CHOSEN_NO):
            db.users.update_one({'ph_no':order['ph_no']},{'$inc':{'balance':int(6*order['amount'])}})
    all_orders.rewind()

    # Storing all orders in seperate collection
    #print('Moving all completed orders to c_orders')
    try:
        db['c_orders'].insert_many([order for order in all_orders])
    except:pass
    db['p_orders'].delete_many({})


    # updating new item
    new_item['result'] = CHOSEN_NO
    db.items.insert_one(new_item)

    #print("result : ", CHOSEN_NO)
    #print('----------------------------------------------------------------------------------------------------')

r.close()
quit()
