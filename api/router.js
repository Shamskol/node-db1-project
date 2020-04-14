const express = require('express');

// database access using knex
const db = require('../data/dbConfig');

const router = express.Router();
//C-Create, R= Read U=Update D= Delete
//Create= Post, Read= Get, Update= Put, Delete
router.get ('/', (req, res) => {
     db.select("*")
     .from("accounts")
     .then(accounts => {
         res.status(200).json({data: accounts});

    })
    . catch (err => {
        console.log(error);
        res.status(500).json({error: error.message});  
    })
});

router.get('/:id',  (req, res) => {
     db("accounts")
     .where({id: req.params.id})
     //.where("id", req.paams.id)
     .first()
     .then(account => {
         res.status(200).json({data:account});
     })

    . catch (err => {

        console.log(error);
        res.status(500).json({error: error.message});
    })
})
        



router.post('/', (req, res,) => {
    
         db("accounts")
         .insert(req.body, "id")
         
         .then(ids =>{
         db("accounts")
         .where({id})
         .first()
         .then(post=>{
        res.status(201).json({data:post})
         });
        })
    .catch (err =>{
        console.log(error);
        res.status(500).json({error: error.message});
    });
});

router.put('/:id',  (req, res,) => {
    
        const payload = {
            name: req.body.name,
            budget:req.body.budget,
        }
         db("accounts")
         .where("id", req.params.id)
         .update(req.body)
         .then(count)
         if(count > 0) {
        res.status(200).json({message: "update successful"})
         } else {
             res.status(400).json({message: "no posts by that id found"});
         }
        })   
    


// router.delete('/:id', (req, res,) => {
    
//          db("accounts").where("id", req.params.id).del()
//         res.status(204).end()
//     } catch (err) {
//         next(err)
//     }
// });

module.exports = router;