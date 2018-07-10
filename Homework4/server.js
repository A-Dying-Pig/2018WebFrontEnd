const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koabody = require('koa-body');
app.use(koabody({multipart: true}));
const token = '1234567890';

router.get('/api/compute',async (ctx,next)=>{
    if(ctx.header['hw-token'] !== token){
        ctx.status = 403;
        return;
    }
    const params = ctx.query;
    const [param1,param2] = [parseInt(params.firstParam),parseInt(params.secondParam)];
    switch(params.type){
        case 'ADD':
            ctx.body = {ans: param1+param2};
            break;
        case 'SUB':
            ctx.body = {ans: param1-param2};
            break;
        case 'MUL':
            ctx.body = {ans: param1*param2};
            break;
        case 'DIV':
            ctx.body = {ans: Math.round(param1/param2)};
            break;
        default:
            break;
    }
    ctx.response.type = 'application/json';
});

let pairs = [];
router.post('/api/pair',async (ctx,next)=>{
    if(ctx.header['hw-token'] !== token){
        ctx.status = 403;
        return;
    }
    const _pair = ctx.request.body;
    let i = 0;
    for(; i < pairs.length; i++){
        if(pairs[i].key === _pair.key){
            pairs[i].value = _pair.value;
            break;
        }
    }
    if(i === pairs.length) {
        pairs.push(_pair);
    }
    ctx.status = 200;
});

router.get('/api/pair',async (ctx,next)=>{
    if(ctx.header['hw-token'] !== token){
        ctx.status = 403;
        return;
    }
    ctx.response.type = 'application/json';
    const ky = ctx.query;
    let  i = 0;
    for (; i < pairs.length; i++){
        if(pairs[i].key === ky.key){
            ctx.body = {value: pairs[i].value};
            break;
        }
    }
    if(i === pairs.length)
        ctx.status = 404;
});

router.del('/api/pair',async (ctx,next)=>{
    if(ctx.header['hw-token'] !== token){
        ctx.status = 403;
        return;
    }
    const ky = ctx.request.query;
    let i = 0;
    const arr_len = pairs.length;
    for (; i < arr_len; i++){
        if(pairs[i].key === ky.key){
            pairs.splice(i,1);
            break;
        }
    }
    if(i === arr_len){
        ctx.status = 404;
    }
    else
        ctx.status = 200;
});


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(12306);