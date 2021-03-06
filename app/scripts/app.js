'use strict';
var vm = new Vue({ // eslint-disable-line

    el: '#app',

    data: {
        show: false,
        title: false,
        ready: false
    },

    ready: function() {
        this.getData();

    },
    methods: {

        getData: function() {
            var airData = 'scripts/data.json';
            this.$http.get(airData, function(data) {
                this.$set('airports', data);
                this.getAirports();
                this.typeData();
                this.getIndex();
            });
        },
        getAirports: function() {
            var airportData = this.airports;
            for (var i = 0; i < airportData.length; i++) {
                this.airportName.push(airportData[i].an + ' ( ' + airportData[i].ac + ' ) ');
                // his.$set('airportName', airportData.a[i]);
            }
        },

        typeData: function() {

            var substringMatcher = function(strs) {
                return function findMatches(q, cb) {
                    var matches, substringRegex; // eslint-disable-line

                    // an array that will be populated with substring matches
                    matches = [];

                    // regex used to determine if a string contains the substring `q`
                    var substrRegex = new RegExp(q, 'i'); // eslint-disable-line

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


            var a = this.airportName;

            $('#destination .typeahead').typeahead({
                hint: false,
                highlight: false,
                minLength: 1
            }, {
                name: 'a',
                source: substringMatcher(a)
            });

            $('#origin .typeahead').typeahead({
                hint: false,
                highlight: false,
                minLength: 1
            }, {
                name: 'a',
                source: substringMatcher(a)
            });
        },

        getIndex: function() {
            var org = this.airportName.indexOf(this.origin);
            var dest = this.airportName.indexOf(this.destination);
            this.$set('indexOfOrigin', org);
            this.$set('indexOfDestination', dest);
        },


        initCounter: function() {
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            };
            var count = new CountUp('counter', 0, this.totalDistance, 0, 2.5, options); // eslint-disable-line
            count.start();

        },

        getDistance: function(origin, destination) {

            this.getIndex();

            var lat1, long1, lat2, long2;

            // round to the nearest 1/1000
            function round(x) {
                return Math.round(x * 10) / 10;
            }

            // convert degrees to radians
            function deg2rad(deg) {
                var rad = deg * Math.PI / 180; // radians = degrees * pi/180
                return rad;
            }


            if (origin > -1 && destination > -1) {

                //Hide the ui-widget box
                document.getElementById('hide').style.display = 'none';
                this.show = !this.show;

                lat1 = this.airports[origin].la;
                long1 = this.airports[origin].lo;
                lat2 = this.airports[destination].la;
                long2 = this.airports[destination].lo;

                //save cordinates for map
                this.$set('lat1', lat1);
                this.$set('long1', long1);
                this.$set('lat2', lat2);
                this.$set('long2', long2);


                // convert coordinates to radians
                lat1 = deg2rad(lat1);
                long1 = deg2rad(long1);
                lat2 = deg2rad(lat2);
                long2 = deg2rad(long2);

                var R = 3961; //miles
                var dlon = long2 - long1;
                var dlat = lat2 - lat1;

                //var a = Math.pow((Math.sin(dlat/2)),2) + Math.cos(originLat) * Math.cos(destLat) * Math.pow((Math.sin(dlon/2)),2);
                var a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c; //(where R is the radius of the Earth)
                var dm = round(d);

                this.$set('totalDistance', dm);

                this.$nextTick(function() {
                    this.initCounter();
                });

            } else {
                console.log('Please Select an Airport');
            }

        },

        resetCounter: function() {
            this.show = !this.show;
            this.origin = '';
            this.destination = '';

            this.$nextTick(function() {
                this.typeData(); //Doesn't populate array with duplicate airports
            });

        }

    }

});

Vue.transition('fade', { // eslint-disable-line
    type: 'animation',
    enterClass: 'fadeInUp',
    leaveClass: 'fadeOutUp'
});

Vue.transition('fadein', { // eslint-disable-line
    type: 'animation',
    enterClass: 'rotateIn',
    leaveClass: 'fadeOutDownBig'
});
