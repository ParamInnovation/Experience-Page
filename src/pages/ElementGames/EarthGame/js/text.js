
import * as $ from 'jquery';
$.textLine = function (opt) {
	var textLength = opt.text.length,
		size = 5;
	for (var i = 0; i < textLength; i++) {
		var letter = $.definitions.letters[(opt.text.charAt(i))] || $.definitions.letters['unknown'];
		for (var y = 0; y < size; y++) {
			for (var x = 0; x < size; x++) {
				if (letter) {
					if (letter[y][x] === 1) {

						opt.ctx.rect(opt.x + (x * opt.scale) + ((size * opt.scale) + opt.hspacing) * i, opt.y + y * opt.scale, opt.scale, opt.scale);
					}
				}
			}
		}
	}
};



// $.text = function( opt ) {
// 	var size = 5,
// 		letterSize = size * opt.scale,
// 		lines = opt.text.split('\n'),
// 		linesCopy = lines.slice( 0 ),
// 		lineCount = lines.length,
// 		longestLine = linesCopy.sort( function ( a, b ) { return b.length - a.length; } )[ 0 ],
// 		textWidth = ( longestLine.length * letterSize ) + ( ( longestLine.length - 1 ) * opt.hspacing ),
// 		textHeight = ( lineCount * letterSize ) + ( ( lineCount - 1 ) * opt.vspacing );

// 	var sx = opt.x,
// 		sy = opt.y,
// 		ex = opt.x + textWidth,
// 		ey = opt.y + textHeight;

// 	if( opt.halign == 'center' ) {
// 		sx = opt.x - textWidth / 2;
// 		ex = opt.x + textWidth / 2;
// 	} else if( opt.halign == 'right' ) {
// 		sx = opt.x - textWidth;
// 		ex = opt.x;
// 	}

// 	if( opt.valign == 'center' ) {
// 		sy = opt.y - textHeight / 2;
// 		ey = opt.y + textHeight / 2;
// 	} else if( opt.valign == 'bottom' ) {
// 		sy = opt.y - textHeight;
// 		ey = opt.y;
// 	}

// 	var	cx = sx + textWidth / 2,
// 		cy = sy + textHeight / 2;

// 	if( opt.render ) {
// 		for( var i = 0; i < lineCount; i++ ) {
// 			var line = lines[ i ],			
// 				lineWidth = ( line.length * letterSize ) + ( ( line.length - 1 ) * opt.hspacing ),
// 				x = opt.x,
// 				y = opt.y + ( letterSize + opt.vspacing ) * i;

// 			if( opt.halign == 'center' ) {
// 				x = opt.x - lineWidth / 2;
// 			} else if( opt.halign == 'right' ) {
// 				x = opt.x - lineWidth;
// 			}

// 			if( opt.valign == 'center' ) {
// 				y = y - textHeight / 2;
// 			} else if( opt.valign == 'bottom' ) {
// 				y = y - textHeight;
// 			}

// 			if( opt.snap ) {
// 				x = Math.floor( x );
// 				y = Math.floor( y );
// 			}

// 			$.textLine( {
// 				ctx: opt.ctx,
// 				x: x,
// 				y: y,
// 				text: line,
// 				hspacing: opt.hspacing,
// 				scale: opt.scale
// 			} );
// 		}
// 	}

// 	return {
// 		sx: sx,
// 		sy: sy,
// 		cx: cx,
// 		cy: cy,
// 		ex: ex,
// 		ey: ey,
// 		width: textWidth,
// 		height: textHeight,
// 		fontStyle: 'italic bold 20px Arial'
// 	}
// };
$.text = function (opt) {
	if (opt) {

		if (opt.text) {
			var size = 5,
				letterSize = size * opt.scale,
				lines = opt.text.split('\n'),
				linesCopy = lines.slice(0),
				lineCount = lines.length,
				longestLine = linesCopy.sort(function (a, b) {
					return b.length - a.length;
				})[0],
				textWidth = (longestLine.length * letterSize) + ((longestLine.length - 1) * opt.hspacing),
				textHeight = (lineCount * letterSize) + ((lineCount - 1) * opt.vspacing);

			var sx = opt.x,
				sy = opt.y,
				ex = opt.x + textWidth,
				ey = opt.y + textHeight;

			if (opt.halign == 'center') {
				sx = opt.x - textWidth / 2;
				ex = opt.x + textWidth / 2;
			} else if (opt.halign == 'right') {
				sx = opt.x - textWidth;
				ex = opt.x;
			}

			if (opt.valign == 'center') {
				sy = opt.y - textHeight / 2 + letterSize / 2; // Adjusted y position for center alignment
				ey = opt.y + textHeight / 2 + letterSize / 2; // Adjusted y position for center alignment
			} else if (opt.valign == 'bottom') {
				sy = opt.y - textHeight + letterSize; // Adjusted y position for bottom alignment
				ey = opt.y + letterSize; // Adjusted y position for bottom alignment
			}

			var cx = sx + textWidth / 2,
				cy = sy + textHeight / 2;

			if (opt.render) {
				var fontSize = 16; // Adjust the font size here
				if (opt.ctx) {
					opt.ctx.font = (opt.fontStyle || '') + ' ' + fontSize + 'px Arial'; // Apply the font style and size
					opt.ctx.fillStyle = 'white'; // Set font color to white
					opt.ctx.textBaseline = 'middle'; // Set text baseline to middle for vertical alignment

					for (var i = 0; i < lineCount; i++) {
						var line = lines[i],
							lineWidth = opt.ctx.measureText(line).width, // Measure the width of the line using the canvas context
							x = opt.x,
							y = opt.y + (letterSize + opt.vspacing) * i;

						if (opt.halign == 'center') {
							x = opt.x - lineWidth / 2;
						} else if (opt.halign == 'right') {
							x = opt.x - lineWidth;
						}

						if (opt.valign == 'center') {
							y = y - textHeight / 2 + letterSize / 2; // Adjusted y position for center alignment
						} else if (opt.valign == 'bottom') {
							y = y - textHeight + letterSize; // Adjusted y position for bottom alignment
						}

						if (opt.snap) {
							x = Math.floor(x);
							y = Math.floor(y);
						}

						opt.ctx.fillText(line, x, y); // Use fillText instead of rect to render the text
					}
				}
			}
		}

		return {
			sx: sx,
			sy: sy,
			cx: cx,
			cy: cy,
			ex: ex,
			ey: ey,
			width: textWidth,
			height: textHeight,
			fontStyle: (opt.fontStyle || '') + ' ' + fontSize + 'px Arial' // Provide the updated font style and size
		};
	}

};


$.text({
	// ctx: ctx,
	x: 100,
	y: 100,
	text: 'Hello, World!',
	hspacing: 1,
	vspacing: 1,
	scale: 2,
	halign: 'left',
	valign: 'top',
	render: true,
	snap: true,
	fontStyle: 'italic bold 15px Arial' // Custom font style
});

