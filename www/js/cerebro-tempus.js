cerebro
.factory('$tempus', function(){
	var self 			= this,

		_months			= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		_months_short	= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

		_days 			= ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		_days_short		= ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	 	var addZero = function( str ) {
			str = "0" + str;
			return str.substr( str.length - 2, str.length );
		},

		conv12 = function( hour ) {
			if ( hour > 12 ) hour -= 12;
			if ( hour == 0 ) hour = 12;
			return hour;
		};

		this.reformat = function( input, input_format, flag ) {

			if ( typeof input_format == "undefined" || typeof input == "undefined") return input || "";
			var output, format, h, hh, m, mm, s, ss, MM, dd, yyyy;
			format = input_format;

			ss = input.substr( format.indexOf("ss") - 1, 2 );
			mm = input.substr( format.indexOf("mm") - 1, 2 );
			hh = input.substr( format.indexOf("hh") - 1, 2 );

			dd = input.substr( format.indexOf("dd") - 1, 2 );
			MM = input.substr( format.indexOf("MM") - 1, 2 );
			yyyy = input.substr( format.indexOf("yyyy") - 1, 4 );

			console.log( flag, input, format.indexOf("MM"), "dd", dd );
			console.log( flag, input, format.indexOf("MM"), "MM", MM );
			// if ( device.platform.toLowerCase() == "ios" ) {
				// output = yyyy + "/" + MM + "/" + dd + " " + hh + ":" + mm + ":" + ss;
			// } else {
				output = MM + "-" + dd + "-" + yyyy + " " + hh + ":" + mm + ":" + ss;
			// }

			return output;
		};

	this.format = function( output_format, time, input_format, flag ) {
		var _date;

		console.log(flag, output_format, time);

		( typeof input_format != 'undefined' ) ? time = reformat( time, input_format, flag ) : null;
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

			w 		= _date.getDay(),
			d 		= _date.getDate(),
			dd 		= addZero( d ),
			ddd		= _day[ w - 1 ],

			M		= _date.getMonth() + 1,
			MM		= addZero( M ),
			MMM 	= _month[ M - 1 ],

			res 	= output_format;

			console.log( MMM, res );

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

	this.when = function() {
		// ... todo - time ago feature
	};

	return this;
})

.filter("tempusFormat", function( $tempus ) {
	return function( input, format, input_format ) {
		return $tempus.format( format, input, input_format );
	}
});
