const express = require('express');
const { Router } = express;

const profileController = require('../controllers/ProfileController');




const router = new Router();

// Não deveria existir
router.get('/', profileController.index); // Lista usuários

router.get('/:id', profileController.show); // Lista usuário

router.post('/',profileController.store);
router.post('/admin',profileController.storeAdmin);
router.post('/allSistema',profileController.allSistema);
router.post('/addGestaoProfile',profileController.addGestaoProfile);
router.post('/addProfileJose',profileController.addProfileJose);

router.put('/', profileController.update);
router.delete('/', profileController.delete);

module.exports = router;
