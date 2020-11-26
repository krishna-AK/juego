// import all required modules
var express = require('express');
var {MongoClient} = require('mongodb')
var redis = require('redis')
var bodyParser = require('body-parser')
var cors = require('cors')                          //only on debug mode 
var jwt = require('jsonwebtoken')
var jwt_auth = require('./jwt-auth')
var bcrypt = require('bcrypt')



// CONSTANTS (should be placed in .env file in production)
var CLUSTER_PASSWORD = process.env.CLUSTER_PASSWORD;
var DB_URL = "mongodb+srv://krishnaak:"+CLUSTER_PASSWORD+"@cluster0-gtklk.mongodb.net/<dbname>?retryWrites=true&w=majority";
var DB_NAME = process.env.DB_NAME
var PORT = process.env.PORT || 5000
var REDIS_PORT = process.env.REDIS_PORT || 6379
var JWT_SECRET = process.env.JWT_SECRET
var saltrounds = 12;


// instantiate 
var r = redis.createClient(REDIS_PORT)
var app = express();

// use middleware packages
app.use(bodyParser.json())
app.use(cors())


// Global variable to hold database connaction
var db = null 

// connect to mongodb database
MongoClient.connect(DB_URL,{ useUnifiedTopology: true }, function(err, client) {
    if(err) { console.error(err) }
    db = client.db(DB_NAME)
    console.log('connected to db')
});

//  called before every request
app.use(function (req, res, next) {
    // Check for redis access flag

    //console.log('Time:', Date.now())
    next()
    // terminate all requests using res.end() if needed
  })

  app.use('/', express.static('dist'));
// write function to call after every request here  


// handle requests from now

// This route should be removed in production 
app.get('/allusers', function(req, res){
    db.collection('users').find({}).toArray(function(err,docs){
        if(err){res.status(500).json({'msg':'server error'});return}
        res.json({'users':docs});
    })

});

app.post('/api/register',async (req,res)=>{
    // end point checks
    starting_balance = 100000
    ph_no = req.body.ph_no
    password = req.body.password
    nickname = req.body.nick_name
    
    try{
        // check if ph_no already exists in database
        udoc = await db.collection('users').findOne({'ph_no':ph_no})
        if(udoc){res.status(400).json({'msg':'phone number already exists'});return}
        // send a otp (in production mode)
        
        // accepting all users for now
        phash = bcrypt.hashSync(password,saltrounds)
        await db.collection('users').insertOne({'ph_no':ph_no,'nick_name':nickname,'password':phash,'created_time': parseInt((Date.now()/1000)).toString(),'balance':starting_balance})
    }catch{
        res.status(500).json({'msg':'server error'});return
    }
    res.status(200).json({'msg':'registration successful for now'})

})
app.post('/api/login',async function(req,res){
    // do end-point checks
    ph_no = req.body.ph_no
    password = req.body.password
    err_msg = "wrong ph_no/password combination"
    try{
        doc = await db.collection('users').findOne({'ph_no':ph_no})
        if(!doc){res.status(400).json({'msg':err_msg});return}
        // implement hashed passwords
        if(bcrypt.compareSync(password,doc.password) === true){
            nickname = doc.nick_name
            access_token = jwt.sign({'ph_no':req.body.ph_no},JWT_SECRET,{expiresIn:'1d'}) //usimg expiration time og 1day
            res.status(200).json({'access_token':access_token,'ph_no':ph_no,'nickname':nickname,'msg':'Logged in as '+nickname})
            return
        }else{
            res.status(400).json({'msg':err_msg})
            return
        }
    }catch{
        res.status(500).json({'msg':'server error'});return
    }
})

app.get('/api/balance',jwt_auth,function(req,res){
    // jwt implementation
    err_msg = "user not found"
    ph_no = req.verified_ph_no
    balance = db.collection('users').findOne({'ph_no':ph_no},function(err,doc){
        if(err){res.status(500).json({'msg':'server error'});return}
        if(doc === null){res.status(400).json({'msg':err_msg});return}
        res.status(200).json({'balance':doc.balance})
    })
})

app.post('/api/recharge',jwt_auth,function(req,res){
    // endpoint checks
    // make this more secure
    // implement payment checks using gateways
    res.end()
})

app.post('/api/order',jwt_auth,function(req,res){
    // do endpoint checks
    // get user from token (JWT implementation goes here)
    ph_no = req.verified_ph_no
    order_amt = req.body.amount
    
    db.collection('users').findOne({'ph_no':ph_no},function(err,doc){
        if(err){res.status(500).json({'msg':'server error'});return}
        // check for funds in the account
        if (doc.balance < order_amt){res.status(400).json({'msg':'not enough funds'});return}
        
        item_id = req.body.item_id
        // get item from redis
        r.get('CURRENT_ITEM_ID',function(err,target_item){
            if(err){res.status(500).json({'msg':'server error'});return} 
             // find if item is still available
            if(target_item === null){res.status(400).json({'msg':"item does not exist"})}
            db.collection('stats').findOne({"id": 0},function(err,doc_stats){
                if(target_item === item_id){
                    // accepting the order and inserting in pending orders
                    db.collection('p_orders').insertOne({ 'item_id': item_id,'ph_no': ph_no, 'created_time': parseInt((Date.now()/1000)).toString(), 'amount': order_amt,'status': 'pending','result': 'wait','selected_no': req.body.selected_no, 'order_id': (doc_stats.orders_placed+1).toString()},function(err){
                            if(err){res.status(500).json({'msg':'server error'});return}
                            // increment the total orders in db by 1
                            db.collection('stats').updateOne({'id':0},{$inc:{'orders_placed':1}},function(err){
                                // Deducting amount from user
                                db.collection('users').updateOne({'ph_no':ph_no},{$inc:{'balance':-order_amt}},function(err){
                                    if(err){res.status(500).json({'msg':'server error'});return}
                                    res.status(200).json({'msg':'order placed'})
                                })
                            })
                        })
                    }
                else{
                    // if target_item is none then order is expired
                     res.status(400).json({'msg':'order item expired'})
                 }
            })
        })
    })
                      
})

app.get('/api/itemid',jwt_auth,function(req,res){
    // jwt implementation
    r.get('CURRENT_ITEM_ID',function(err,item_id){
        if(err){res.status(500).json({'msg':'server error'})}
        res.status(200).json({'item_id':item_id})
    })
})

app.get('/api/timer',jwt_auth,function(req,res){
    // JWT implementation goes here
    r.get('GAME_TIMER',function(err,timer){
        if(err){res.status(500).json({'msg':'server error'})}
        res.status(200).json({'timer':timer,'timestamp':parseInt((Date.now()/1000)).toString()})
    })
})

app.get('/api/history',jwt_auth,function(req,res){
    // check jwt authorization
    var hsize = 10
    db.collection('items').find({}).sort({'_id':-1}).limit(hsize).toArray(function(err,docs){
        if(err){res.status(500).json({'msg':'server error'})}
        res.status(200).json({'history':docs})
    })
})

// implementation without async/await
// app.get('/api/appdata',jwt_auth,function(req,res){
//     // jwt authorization
//     current_user = req.verified_user
//     var hsize = 10          // max history items size
//     var osize = 10          // max user order history size
//     db.collection('users').findOne({'username':current_user},function(err,udoc){
//         if(err){res.status(500).json({'msg':'server error'})}
//         // get balance
//         balance = udoc.balance
//         db.collection('bet_orders').find({'username':current_user}).sort({'_id':-1}).limit(osize).toArray(function(err,odocs){
//             if(err){res.status(500).json({'msg':'server error'})}
//             db.collection('p_orders').find({'username':current_user}).sort({'_id':-1}).toArray(function(err,pdocs){
//                 if(err){res.status(500).json({'msg':'server error'})}
//                 // conctenate pending orders and processed orders
//                 all_orders = pdocs.concat(odocs)
//                 db.collection('bet_items').find({}).sort({'_id':-1}).limit(hsize).toArray(function(err,hdocs){
//                     if(err){res.status(500).json({'msg':'server error'})}
//                     // get game-time form redis
//                     r.get('GAME_TIMER',function(err,timer){
//                         if(err){res.status(500).json({'msg':'server error'})}
//                         // get current_item_id form redis
//                             r.get('CURRENT_BET_ID',function(err,item_id){
//                                 if(err){res.status(500).json({'msg':'server error'})}
//                                 res.status(200).json({
//                                     "balance":balance,
//                                     "my_orders":all_orders,
//                                     "history":hdocs,
//                                     "current_item":item_id,
//                                     "timer":timer
//                                 })
//                             })
//                     })
//                 })

//             })
//         })
//     })

// })

app.get('/api/appdata',jwt_auth,async function(req,res){
    // jwt authorization
    ph_no = req.verified_ph_no
    var hsize = 15         // max history items size
    var osize = 10          // max user order history size
    try{
        udoc = await db.collection('users').findOne({'ph_no':ph_no})
        // get balance
        balance = udoc.balance
        // get all completed orders
        c_orders = await db.collection('c_orders').find({'ph_no':ph_no}).sort({'_id':-1}).limit(osize).toArray()
        // get all pending orders
        p_orders = await db.collection('p_orders').find({'ph_no':ph_no}).sort({'_id':-1}).toArray()
        // append all the orders
        all_orders = p_orders.concat(c_orders)
        // get items history
        history = await db.collection('items').find({}).sort({'_id':-1}).limit(hsize).toArray()
        // get timer and current id from redis(await can be used with async-redis)
        r.get('CURRENT_ITEM_ID',(err,item_id)=>{
            r.get('GAME_TIMER',(err,timer)=>{
                res.status(200).json({
                    "balance":balance,
                    "my_orders":all_orders,
                    "history":history,
                    "current_item":item_id,
                    "timer":timer,
                    'timestamp':parseInt((Date.now()/1000)).toString()
                })
            })
        })
    }catch{
        //  if any error occurs say server error
        res.status(500).json({'msg':'server error'})
        return
    }
       
})


app.get('/api/myorders',jwt_auth,async (req,res)=>{
    // jwt implementation
    ph_no = req.verified_ph_no
    var osize = 0  //zero means all orders
    try{
        // must return all pending orders
        p_orders = await db.collection('p_orders').find({'ph_no':ph_no}).sort({'_id':-1}).toArray()
        c_orders = await db.collection('c_orders').find({'ph_no':ph_no}).sort({'_id':-1}).limit(osize).toArray()
        all_orders = p_orders.concat(orders)
    }catch{
        res.status(500).json({'msg':'server error'})
        return
    }
    
    res.status(200).json({'my_orders':all_orders})
    
})

app.listen(PORT,'localhost',()=>{
    console.log('Server Started listening at port : '+PORT)
});



