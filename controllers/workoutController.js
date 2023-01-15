const film = require('../models/filmModel')
const mongoose = require('mongoose')

//recuperer tous les films
const consulterFilms = async (req, res) => {
	const workouts = await film.find({})
	res.status(200).json(workouts)
}

//recuperer un film
const consulterFilm = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'Ce film nexiste pas'})
	}

	const workout = await film.findById(id)
	if (!workout) {
		return res.status(400).json({error: 'Le film n\'existe pas'})
	}

	res.status(200).json(workout)
}



//creer un film 
const creerFilm = async (req, res) => {
	const {title,release_year,score,main_genre,main_production} = req.body

	let emptyFields = []

	if (!title) {
		emptyFields.push('title')
	}
	if (!release_year) {
		emptyFields.push('release_year')
	}
	if (!score) {
		emptyFields.push('score')
	}
	if (!main_genre) {
		emptyFields.push('main_genre')
	}
	if (!main_production) {
		emptyFields.push('main_production')
	}

	if (emptyFields.length > 0) {
		return res.status(400).json({error: 'Veuillez remplir tous les champs', emptyFields })
	}


	//ajouter à la base de données
	try {
		const workout = await film.create({title,release_year,score,main_genre,main_production})
		res.status(200).json(workout)
	} catch (error) {
		res.status(400).json({error: error.message})
	}
}



//suprimer un film
const suprimerFilm = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'Ce film n\'existe pas'})
	}

	const workout = await film.findOneAndDelete({_id: id})

	if (!workout) {
		return res.status(400).json({error: 'Ce film n\'existe pas'})
	}

	res.status(200).json({msg: 'Le film est supprimé'})
}


//update
const miseAJourFilm = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'Ce film n\'existe pas'})
	}

	const workout = await film.findOneAndUpdate({_id: id}, {
		...req.body
	})

	if (!workout) {
		return res.status(400).json({error: 'Ce film n\'existe pas'})
	}

	res.status(200).json({msg: 'Ce film est modifié'})
}

/*

//get tous les medicaments dont le condition médical est maux de tete
const medCond = async (req, res) => {
	const condition = req.params.medical_condition

	medicament.find({medical_condition : condition}, {drug_name:1, medical_condition:1, _id:0})
		.then(data  => {
			if (!data)
				res.status(404).json({error : 'not found'})
			else
				res.send(data)
		})
		.catch (err => {
			res
				.status(500).send({mesg: 'error retri'})
		})
}


//get tous les medicaments dont le rating est inférieur ou égale à un nombre fournit en parametre
const ratingMedoc = async (req, res) => {
	const noteinf = req.params.rating

	medicament.find({rating : {$lte:noteinf}}, {drug_name:1, medical_condition:1, rating:1, _id:0})
		.then(data  => {
			if (!data)
				res.status(404).json({error : 'not found'})
			else
				res.send(data)
		})
		.catch (err => {
			res
				.status(500).send({mesg: 'error retri'})
		})
}

*/


module.exports= {
	consulterFilms,
	consulterFilm,
	creerFilm,
	suprimerFilm,
	miseAJourFilm,
	//medCond,
	//ratingMedoc
}