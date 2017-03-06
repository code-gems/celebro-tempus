cerebro
.factory('$tempus', function(){
	var factory = {},
		_month 	= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		_day 	= ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

	 	addZero = function( str ) {
			str = "0" + str;
			return str.substr( str.length - 2, str.length );
		},

		conv12 = function( hour ) {
			if ( hour > 12 ) hour -= 12;
			return hour;
		},

		reformat = function( input, input_format, flag ) {

			if ( typeof input_format == "undefined" || typeof input == "undefined") return input || "";
			var output, format, h, hh, m, mm, s, ss, MM, dd, yyyy;
			format = input_format;

			ss = input.substr( format.indexOf("ss"), 2 );
			mm = input.substr( format.indexOf("mm"), 2 );
			hh = input.substr( format.indexOf("hh"), 2 );

			dd = input.substr( format.indexOf("dd"), 2 );
			MM = input.substr( format.indexOf("MM"), 2 );
			yyyy = input.substr( format.indexOf("yyyy"), 4 );

			if ( device.platform.toLowerCase() == "ios" ) {
				output = yyyy + "/" + MM + "/" + dd + " " + hh + ":" + mm + ":" + ss;
			} else {
				output = MM + "-" + dd + "-" + yyyy + " " + hh + ":" + mm + ":" + ss;
			}

			return output;
		};

	factory.format = function( output_format, time, input_format ) {
		var _date;

		( typeof input_format != 'undefined' ) ? time = reformat( time, input_format, 2 ) : null;
		( typeof time == "undefined" ) ? _date = new Date() : _date = new Date( time );

		if ( _date == "Invalid Date" ) return time;

		var H 		= _date.getHours(),
			HH 		= addZero( H ),
			h		= conv12( H ),
			hh		= addZero( h ),
			a 		= ( H > 11 ) ? "pm" : "am",

			m 		= _date.getMinutes(),
			mm 		= addZero( m ),
			s 		= _date. getSeconds(),
			ss 		= addZero( s ),
			X 		= + new Date(),

			yyyy	= _date.getFullYear(),
			yy 		= yyyy + "".substr( yyyy.length - 2, yyyy.length ),

			d 		= _date.getDay() + 1,
			dd 		= addZero( d ),
			ddd		= _day[ d - 1 ],

			M		= _date.getMonth() + 1,
			MM		= addZero( M ),
			MMM 	= _month[ M - 1 ],

			res 	= output_format;

		res = res
			.replace( /(X)/gi, X )

			.replace( /(HH)/g, HH )
			.replace( /(H)/g, H )

			.replace( /(hh)/g, hh )
			.replace( /(h)/g, h )

			.replace( /(mm)/g, mm )
			.replace( /(m)/g, m )

			.replace( /(ss)/g, ss )
			.replace( /(s)/g, s )

			.replace( /(a)/g, a )
			.replace( /(A)/g, a.toUpperCase() )

			.replace( /(ddd)/g, ddd )
			.replace( /(dd)/g, dd )
			.replace( /(d)/g, d )

			.replace( /(MMM)/g, MMM )
			.replace( /(MM)/g, MM )
			.replace( /(M)/g, M )

			.replace( /(yyyy)/g, yyyy )
			.replace( /(yy)/g, yy );

		return res;
	};

	factory.when = function() {
		// ... todo - time ago feature
	};

	return factory;
})

.filter("tempusFormat", function( $tempus ) {
	return function( input, format, input_format ) {
		return $tempus.format( format, input, input_format );
	}
});
