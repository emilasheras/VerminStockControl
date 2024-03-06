import express from 'express';
const router = express.Router();

// GET
router.get('/', (req, res) => {
  res
    .status(200)
    .send(`
      <h1>App</h1>
      <p>You are in the app RootDir / </p>
    `);
});

// POST
router.post('/', (req, res) => {
  res
    .status(405)
    .send('NOT IMPLEMENTED YET');
});

router.get('/one-parameter/:id', (req, res) => {
  res
    .status(200)
    .send(`
      <h1>One Parameter Testing</h1>
      <p>/one-parameter/${req.params.id}</p>
    `);
});

router.get('/two-parameters/:id/:name', (req, res) => {
  res
    .status(200)
    .send(`
      <h1>Two Parameter Testing</h1>
      <p>/two-parameters/${req.params.id}/${req.params.name}</p>
    `);
});

// Testing websockets
router.get('/websocket', async (req, res) => {

  res.render('index', {
      name: 'Jane Doe'
  });
});


export default router;