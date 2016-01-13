(function (angular) {

  var app = angular.module("app");

  app.factory("NewComplaintFactory", function () {

    var newComplaint = {
      complaint : {},
      visible : false
    };

    return {

      getNewComplaint: function() {
        return newComplaint;
      },

      setGpsPosition : function (position) {
        newComplaint.complaint.latitude = position.latitude;
        newComplaint.complaint.longitude = position.longitude;
      },

      setVisible : function (visible) {
        newComplaint.visible = visible;
      },

      setEmpty : function () {
        newComplaint.complaint = {};
      }

    };

  });

})(angular);
