angular.module('iot', ['ionic', 'chart.js'])

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('router', {
                url: "/route",
                abstract: true,
                templateUrl: "templates/side-menu-left.html"
            })
            .state('router.dashboard', {
                url: "/dashboard",
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: "templates/dashboard.html"
                    }
                }
            })
            .state('router.dashboard.home', {
                url: "/home",
                views: {
                    'home-tab': {
                        templateUrl: "templates/home.html"
                    }
                }
            })
            .state('router.detailchart', {
                url: "/detailchart",
                views: {
                    'menuContent': {
                        templateUrl: "templates/detailchart.html"
                    }
                }
            })
            .state('router.dashboard.favorites', {
                url: "/favorites",
                views: {
                    'favorites-tab': {
                        templateUrl: "templates/favorites.html"
                    }
                }
            })
            .state('router.dashboard.settings', {
                url: "/settings",
                views: {
                    'settings-tab': {
                        templateUrl: "templates/settings.html"
                    }
                }
            })
            .state('router.devices', {
                url: "/devices",
                views: {
                    'menuContent': {
                        templateUrl: "templates/devices.html"
                    }
                }
            })
            .state('router.device', {
                url: "/device",
                views: {
                    'menuContent': {
                        templateUrl: "templates/device-single.html"
                    }
                }
            })
            .state('router.locations', {
                url: "/locations",
                views: {
                    'menuContent': {
                        templateUrl: "templates/locations.html"
                    }
                }
            })
            .state('router.users', {
                url: "/users",
                views: {
                    'menuContent': {
                        templateUrl: "templates/users.html"
                    }
                }
            })
            .state('router.charts', {
                url: "/charts",
                views: {
                    'menuContent': {
                        templateUrl: "templates/charts.html"
                    }
                }
            })
            .state('router.actions', {
                url: "/actions",
                views: {
                    'menuContent': {
                        templateUrl: "templates/actions.html"
                    }
                }
            })
            .state('router.addUser', {
                url: "/add-user",
                views: {
                    'menuContent': {
                        templateUrl: "templates/add-user.html"
                    }
                }
            })
            .state('router.addDevice', {
                url: "/add-device",
                views: {
                    'menuContent': {
                        templateUrl: "templates/add-device.html"
                    }
                }
            })
            .state('router.addLocation', {
                url: "/add-location",
                views: {
                    'menuContent': {
                        templateUrl: "templates/add-location.html"
                    }
                }
            })
            .state('router.addAction', {
                url: "/add-action",
                views: {
                    'menuContent': {
                        templateUrl: "templates/add-action.html"
                    }
                }
            })
            .state('intro', {
                url: "/intro",
                templateUrl: "templates/intro.html"
            })
        $urlRouterProvider.otherwise("/intro");
    })
    .run(function($rootScope) {
        var pubnub = new PubNub({
            subscribeKey: "sub-c-4ff5e624-af4a-11e6-b37b-02ee2ddab7fe",
            error: function(error) {
                console.log('Error: ', error)
            }
        });

        pubnub.addListener({
            status: function(statusEvent) {
                if (statusEvent.category === "PNConnectedCategory") {
                    // publishSampleMessage(); // <<< there is no function defined in this code
                }
            },
            message: function(message) {
                var customData = [];

                var temp = message.message.eon.Temperature * 1;
                var humi = message.message.eon.Humidity * 1;
                var co2 = message.message.eon.CO2 * 1;
                var light = message.message.eon.Light;

                customData[0] = temp;
                customData[1] = humi;
                customData[2] = co2;
                customData[3] = light;
                $rootScope.collection.push(customData);
            },
        });
        pubnub.subscribe({
            channels: ['tempeon'], // <<< you were missing comma here
            withPresence: true
        });
    })
    .controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $ionicPopover, $state, $timeout) {
        $scope.users = [
            { username: 'Admin', email: 'admin@test.domain', location: true, id: 'admin', avatar: 'img/men.jpg', enabled: 'true', lastLogin: 'Online' },
            { username: 'Stacy S', email: 'stacy@test.domain', location: true, id: 'stacy', avatar: 'img/girl.jpg', enabled: 'true', lastLogin: 'Last login: 01/09/2014' },
            { username: 'Mom', email: 'mom@test.domain', location: false, id: 'mom', avatar: 'img/noavatar.png', enabled: 'false', lastLogin: 'Last login: never' },
        ];
        $scope.device = { id: null, name: 'No Device', icon: 'ion-ios7-help-empty', status: 'Offline' },
            $scope.devices = [
                { id: '1', name: 'Thermostat (bedroom)', icon: 'ion-thermometer', status: 'Away', featured: true, userSelect: "stacy", actionSelect: "3" },
                { id: '2', name: 'Coffee Machine', icon: 'ion-coffee', status: 'Finished', color: 'balanced', featured: true, userSelect: "mom", actionSelect: null },
                { id: '3', name: 'Smoke Sensor', icon: 'ion-no-smoking', status: 'Idle', color: 'assertive', featured: true, userSelect: "admin", actionSelect: null },
                { id: '4', name: 'Garage', icon: 'ion-model-s', status: 'Car Inside', featured: true, userSelect: "admin", actionSelect: "6" },
                { id: '5', name: 'House Security', icon: 'ion-locked', status: 'Unarmed', color: 'assertive', featured: true, userSelect: "admin", actionSelect: "7" },
                { id: '6', name: 'Fan (WC)', icon: 'ion-load-b', status: 'Working', color: 'balanced', userSelect: "admin", actionSelect: null },
                { id: '7', name: 'Desktop PC', icon: 'ion-social-windows', status: 'Online', color: 'balanced', featured: true, userSelect: "admin", actionSelect: null },
                { id: '8', name: 'Stacy\'s Laptop', icon: 'ion-social-apple', status: 'Online', color: 'balanced', userSelect: "stacy", actionSelect: null },
                { id: '9', name: 'Media Center (torrent downloader)', icon: 'ion-social-tux', status: 'Online', color: 'balanced', userSelect: "admin", actionSelect: null },
                { id: '10', name: 'Unknow Smartphone', icon: 'ion-social-android', status: 'Offline', color: 'assertive', userSelect: "admin", actionSelect: null },
                { id: '11', name: 'Room 1 Lights', icon: 'ion-ios7-lightbulb', userSelect: "admin", actionSelect: "1" },
                { id: '12', name: 'Room 2 Lights', icon: 'ion-ios7-lightbulb', userSelect: "admin", actionSelect: "1" },
                { id: '13', name: 'Room 3 Lights', icon: 'ion-ios7-lightbulb', userSelect: "admin", actionSelect: "1" },
                { id: '14', name: 'Lawn Lights', icon: 'ion-ios7-lightbulb', userSelect: "admin", actionSelect: "5" },
            ];
        $scope.locations = [
            { id: '1', name: 'Kitchen', icon: 'ion-fork', note: 'For mum', featured: true },
            { id: '2', name: 'WC', icon: 'ion-waterdrop', note: 'Occupied', featured: true },
        ];
        $scope.actions = [
            { id: '1', name: 'Lawn Lights Brightness', type: "range", value: '68', minValue: "0", maxValue: "100", units: "%", iconBefore: 'ion-ios7-lightbulb-outline', iconAfter: 'ion-ios7-lightbulb', deviceSelect: "", script: "", featured: true },
            { id: '2', name: 'Smart Grid Power', type: "range", value: '24', minValue: "0", maxValue: "100", units: "%", iconBefore: 'ion-ios7-bolt-outline', iconAfter: 'ion-ios7-bolt', deviceSelect: "", script: "", featured: false },
            { id: '3', name: 'Temperature', type: "range", value: '40', minValue: "-20", maxValue: "80", units: "°", iconBefore: 'ion-ios7-snowy', iconAfter: 'ion-ios7-sunny-outline', deviceSelect: "", script: "", featured: true },
            { id: '4', name: 'Popcorn Time', type: "toggle", featured: false },
            { id: '5', name: 'Good Night', type: "toggle", featured: true },
            { id: '6', name: 'Open Garage Doors', type: "toggle", featured: false },
            { id: '7', name: 'Arm Securuty', type: "toggle", featured: false },
        ];
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
        $scope.deviceTap = function(route, device) {
            $scope.device = device;
            $state.go(route);
        };
        $ionicPopover.fromTemplateUrl('templates/alerts.html', {
            scope: $scope,
        }).then(function(popover) {
            $scope.popover = popover;
        });
        $scope.openAlerts = function($event) {
            $scope.popover.show($event);
        };
        $scope.closeAlerts = function() {
            $scope.popover.hide();
        };
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        $timeout(function() {
            ionic.EventController.trigger("resize", "", true, false);
        }, 1500);
    })
    .controller('Intro', function($scope, $ionicSlideBoxDelegate, $timeout, $ionicLoading, $ionicPopup) {
        $scope.login = function() {
            $ionicLoading.show({
                template: 'Logging in...'
            });
            $timeout(function() {
                $ionicLoading.show({
                    template: 'Success'
                });
            }, 1600);
            $timeout(function() {
                $ionicLoading.hide();
                $ionicSlideBoxDelegate.next();
            }, 2000);
        }
        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        }
        $scope.prevSlide = function() {
            $ionicSlideBoxDelegate.previous();
        }
        $scope.showRegister = function() {
            $scope.data = {}
            var myPopup = $ionicPopup.show({
                template: '<input type="email" ng-model="data.email">',
                title: 'Enter Your Email Address',
                subTitle: 'You will be notified once approved',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Submit</b>',
                        type: 'button-balanced',
                        onTap: function(e) {
                            if (!$scope.data.email) {
                                e.preventDefault();
                            } else {
                                return $scope.data.email;
                            }
                        }
                    },
                ]
            });
        };
    })
    .controller('Dashboard', function($state, $scope, $interval, $timeout, $rootScope) {
        $rootScope.collection = [];
        $scope.tapChart = function(id) {
            $rootScope.type = id;
            $state.go('router.detailchart');
        };
        $scope.myload = function(scope) {
            $('#light').attr('src', 'img/lightoff.png');
            // var tempData = [{ x: 0, y: 25 }, { x: 1, y: 25 }, { x: 2, y: 25 }];
            // var humiData = [{ x: 0, y: 50 }, { x: 1, y: 50 }, { x: 2, y: 50 }];
            // var co2Data = [{ x: 0, y: 5000 }, { x: 1, y: 5000 }, { x: 2, y: 5000 }];

            // var tempLine = line(50, "line-1")
            //     .$el(d3.select("#line-1"))
            //     .height(100) // Set height
            //     .data(tempData) // Set data
            //     .render();
            // var humiLine = line(100, "line-2")
            //     .$el(d3.select("#line-2"))
            //     .height(100) // Set height
            //     .data(humiData) // Set data
            //     .render();
            // var co2Line = line(10000, "line-3")
            //     .$el(d3.select("#line-3"))
            //     .height(100) // Set height
            //     .data(co2Data) // Set data
            //     .render();

            var tempPie = new createHalfPie("#chart_temp", 50, "°C");
            var humiPie = new createHalfPie("#chart_humi", 100, "%");
            var co2Pie = new createHalfPie("#chart_co2", 10000, "ppm");

            // Simulate async data update
            var timeCnt = $rootScope.collection.length;
            $scope.timer = $interval(function() {
                var dataLen = $rootScope.collection.length;

                if ((dataLen > 0) && (dataLen > timeCnt)) {
                    timeCnt++;
                    var temp = $rootScope.collection[dataLen - 1][0] * 1;
                    var humi = $rootScope.collection[dataLen - 1][1] * 1;
                    var co2 = $rootScope.collection[dataLen - 1][2] * 1;
                    var light = $rootScope.collection[dataLen - 1][3];

                    if (light == 0) { $('#light').attr('src', 'img/lightoff.png'); }
                    if (light == 5) { $('#light').attr('src', 'img/lighton.png'); }

                    var changing = 10000;
                    if (co2 > 10000) {
                        // co2Pie = new createHalfPie("#chart_co2", 20, "%");
                        $('#ppm').text('%');
                        $('#ppmmin').text('1');
                        $('#ppmmax').text('20');
                        co2 = Math.round(co2 / 1000 * 10) / 10;
                        changing = 20;
                    } else {
                        $('#ppm').text('ppm');
                        $('#ppmmin').text('0');
                        $('#ppmmax').text('10000');
                    }

                    tempPie.doAnim(temp, 50);
                    humiPie.doAnim(humi, 100);
                    co2Pie.doAnim(co2, changing);

                    // tempData[0].y = tempData[1].y;
                    // tempData[1].y = tempData[2].y;
                    // tempData[2].y = temp;
                    // tempLine.data(tempData).render();

                    // humiData[0].y = humiData[1].y;
                    // humiData[1].y = humiData[2].y;
                    // humiData[2].y = humi;
                    // humiLine.data(humiData).render();

                    // co2Data[0].y = co2Data[1].y;
                    // co2Data[1].y = co2Data[2].y;
                    // co2Data[2].y = co2;
                    // co2Line.data(co2Data).render();
                }
            }, 500);
        }
        $scope.$on("$destroy", function() {
            if ($scope.timer != undefined) {
                $interval.cancel($scope.timer);
            }
        });
    })
    .controller('detailchart', function($scope, $interval, $rootScope, $state) {
        // var maximum = 50;
        // var pointLen = 0;
        // $scope.data1 = [
        //     []
        // ];
        // $scope.data2 = [
        //     []
        // ];
        // $scope.data3 = [
        //     []
        // ];
        // $scope.labels = [];
        // for (var i = 0; i < maximum; i++) {
        //     $scope.data1[0].push(0);
        //     $scope.data2[0].push(0);
        //     $scope.data3[0].push(0);
        //     $scope.labels.push("");
        // }
        // $scope.options = {
        //     responsive: true,
        //     showTooltips: false,
        //     animation: false,
        //     pointDot: false,
        //     scaleShowLabels: true,
        //     showScale: true,
        //     maintainAspectRatio: false,
        //     datasetStrokeWidth: 1,
        // };
        // if ($rootScope.type != undefined) {
        //     function getLiveChartData(temp, humi, co2) {
        //         if ($scope.data1[0].length) {
        //             $scope.labels = $scope.labels.slice(1);
        //             $scope.data1[0] = $scope.data1[0].slice(1);
        //             $scope.data2[0] = $scope.data2[0].slice(1);
        //             $scope.data3[0] = $scope.data3[0].slice(1);
        //         }

        //         while ($scope.data1[0].length < maximum) {
        //             $scope.labels.push('');
        //             $scope.data1[0].push(temp);
        //             $scope.data2[0].push(humi);
        //             $scope.data3[0].push(co2);

        //         }
        //     }

        //     for (var i = 0; i < $rootScope.collection.length; i++) {
        //         getLiveChartData($rootScope.collection[i][0], $rootScope.collection[i][1], $rootScope.collection[i][2]);
        //         pointLen++;
        //     }

        //     // Simulate async data update
        //     $scope.timer = $interval(function() {
        //         var dataLen = $rootScope.collection.length;
        //         if (dataLen > pointLen) {
        //             getLiveChartData($rootScope.collection[dataLen - 1][0], $rootScope.collection[dataLen - 1][1], $rootScope.collection[dataLen - 1][2]);
        //             pointLen++;
        //         }
        //     }, 500);
        // } else {
        //     $state.go('router.dashboard.home');
        // }

        // $scope.$on("$destroy", function() {
        //     if ($scope.timer != undefined) {
        //         $interval.cancel($scope.timer);
        //     }
        // });
        var pubnub = new PubNub({
            subscribeKey: "sub-c-4ff5e624-af4a-11e6-b37b-02ee2ddab7fe"
        });
        var PNchannel = "tempeon"

        //        eon.chart({
        //          pubnub: pubnub,
        //          channels: [PNchannel], // the pubnub channel for real time data
        //          generate: {           // c3 chart object
        //            bindto: '#chart'
        //          },
        //          xType: 'auto',
        //          xId: 'x'
        //        });

        eon.chart({
            channels: [PNchannel],
            generate: {
                bindto: '#temp',
                data: {
                    type: 'line',
                    colors: {
                        temperature: 'deeppink'
                    }
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%H:%m:%S',
                            fit: true
                        },
                        label: {
                            text: 'Temperature over time',
                        }
                    },
                    y: {
                        label: {
                            text: 'Celsius',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: function(d) {
                                var df = Number(d3.format('.2f')(d));
                                return df;
                            }
                        }
                    }
                }
            },
            pubnub: pubnub,
            limit: 100,
            history: true,
            transform: function(m) {
                return {
                    eon: {
                        Temperature: m.eon.Temperature
                    }
                }
            }
        });


        eon.chart({
            channels: [PNchannel],
            generate: {
                bindto: '#humd',
                data: {
                    type: 'line',
                    colors: {
                        Humidity: 'deeppink'
                    }
                },
                xType: 'auto',
                xId: 'x'

            },
            pubnub: pubnub,
            limit: 100,
            history: true,
            transform: function(m) {
                return {
                    eon: {
                        Humidity: m.eon.Humidity
                    }
                }
            }
        });

        eon.chart({
            channels: [PNchannel],
            generate: {
                bindto: '#co2',
                data: {
                    type: 'line',
                    colors: {
                        Humidity: 'deeppink'
                    }
                },
                xType: 'auto',
                xId: 'x'

            },
            pubnub: pubnub,
            limit: 100,
            history: true,
            transform: function(m) {
                return {
                    eon: {
                        CO2: m.eon.CO2
                    }
                }
            }
        });

        eon.chart({
            channels: [PNchannel],
            generate: {
                bindto: '#light',
                data: {
                    type: 'line',
                    colors: {
                        Humidity: 'deeppink'
                    }
                },
                xType: 'auto',
                xId: 'x'

            },
            pubnub: pubnub,
            limit: 100,
            history: true,
            transform: function(m) {
                return {
                    eon: {
                        Light: m.eon.Light
                    }
                }
            }
        });
    })
    .controller('Charts', function($scope, $interval) {
        $scope.linelabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $scope.lineseries = ['Series A', 'Series B'];
        $scope.linedata = [
            [65, 76, 50, 47, 36, 30, 25, 48, 56, 55, 59, 63],
            [50, 48, 40, 57, 86, 99, 90, 58, 48, 80, 57, 60]
        ];
        $scope.barlabels = ['2008', '2009', '2010', '2011', '2012', '2013', '2014'];
        $scope.barseries = ['Series A', 'Series B'];
        $scope.bardata = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.polarLabels = ["Water", "Energy", "Gas", "Internet", "Fees"];
        $scope.polarData = [300, 500, 100, 40, 120];
        $scope.doughnutLabels = ["Water", "Energy", "Gas", "Fees"];
        $scope.doughnutData = [300, 500, 100, 20];
        $scope.options = {
            responsive: true,
            showTooltips: true,
            animation: true,
            pointDot: true,
            scaleShowLabels: true,
            showScale: true,
            maintainAspectRatio: false,
            datasetStrokeWidth: 1,
        };
        $interval(function() {
            $scope.doughnutData = [];
            $scope.polarData = [];

            for (var i = 0; i < 5; i++) {
                $scope.polarData.push(Math.floor(Math.random() * 500));
            }
            for (var i = 0; i < 4; i++) {
                $scope.doughnutData.push(Math.floor(Math.random() * 500));
            }
        }, 2500);
    })
    .controller('Actions', function($scope, $ionicActionSheet, $ionicModal) {
        $ionicModal.fromTemplateUrl('templates/edit-action.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.editaction = {};
        });
        $scope.actionHold = function(action) {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Edit' },
                ],
                destructiveText: 'Delete',
                titleText: 'Modify Action',
                cancelText: 'Cancel',
                cancel: function() {
                    return true;
                },
                buttonClicked: function(index) {
                    $scope.editaction = action;
                    $scope.modal.show();
                    return true;
                },
                destructiveButtonClicked: function(index) {
                    $scope.actions.splice($scope.actions.indexOf(action), 1);
                    return true;
                }
            });
        }
    })
    .controller('Users', function($scope, $ionicActionSheet) {
        ionic.DomUtil.ready(addMaps);
        var adminLat = new google.maps.LatLng(43.07493, -89.381388);
        var userLat = new google.maps.LatLng(45.07493, -88.381388);
        var mapOptions = {
            center: adminLat,
            zoom: 16,
            draggable: false,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var mapOptions2 = {
            center: userLat,
            zoom: 11,
            draggable: false,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        function addMaps() {
            var map = new google.maps.Map(document.getElementById("map_admin"),
                mapOptions);
            $scope.map = map;
            var map2 = new google.maps.Map(document.getElementById("map_stacy"),
                mapOptions2);
            $scope.map2 = map2;
        };
        $scope.userHold = function(user) {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Sample Button' }
                ],
                destructiveText: 'Delete',
                titleText: 'Modify a User',
                cancelText: 'Cancel',
                cancel: function() {},
                buttonClicked: function(index) {
                    return true;
                },
                destructiveButtonClicked: function(index) {
                    $scope.users.splice($scope.users.indexOf(user), 1);
                    return true;
                }
            });
        }
    })
    .controller('addUser', function($scope) {
        $scope.setFormScope = function(scope) {
            this.formScope = scope;
        }
        $scope.newuser = {};
        $scope.userSubmit = function() {
            if (!$scope.newuser.username) {
                alert('Username required');
                return;
            }
            if (!$scope.newuser.avatar) {
                $scope.newuser.avatar = 'img/noavatar.png';
            }
            $scope.newuser.lastLogin = 'Last login: never';
            $scope.newuser.id = $scope.users.length + 1;
            $scope.users.push($scope.newuser);
            this.formScope.addUserForm.$setPristine();
            var defaultForm = {
                id: "",
                username: "",
                avatar: "",
                location: false
            };
            $scope.newuser = defaultForm;
        };
    })
    .controller('addDevice', function($scope) {
        $scope.setFormScope = function(scope) {
            this.formScope = scope;
        }
        $scope.newdevice = {};
        $scope.deviceSubmit = function() {
            if (!$scope.newdevice.name) {
                alert('Name required');
                return;
            }
            if (!$scope.newdevice.icon) {
                $scope.newdevice.icon = 'ion-alert';
            }
            $scope.newdevice.id = $scope.devices.length + 2;
            $scope.devices.push($scope.newdevice);
            this.formScope.addDeviceForm.$setPristine();
            var defaultForm = {
                id: "",
                name: "",
                icon: "",
                status: "",
                color: "",
                userSelect: "",
                actionSelect: "",
                locationSelect: ""
            };
            $scope.newdevice = defaultForm;
        };
    })
    .controller('addLocation', function($scope) {
        $scope.setFormScope = function(scope) {
            this.formScope = scope;
        }
        $scope.newlocation = {};
        $scope.locationSubmit = function() {
            if (!$scope.newlocation.name) {
                alert('Name required');
                return;
            }
            if (!$scope.newlocation.icon) {
                $scope.newlocation.icon = 'ion-alert';
            }
            $scope.locations.push($scope.newlocation);
            this.formScope.addLocationForm.$setPristine();
            var defaultForm = {
                name: "",
                icon: "",
                note: ""
            };
            $scope.newlocation = defaultForm;
        };
    })
    .controller('addAction', function($scope) {
        $scope.setFormScope = function(scope) {
            this.formScope = scope;
        }
        $scope.newaction = {};
        $scope.newaction.type = 'range';
        $scope.newaction.state = 'on';
        $scope.actionSubmit = function() {
            if (!$scope.newaction.name) {
                alert('Name required');
                return;
            }
            if (!$scope.newaction.iconBefore) {
                $scope.newaction.iconBefore = 'ion-ios7-minus-empty';
            }
            if (!$scope.newaction.iconAfter) {
                $scope.newaction.iconAfter = 'ion-ios7-plus-empty';
            }
            if (!$scope.newaction.units) {
                $scope.newaction.units = 'units';
            }
            if (!$scope.newaction.minValue) {
                $scope.newaction.minValue = '0';
            }
            if (!$scope.newaction.maxValue) {
                $scope.newaction.maxValue = '100';
            }
            $scope.actions.push($scope.newaction);
            this.formScope.addActionForm.$setPristine();
            var defaultForm = {
                name: "",
                value: "",
                state: "",
                minValue: "",
                maxValue: "",
                units: "",
                iconBefore: "",
                iconAfter: "",
                deviceSelect: "",
                script: "",
                featured: ""
            };
            $scope.newaction = defaultForm;
        };
    })
    .directive('wrapOwlcarousel', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                var options = scope.$eval($(element).attr('data-options'));
                $(element).owlCarousel(options);
            }
        };
    });

function createHalfPie(id, limit, unit) {
    this.doAnim = function(value, divNum) {
        pathForeground.transition()
            .duration(750)
            .ease('cubic')
            .call(arcTween, value, oldValue, divNum);
    }
    var oldValue = 0;
    var pie = d3.layout.pie()
        .value(function(d) { return d })
        .sort(null);

    var w = 200,
        h = 140;

    var outerRadius = (w / 2) - 10;
    var innerRadius = 55;


    var color = ['#ececec', '#f06b3e', '#888888'];

    var colorOld = '#F00';
    var colorNew = '#0F0';

    var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(Math.PI);


    var arcLine = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0);

    var svg = d3.select(id)
        .append("svg")
        .style({
            'padding-top': '40px'
        })
        .attr({
            width: w,
            height: h,
            class: 'shadow',
        }).append('g')
        .attr({
            transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
        });

    var path = svg.append('path')
        .attr({
            d: arc,
            transform: 'rotate(-90)'
        }).attr({
            'stroke-width': "1",
            stroke: "#888888"
        })
        .style({
            fill: color[0]
        });

    var pathForeground = svg.append('path')
        .datum({ endAngle: 0 })
        .attr({
            d: arcLine,
            transform: 'rotate(-90)'
        })
        .style({
            fill: function(d, i) {
                return "#6c3";
            }
        });


    var middleCount = svg.append('text')
        .datum(0)
        .text(function(d) {
            return d;
        })
        .attr({
            class: 'middleText',
            'text-anchor': 'middle',
            dy: 0,
            dx: 2
        })
        .style({
            fill: d3.rgb('#000000'),
            'font-size': '30px'
        });

    var unitCount = svg.append('text')
        .datum(unit)
        .text(function(d) {
            return d;
        })
        .attr({
            id: unit,
            class: 'middleText',
            'text-anchor': 'middle',
            dy: 15,
            dx: 2
        })
        .style({
            fill: d3.rgb('#000000'),
            'font-size': '12px'
        });

    var minCount = svg.append('text')
        .datum(0)
        .text(function(d) {
            return d;
        })
        .attr({
            id: unit + 'min',
            class: 'middleText',
            'text-anchor': 'middle',
            dy: 25,
            dx: -72
        })
        .style({
            fill: d3.rgb('#000000'),
            'font-size': '14px'
        });

    var maxCount = svg.append('text')
        .datum(limit)
        .text(function(d) {
            return d;
        })
        .attr({
            id: unit + 'max',
            class: 'middleText',
            'text-anchor': 'middle',
            dy: 25,
            dx: 72
        })
        .style({
            fill: d3.rgb('#000000'),
            'font-size': '14px'
        });

    var arcTween = function(transition, newValue, old, divNum) {
        transition.attrTween("d", function(d) {
            var interpolate = d3.interpolate(d.endAngle, ((Math.PI)) * (newValue / divNum));
            var interpolateCount = d3.interpolate(old, newValue);
            oldValue = newValue;
            return function(t) {
                d.endAngle = interpolate(t);
                middleCount.text(newValue);

                return arcLine(d);
            };
        });
    };
}

function line(ylimit, id) {
    // Default settings
    var $el = d3.select(id)
    var width = 150;
    var height = 100;
    var color = "green";
    var margin = { top: 20, right: 30, bottom: 30, left: 20 };
    var data = [];
    var svg, y, line;
    var x = d3.scale.linear().range([0, 180]);

    var object = {};

    // Method for render/refresh graph
    object.render = function() {
        if (!svg) { // Render first time
            y = d3.scale.linear()
                .range([50, 0]);

            line = d3.svg.line()
                .x(function(d) { return x(d.x); })
                .y(function(d) { return y(d.y); })

            svg = $el.append("svg")
                .attr("width", 220)
                .attr("height", 100)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            x.domain([0, 2]);
            y.domain([0, ylimit]);

            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("stroke", color)
                .attr("d", line);
        } else { //Refresh
            object.data(data);
            svg.selectAll("path.line")
                .datum(data)
                .transition()
                .duration(1000)
                .attr("d", line);
        }
        return object;
    };

    // Getter and setter methods
    object.data = function(value) {
        if (!arguments.length) return data;
        data = value;
        return object;
    };

    object.$el = function(value) {
        if (!arguments.length) return $el;
        $el = value;
        return object;
    };

    object.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return object;
    };

    object.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return object;
    };

    object.color = function(value) {
        if (!arguments.length) return color;
        color = value;
        return object;
    };
    object.x = function(value) {
        if (!arguments.length) return x;
        x = value;
        return object;
    }
    return object;
};