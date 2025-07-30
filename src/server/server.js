const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db_local');

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads


const multer = require('multer');
const path = require('path');

// 저장 방식 설정
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/'); // 저장 폴더
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, `${basename}-${Date.now()}${ext}`); // 파일명-시간.확장자
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB 제한
});

app.get('/board', (req, res) => {
    console.log('/board')
    db.query("SELECT * FROM board order by no desc", (err, data) => {
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.get('/board/:no', (req, res) => {
    console.log('/board/:no')
    console.log(req.params.no)
    const {no}=req.params
    db.query(`SELECT * FROM board where no=${no}`, (err, data) => {
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.post('/board/insert', upload.single('uploadFile'), (req, res) => {
    console.log('/board/insert');
    console.log('req.body:', req.body);     // 텍스트 필드들
    console.log('req.file:', req.file);     // 파일 필드

    const title = req.body.title;
    const contents = req.body.contents;
    const author = req.body.author;
    const regDate = req.body.regDate;
    const hits = parseInt(req.body.hits, 10);
    const attach = req.file ? req.file.filename : 'N';  // 파일명 없으면 'N'

    db.query(
        `INSERT INTO board(title, contents, author, regDate, attach, hits) VALUES (?, ?, ?, ?, ?, ?)`,
        [title, contents, author, regDate, attach, hits],
        (err, data) => {
            if (!err) res.send({ board_res: data });
            else res.send(err);
        }
    );
});

app.delete('/board/delete/:no', (req, res) => {
    console.log('/board/delete/:no')
    console.log(req.params)
   const no=req.params.no
   db.query(`delete from board where no=${no}`, (err, data) => {
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})


app.put('/board/update/:no', (req, res) => {
    console.log('/board/update/:no')
    console.log(req.params)
    console.log(req.body)
    const no=req.params.no
    const title=req.body.title
    const contents=req.body.contents

    db.query(`update board set title='${title}',contents='${contents}' where no=${no}`, (err, data) => {
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.put('/board/hits/:no', (req, res) => {
    console.log('/board/hits/:no')
    console.log(req.params)
    console.log(req.body)
    const no=parseInt(req.params.no)
    const hits=req.body.hits

    db.query(`update board set hits=${hits+1} where no=${no}`, (err, data) => {
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.get('/board/prevAndNext/:no', (req, res) => {
    console.log('/board/prevAndNext/:no')
    console.log('no',req.params.no)
    const no=req.params.no

    db.query(`SELECT no,title FROM board WHERE no IN (
    (SELECT no FROM board WHERE no < ${no} ORDER BY no DESC LIMIT 1),
    (SELECT no FROM board WHERE no > ${no} ORDER BY no LIMIT 1) )`, (err, data) => {
        console.log(data)
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.get('/board/search/:text', (req, res) => {
    console.log('/board/search/:text')
    console.log('text',req.params.text)
    const text=req.params.text
    db.query(`SELECT * from board where title like '%${text}%'`, (err, data) => {
            console.log(data)
            if(!err) res.send({ board_res : data });
            else res.send(err);
        })
})

app.put('/board/increase/:no', (req, res) => {
    console.log('/board/increase/:no')
    const no=req.params.no
    var hits=0
    db.query(`select hits from board where no=${no}`, (err, data) => {
        if(!err){
            console.log('data',data)
            console.log('data.hits',data[0].hits)
            hits=data[0].hits

            db.query(`update board set hits=${hits+1} where no=${no}`, (err, data) => {
                if(!err){
                    console.log(data)
                } 
                else {
                    res.send(err);
                }
            })
        } 
        else {
            res.send(err);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

