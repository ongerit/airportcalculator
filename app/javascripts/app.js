var url = [{"ID":1,"Airport_Name":"Goroka","Location":"Goroka","Country":"Papua New Guinea","Airport_Code":"GKA","Airport_Code2":"AYGA","Latitute":-6.081689,"Longitude":145.391881,"Elevation":5282,"Variation":10,"D":"U","Time_Zone":"Pacific/Port_Moresby"},
{"ID":2,"Airport_Name":"Madang","Location":"Madang","Country":"Papua New Guinea","Airport_Code":"MAG","Airport_Code2":"AYMD","Latitute":-5.207083,"Longitude":145.7887,"Elevation":20,"Variation":10,"D":"U","Time_Zone":"Pacific/Port_Moresby"},
{"ID":3,"Airport_Name":"Mount Hagen","Location":"Mount Hagen","Country":"Papua New Guinea","Airport_Code":"HGU","Airport_Code2":"AYMH","Latitute":-5.826789,"Longitude":144.295861,"Elevation":5388,"Variation":10,"D":"U","Time_Zone":"Pacific/Port_Moresby"},
{"ID":4,"Airport_Name":"Nadzab","Location":"Nadzab","Country":"Papua New Guinea","Airport_Code":"LAE","Airport_Code2":"AYNZ","Latitute":-6.569828,"Longitude":146.726242,"Elevation":239,"Variation":10,"D":"U","Time_Zone":"Pacific/Port_Moresby"},
{"ID":5,"Airport_Name":"Port Moresby Jacksons Intl","Location":"Port Moresby","Country":"Papua New Guinea","Airport_Code":"POM","Airport_Code2":"AYPY","Latitute":-9.443383,"Longitude":147.22005,"Elevation":146,"Variation":10,"D":"U","Time_Zone":"Pacific/Port_Moresby"},
{"ID":6,"Airport_Name":"Wewak Intl","Location":"Wewak","Country":"Papua New Guinea","Airport_Code":"WWK","Airport_Code2":"AYWK","Latitute":-3.583828,"Longitude":143.669186,"Elevation":19,"Variation":10,"D":"U","Time_Zone":"Pacific/Port_Moresby"},
{"ID":7,"Airport_Name":"Narsarsuaq","Location":"Narssarssuaq","Country":"Greenland","Airport_Code":"UAK","Airport_Code2":"BGBW","Latitute":61.160517,"Longitude":-45.425978,"Elevation":112,"Variation":-3,"D":"E","Time_Zone":"America/Godthab"}]

var vm = new Vue({
	
	el : "#app",
	
	data: {
		
		feed: url,
		origin: '',
		destination: ''
	},
	
	ready: function(){
					
	},
	
	
	methods:{
		
		calculate: function(){
			this.$set('origin',origin);
			this.$set('destination',destination);
			
			console.log(this);
			
			
		}
		
	}
	
})


var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

$('#the-basics .typeahead').typeahead({
  hint: false,
  highlight: false,
	minLength: 1
},
{
  name: 'states',
  source: substringMatcher(states)
});

$('#data .typeahead').typeahead({
  hint: false,
  highlight: false,
	minLength: 1
},
{
  name: 'url',
  source: substringMatcher(url.airportname)
});







