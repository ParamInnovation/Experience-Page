
import * as $ from 'jquery';
import wing from '../wing.png'
/*==============================================================================
Init
==============================================================================*/
$.Hero = function() {
	this.x = $.ww / 2;
	this.y = $.wh / 2;
	this.vx = 0;
	this.vy = 0;
	this.vmax = 4;
	this.vmax = 6;
	this.direction = 0;
	this.accel = 0.1;
	this.radius = 11;
	this.life = 1;
	this.takingDamage = 0;
	this.fillStyle = '#fff';
	this.weapon = {
		fireRate: 5,
		fireRateTick: 5,
		spread: 0.3,
		count: 1,
		bullet: {
			size: 15,
			lineWidth: 2,
			damage: 1,
			speed: 10,
			piercing: 0,
			strokeStyle: '#fff'
		},
		fireFlag: 0
	};	
};

/*==============================================================================
Update
==============================================================================*/
$.Hero.prototype.update = function() {
	if( this.life > 0 ) {
		/*==============================================================================
		Apply Forces
		==============================================================================*/
		if( $.keys.state.up ) {
			this.vy -= this.accel * $.dt;
			if( this.vy < -this.vmax ) {
				this.vy = -this.vmax;
			}
		} else if( $.keys.state.down ) {
			this.vy += this.accel * $.dt;
			if( this.vy > this.vmax ) {
				this.vy = this.vmax;
			}
		}
		if( $.keys.state.left ) {
			this.vx -= this.accel * $.dt;
			if( this.vx < -this.vmax ) {
				this.vx = -this.vmax;
			}
		} else if( $.keys.state.right ) {
			this.vx += this.accel * $.dt;
			if( this.vx > this.vmax ) {
				this.vx = this.vmax;
			}
		}

		this.vy *= 0.9;
		this.vx *= 0.9;	
		
		this.x += this.vx * $.dt;
		this.y += this.vy * $.dt;

		/*==============================================================================
		Lock Bounds
		==============================================================================*/
		var earthImageWidth ="200px"
        var earthImageHeight ="100px";
		var minX = earthImageWidth * 0.5; // Left edge boundary
		var maxX = $.ww - earthImageWidth * 0.5; // Right edge boundary
		var minY = earthImageHeight * 0.5; // Top edge boundary
		var maxY = $.wh - earthImageHeight * 0.5; // Bottom edge boundary
		if (this.x >= maxX - this.radius) {
			this.x = maxX - this.radius;
		  }
		  if (this.x <= minX + this.radius) {
			this.x = minX + this.radius;
		  }
		  if (this.y >= maxY - this.radius) {
			this.y = maxY - this.radius;
		  }
		  if (this.y <= minY + this.radius) {
			this.y = minY + this.radius;
		  }
		/*==============================================================================
		Update Direction
		==============================================================================*/
		var dx = $.mouse.x - this.x,
			dy = $.mouse.y - this.y;
		this.direction = Math.atan2( dy, dx );

		/*==============================================================================
		Fire Weapon
		==============================================================================*/
		if( this.weapon.fireRateTick < this.weapon.fireRate ){
			this.weapon.fireRateTick += $.dt;
		} else {
			if( $.autofire || ( !$.autofire && $.mouse.down ) ){

				this.weapon.fireRateTick = this.weapon.fireRateTick - this.weapon.fireRate;
				this.weapon.fireFlag = 6;

				if( this.weapon.count > 1 ) {
					var spreadStart = -this.weapon.spread / 2;
					var spreadStep = this.weapon.spread / ( this.weapon.count - 1 );
				} else {
					var spreadStart = 0;
					var spreadStep = 0;
				}

				var gunX = this.x + Math.cos( this.direction ) * ( this.radius + this.weapon.bullet.size );
				var gunY = this.y + Math.sin( this.direction ) * ( this.radius + this.weapon.bullet.size );

				for( var i = 0; i < this.weapon.count; i++ ) {
					$.bulletsFired++;
					var color = this.weapon.bullet.strokeStyle;
					if( $.powerupTimers[ 2 ] > 0 || $.powerupTimers[ 3 ] > 0 || $.powerupTimers[ 4 ] > 0) {
						var colors = [];
						if( $.powerupTimers[ 2 ] > 0 ) { colors.push( 'hsl(' + $.definitions.powerups[ 2 ].hue + ', ' + $.definitions.powerups[ 2 ].saturation + '%, ' + $.definitions.powerups[ 2 ].lightness + '%)' ); }
						if( $.powerupTimers[ 3 ] > 0 ) { colors.push( 'hsl(' + $.definitions.powerups[ 3 ].hue + ', ' + $.definitions.powerups[ 3 ].saturation + '%, ' + $.definitions.powerups[ 3 ].lightness + '%)' ); }
						if( $.powerupTimers[ 4 ] > 0 ) { colors.push( 'hsl(' + $.definitions.powerups[ 4 ].hue + ', ' + $.definitions.powerups[ 4 ].saturation + '%, ' + $.definitions.powerups[ 4 ].lightness + '%)' ); }
						color = colors[ Math.floor( $.util.rand( 0, colors.length ) ) ];
					}
					$.bullets.push( new $.Bullet( {					
						x: gunX,
						y: gunY,
						speed: this.weapon.bullet.speed,
						direction: this.direction + spreadStart + i * spreadStep,
						damage: this.weapon.bullet.damage,
						size: this.weapon.bullet.size,
						lineWidth: this.weapon.bullet.lineWidth,
						strokeStyle: color,
						piercing: this.weapon.bullet.piercing					
					} ) );
				}
			}
		}

		/*==============================================================================
		Check Collisions
		==============================================================================*/
		this.takingDamage = 0;
		var ei = $.enemies.length;
		while( ei-- ) {
			var enemy = $.enemies[ ei ];
			if( enemy.inView && $.util.distance( this.x, this.y, enemy.x, enemy.y ) <= this.radius + enemy.radius ) {
				$.particleEmitters.push( new $.ParticleEmitter( {
					x: this.x,
					y: this.y,
					count: 2,
					spawnRange: 0,
					friction: 0.85,
					minSpeed: 2,
					maxSpeed: 15,
					minDirection: 0,
					maxDirection: $.twopi,
					hue: 0,
					saturation: 0
				} ) );
				this.takingDamage = 1;
				this.life -= 0.0075;
				$.rumble.level = 3;
			}
		}		
	}
};

/*==============================================================================
Render
==============================================================================*/
// $.Hero.prototype.render = function() {
// 	if( this.life > 0 ) {
// 		if( this.takingDamage ) {
// 			var fillStyle = 'hsla(0, 0%, ' + $.util.rand( 0, 100 ) + '%, 1)';
// 			$.ctxmg.fillStyle = 'hsla(0, 0%, ' + $.util.rand( 0, 100 ) + '%, ' + $.util.rand( 0.01, 0.15 ) + ')';
// 			$.ctxmg.fillRect( -$.screen.x, -$.screen.y, $.cw, $.ch );
// 		} else if( this.weapon.fireFlag > 0 ) {
// 			this.weapon.fireFlag -= $.dt;
// 			var fillStyle = 'hsla(' + $.util.rand( 0, 359 ) + ', 100%, ' + $.util.rand( 20, 80 ) + '%, 1)';
// 		} else {
// 			var fillStyle = this.fillStyle;
// 		}

// 		$.ctxmg.save();
// 		$.ctxmg.translate( this.x, this.y );
// 		$.ctxmg.rotate( this.direction - $.pi / 4 );
// 		$.ctxmg.fillStyle = fillStyle;
// 		$.ctxmg.fillRect( 0, 0, this.radius, this.radius );
// 		$.ctxmg.restore();

// 		$.ctxmg.save();
// 		$.ctxmg.translate( this.x, this.y );	
// 		$.ctxmg.rotate( this.direction - $.pi / 4 + $.twopi / 3 );
// 		$.ctxmg.fillStyle = fillStyle;
// 		$.ctxmg.fillRect( 0, 0, this.radius, this.radius );
// 		$.ctxmg.restore();

// 		$.ctxmg.save();
// 		$.ctxmg.translate( this.x, this.y );	
// 		$.ctxmg.rotate( this.direction - $.pi / 4 - $.twopi / 3 );
// 		$.ctxmg.fillStyle = fillStyle;
// 		$.ctxmg.fillRect( 0, 0, this.radius, this.radius );
// 		$.ctxmg.restore();

// 		$.util.fillCircle( $.ctxmg, this.x, this.y, this.radius - 3, fillStyle );
// 	}	
// };
// $.Hero.prototype.render = function() {
// 	if (this.life > 0) {
// 	  if (this.takingDamage) {
// 		var fillStyle = 'hsla(0, 0%, ' + $.util.rand(0, 100) + '%, 1)';
// 		$.ctxmg.fillStyle = 'hsla(0, 0%, ' + $.util.rand(0, 100) + '%, ' + $.util.rand(0.01, 0.15) + ')';
// 		$.ctxmg.fillRect(-$.screen.x, -$.screen.y, $.cw, $.ch);
// 	  } else if (this.weapon.fireFlag > 0) {
// 		this.weapon.fireFlag -= $.dt;
// 		var fillStyle = 'hsla(' + $.util.rand(0, 359) + ', 100%, ' + $.util.rand(20, 80) + '%, 1)';
// 	  } else {
// 		var fillStyle = this.fillStyle;
// 	  }
  
// 	  var image = new Image();
// 	  image.src = "../wing.png"; // Replace with the path to your hero image
  
// 	  $.ctxmg.save();
// 	  $.ctxmg.translate(this.x, this.y);
// 	  $.ctxmg.rotate(this.direction - $.pi / 4);
// 	  $.ctxmg.drawImage(image, 0, 0, this.radius, this.radius);
// 	  $.ctxmg.restore();
// 	}
//   };
  

// $.Hero.prototype.render = function() {
// 	if (this.life > 0) {
// 	  if (this.takingDamage) {
// 		var fillStyle = 'hsla(0, 0%, ' + $.util.rand(0, 100) + '%, 1)';
// 		$.ctxmg.fillStyle = 'hsla(0, 0%, ' + $.util.rand(0, 100) + '%, ' + $.util.rand(0.01, 0.15) + ')';
// 		$.ctxmg.fillRect(-$.screen.x, -$.screen.y, $.cw, $.ch);
// 	  } else if (this.weapon.fireFlag > 0) {
// 		this.weapon.fireFlag -= $.dt;
// 		var fillStyle = 'hsla(' + $.util.rand(0, 359) + ', 100%, ' + $.util.rand(20, 80) + '%, 1)';
// 	  } else {
// 		var fillStyle = this.fillStyle;
// 	  }
  
// 	  var image = new Image();
// 	  image.src = "../wing.png"; // Replace with the path to your hero image
  
// 	  var imageSize = this.radius * 5; // Adjust the size of the image
  
// 	  $.ctxmg.save();
// 	  $.ctxmg.translate(this.x, this.y);
// 	  $.ctxmg.rotate(this.direction - $.pi / 4);
// 	  $.ctxmg.drawImage(image, -imageSize / 2, -imageSize / 2, imageSize, imageSize);
// 	  $.ctxmg.restore();
// 	}
//   };
  


$.Hero.prototype.render = function() {
	if (this.life > 0) {
	  if (this.takingDamage) {
		var fillStyle = 'hsla(0, 0%, ' + $.util.rand(0, 100) + '%, 1)';
		$.ctxmg.fillStyle = 'hsla(0, 0%, ' + $.util.rand(0, 100) + '%, ' + $.util.rand(0.01, 0.15) + ')';
		$.ctxmg.fillRect(-$.screen.x, -$.screen.y, $.cw, $.ch);
	  } else if (this.weapon.fireFlag > 0) {
		this.weapon.fireFlag -= $.dt;
		var fillStyle = 'hsla(' + $.util.rand(0, 359) + ', 100%, ' + $.util.rand(20, 80) + '%, 1)';
	  } else {
		var fillStyle = this.fillStyle;
	  }
  
	  var image = new Image();
	  image.src = wing; // Replace with the path to your hero image
  
	  var imageSize = this.radius * 4; // Adjust the size of the image
  
	  $.ctxmg.save();
	  $.ctxmg.translate(this.x, this.y);
	  var imageAngle = this.direction - Math.PI/2-Math.PI/2 -Math.PI/2; // Adjust the rotation angle
	  $.ctxmg.rotate(imageAngle);
	  $.ctxmg.drawImage(image, -imageSize / 2, -imageSize / 2, imageSize, imageSize);
	  $.ctxmg.restore();
	}
  };
  