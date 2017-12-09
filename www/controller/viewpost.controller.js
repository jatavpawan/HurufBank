angular.module('viewpost.module.controller', []).controller('viewpost.controller', function ($scope, $rootScope, ionicToast, $state, httpServices, $ionicLoading, $ionicHistory, $location, $stateParams, $ionicPopup) {

    $scope.post = $stateParams.postData;

    $scope.comments = {}
    $scope.GetComments = function (DiscusssionID) {
        httpServices.get('/GetComments?discussionId=' + DiscusssionID).then(function (response) {
            $scope.comments = response.data;
        }, function (error) {
        });
    }
    $scope.GetComments($scope.post.DiscusssionID);

    $scope.goBack = function () {
        $rootScope.loginStatus = true;
        $ionicHistory.goBack();

    }
    $scope.Reply = function () {

        $scope.data = {}
        var myPopup = $ionicPopup.show({
            template: '<textarea placeholder="Comment here...." rows="10" ng-model="data.Comment"></textarea>',
            title: 'Comment Below',
            scope: $scope,
            buttons: [
                { text: 'Cancel' }, {
                    text: '<b>Post</b>',
                    type: 'button-positive',
                    onTap: function (e) {

                        if (!$scope.data.Comment) {
                            //don't allow the user to close unless he enters model...
                            e.preventDefault();
                        } else {
                            return $scope.data.Comment;
                        }
                    }
                }
            ]
        });

        myPopup.then(function (comment) {
            if (comment!=undefined) {
                var commentData = {};
                console.log('Tapped!', comment);
                commentData.Comment = comment;
                commentData.DiscusssionID = $scope.post.DiscusssionID;
                commentData.CommentBy = localStorage.getItem("UserID");
                commentData.CommentDate = new Date().toISOString();

                httpServices.post('AddComment', commentData).then(function (response) {
                    ionicToast.show(response.data.Success, 'bottom', false, 2500);
                    $scope.GetComments($scope.post.DiscusssionID);
                }, function (er) {
                    ionicToast.show('error occured', 'bottom', false, 2500);
                })
            }
        });
    }
    $scope.formatDate = function (postDate) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        var date = new Date(postDate);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

});