var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new LocalStrategy({
		passReqToCallback : true
	},

	function(req, email, password, done){
		
		//console.log(email);
		//return;
		var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();

		db.query('SELECT * FROM usuarios WHERE correo = ?', email, function(err, rows, fields){
			if(err) throw err;

			db.end();

			if(rows.length > 0){

				var user = rows[0];
				//if(bcrypt.compareSync(password, user.password)){
				if(password == user.password){
					console.log("si");
					return done(null, {
						id : user.id,
						nombre : user.nombre,
						correo : user.correo
					});
				}
			}

			return done(null, false);

		})
	}
	));
};