import express from 'express';
const router = express.Router();

// GET

/**
 * recieves a query id and returns a SINGLE product
 */ 
router.get('', async (req, res) => {

    res.render('index', {
        name: 'Jane Doe'
    });
});

export default router;