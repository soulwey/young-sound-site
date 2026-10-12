'use strict';
const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
const WEB_ORIGIN = 'https://young-sound-site.onrender.com';
const configured = () => Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');
  if (req.path.startsWith('/api/')) {
    const origin = req.headers.origin;
    if (origin === WEB_ORIGIN) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods','POST, GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers','Content-Type');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(origin === WEB_ORIGIN ? 204 : 403);
    if (origin && origin !== WEB_ORIGIN) return res.status(403).json({ok:false,error:'Недопустимый источник запроса'});
  }
  next();
});
app.get('/health', (_req,res)=>res.json({ok:true,service:'young-sound-upload'}));
app.get('/api/status', (_req,res)=>res.json({ok:true,configured:configured(),maxAudioMb:45,maxCoverMb:10}));

const limiter = rateLimit({windowMs:60*60*1000,limit:5,standardHeaders:'draft-7',legacyHeaders:false,
  message:{ok:false,error:'Слишком много отправок. Подождите час или напишите менеджеру в Telegram.'}});
const upload = multer({
 storage:multer.memoryStorage(),
 limits:{fileSize:45*1024*1024,files:2,fields:25,fieldSize:6000,parts:30},
 fileFilter:(_req,file,cb)=>{
   const ext = path.extname(file.originalname).toLowerCase();
   if(file.fieldname === 'track' && ['.wav','.mp3','.flac','.aif','.aiff','.m4a','.ogg'].includes(ext)) return cb(null,true);
   if(file.fieldname === 'cover' && ['.jpg','.jpeg','.png','.webp'].includes(ext)) return cb(null,true);
   cb(new Error('Недопустимый формат файла. Трек: WAV/MP3/FLAC/AIFF/M4A/OGG, обложка: JPG/PNG/WEBP.'));
 }
}).fields([{name:'track',maxCount:1},{name:'cover',maxCount:1}]);
function val(input,max=300) {return typeof input==='string' ? input.replace(/[\u0000-\u001f]/g,' ').trim().slice(0,max) : '';}
function html(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
async function telegram(method,payload){
  const url='https://api.telegram.org/bot'+process.env.TELEGRAM_BOT_TOKEN+'/'+method;
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),90000);
  try{
    const r=await fetch(url,{method:'POST',body:payload,signal:controller.signal});
    const data=await r.json().catch(()=>({ok:false}));
    if(!r.ok || !data.ok) throw new Error('telegram_api_'+r.status);
    return data.result;
  } finally {clearTimeout(timeout);}
}
async function sendText(message){
 const f=new FormData();
 f.set('chat_id',process.env.TELEGRAM_CHAT_ID);
 f.set('text',message);
 f.set('parse_mode','HTML');
 f.set('disable_web_page_preview','true');
 return telegram('sendMessage',f);
}
async function sendFile(file,caption){
 const form=new FormData();
 form.set('chat_id',process.env.TELEGRAM_CHAT_ID);
 form.set('document',new Blob([file.buffer],{type:'application/octet-stream'}),file.originalname.slice(0,140));
 form.set('caption',caption.slice(0,950));
 return telegram('sendDocument',form);
}
app.post('/api/submit',limiter,(req,res,next)=>{
 if(!configured()) return res.status(503).json({ok:false,error:'Приём треков ещё настраивается. Пока напишите @soulweyyy в Telegram.'});
 upload(req,res,err=>err?next(err):next());
},async(req,res)=>{
 const body=req.body||{};
 if(body.website) return res.status(400).json({ok:false,error:'Не удалось отправить форму.'});
 const artist=val(body.artist,120),trackTitle=val(body.trackTitle,180),telegramContact=val(body.telegram,120),
     email=val(body.email,140),releaseType=val(body.releaseType,50),genre=val(body.genre,100),
     artists=val(body.featured,250),authors=val(body.authors,300),composer=val(body.composer,300),
     explicit=val(body.explicit,30),releaseDate=val(body.releaseDate,30),owner=val(body.owner,250),
     language=val(body.language,100),isrc=val(body.isrc,40),notes=val(body.notes,1700),
     cloudLink=val(body.cloudLink,500),copyright=val(body.copyright,20),
     consent=val(body.consent,20);
 const files=req.files||{},audio=files.track?.[0],cover=files.cover?.[0];
 if(!artist || !trackTitle || (!telegramContact&&!email) || !(audio||cloudLink))
    return res.status(400).json({ok:false,error:'Укажи артиста, название трека, контакт и прикрепи аудио либо ссылку на файл.'});
 if(copyright!=='yes'||consent!=='yes') return res.status(400).json({ok:false,error:'Для отправки нужно подтвердить права на материал и согласие на обработку заявки.'});
 if(cloudLink && !/^https?:\/\/\S+/i.test(cloudLink)) return res.status(400).json({ok:false,error:'Ссылка на файл должна начинаться с https://'});
 if(cover && cover.size>10*1024*1024) return res.status(400).json({ok:false,error:'Обложка должна быть меньше 10 МБ.'});
 if(audio && audio.size>45*1024*1024) return res.status(400).json({ok:false,error:'Аудиофайл должен быть меньше 45 МБ. Для большого WAV вставь ссылку на облако.'});
 const id=crypto.randomBytes(4).toString('hex').toUpperCase();
 const rows=[
 ['Номер',id],['Исполнитель',artist],['Название',trackTitle],['Формат',releaseType],['Жанр',genre],
 ['Приглашённые артисты',artists],['Авторы текста',authors],['Авторы музыки',composer],
 ['Ненормативная лексика',explicit],['Язык',language],['Дата релиза',releaseDate],
 ['Правообладатель',owner],['ISRC',isrc],['Telegram',telegramContact],['Email',email],
 ['Ссылка на облако',cloudLink],['Примечания',notes],
 ['Аудио',audio?audio.originalname+' ('+(audio.size/1048576).toFixed(1)+' МБ)':'по ссылке'],
 ['Обложка',cover?cover.originalname:'не прикреплена']];
 const msg='<b>🎵 YOUNG SOUND — НОВЫЙ РЕЛИЗ</b>\n\n'+rows.filter(([,v])=>v).map(([k,v])=>'<b>'+html(k)+':</b> '+html(v)).join('\n');
 try {
   await sendText(msg.slice(0,3900));
   if(audio) await sendFile(audio,'🎧 '+artist+' — '+trackTitle+' | заявка '+id);
   if(cover) await sendFile(cover,'🖼 Обложка | '+artist+' — '+trackTitle+' | заявка '+id);
   return res.json({ok:true,id,message:'Заявка и файлы отправлены в Telegram Young Sound.'});
 }catch(e){
   console.error('Telegram delivery error',id,e.message);
   return res.status(502).json({ok:false,error:'Сервис не подтвердил доставку всех файлов. Напиши @soulweyyy и укажи номер '+id+'.'});
 }
});
app.use((err,req,res,_next)=>{
 console.error('Submission rejected:',err.code||err.message);
 const userMessage=err.code==='LIMIT_FILE_SIZE'?'Файл слишком большой. Для большого WAV используй ссылку на облако.':
 err.message?.startsWith('Недопустимый формат')?err.message:
 'Ошибка загрузки файла. Проверь размер и формат.';
 res.status(400).json({ok:false,error:userMessage});
});
app.listen(process.env.PORT||3001,'0.0.0.0',()=>console.log('Young Sound upload API started'));