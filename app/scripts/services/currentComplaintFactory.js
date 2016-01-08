(function (angular) {

  var app = angular.module("app");

  app.factory("CurrentComplaintFactory", function () {

    var currentComplaint = {
      complaint : {},
      visible : false
    };

    return {

      getCurrentComplaint: function(){
        return currentComplaint;
      },

      updateCurrentComplaint: function (newComplaint) {
        currentComplaint.complaint = newComplaint;
      },

      setVisible : function (visible) {
        currentComplaint.visible = visible;
      }

    };

  });

})(angular);
