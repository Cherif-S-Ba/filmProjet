const express = require('express')
const {consulterFilms,consulterFilm,creerFilm,suprimerFilm,miseAJourFilm} = require('../controllers/workoutController')

const router = express.Router()

//Get all workouts
router.get('/', consulterFilms)

//Get a single workouts
router.get('/:id', consulterFilm)

//Post a new workout
router.post('/', creerFilm)

//delete a workouts
router.delete('/:id', suprimerFilm)

//Update a workouts
router.patch('/:id', miseAJourFilm)

/*
//get tous les medicaments dont le condition médical est maux de tete
router.get('/condition/:medical_condition', medCond)

//get tous les medicaments dont le rating est inférieur ou égale à un nombre fournit en parametre
router.get('/noteinf/:rating', ratingMedoc) 
*/
module.exports = router