var models = require("../models/models.js");

exports.load=function(req, res, next, quizId){
    console.log('jga load: ' + quizId);
    models.Quiz.findById(quizId)
        .then(function(quiz){
            console.log('jga load: si encontro en la BD');
            if(quiz){
                req.quiz = quiz;
                next();
            } else{
                console.log('jga load: Error');
                next(new Error('No existe quizId: ' + quizId));
            }
        })
        .catch(function(error){
            console.log('jga load: Error catch');
            next(error);
        });
};

exports.index= function(req, res){
    models.Quiz.findAll()
        .then(function(quizes){
            console.log('SI: '+quizes.length);
            console.log('SI: '+quizes[0].pregunta);
            res.render('quizes/index', {quizes: quizes});
        })
        .catch(function(error){
            next(error)
        });
};

exports.show= function(req, res){
    //models.Quiz.find(req.params.quizId).then(function(quiz){
        res.render('quizes/show', {quiz: req.quiz});
    //});
};

/*
exports.question= function(req, res){
    models.Quiz.findAll().then(function(quiz){
        res.render('quizes/question', {pregunta:quiz[0].pregunta});
    });

};
*/

exports.answer=function(req, res){
    //models.Quiz.find(req.params.quizId).then(function(quiz){
        var resultado = 'Incorrecto';
        if(req.query.respuesta.toUpperCase()=== req.quiz.respuesta.toUpperCase()){
            resultado='Correcto';
        }
        res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
    //});
};