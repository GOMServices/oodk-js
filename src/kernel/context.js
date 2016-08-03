	
	OODKContext = {

		/**
		 * Generate a standard context object
		 */
		'factory': function factory(){

			var context = {};

			Object.defineProperty(context, '__context', {
				enumerable: false,
				value: true
			});
			
			return context;
		},

		'isValid': function isValid(obj){
			return (typeof obj === 'object' && obj.__context === true);
		}
	}