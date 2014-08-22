;(function() {
  'use strict';

  // Meta directive
  // todo: parse configs obejct to deps
  angular
    .module('airpub')
    .directive('metaBackground', metaBackgroundDirective)
    .directive('metaShare', metaShareDirective);

  function metaBackgroundDirective($upyun) {
    var directive = {
      restrict: 'AE',
      require: 'ngModel',
      replace: true,
      link: link,
      template: [
        '<div id="metaBackground" class="meta-background clearfix">',
          '<form name="metaBackgroundForm">',
            '<input type="file" name="file" id="uploadBackgroundBtn" class="pull-left hidden-input"/>',
              '<span class="upload-background-btn glyphicon glyphicon-cloud-upload">',
            '上传背景图片',
            '</span>',
          '</form>',
        '</div>'
      ].join('\n')
    };
    return directive;

    function link(scope, element, attrs, ctrl) {
      var $ = angular.element;
      var uploading = false;

      // upyun configs
      $upyun.set('bucket', airpubConfigs.upyun.bucket);
      $upyun.set('form_api_secret', airpubConfigs.upyun.form_api_secret);

      var inputButton = document.getElementById('uploadBackgroundBtn');
      $(inputButton).on('change', bindUpload);

      // model => view
      ctrl.$render = function() {
        fillBackgroundImage(ctrl.$viewValue);
      };

      // upload images and fill uri
      function bindUpload(eve) {
        // begin upload
        if (uploading) return;
        uploading = true;
        $upyun.upload('metaBackgroundForm', function(err, response, image) {
          uploading = false;
          if (err) return console.error(err);
          var uploadOk = image.code === 200 && image.message === 'ok';
          if (!uploadOk) return;
          // fill image
          fillBackgroundImage(image.absUrl);
          // view => model
          ctrl.$setViewValue(image.absUrl);
        });
      }

      function fillBackgroundImage(uri) {
        if (!uri) return;
        if (uri.indexOf('http') !== 0) return;
        var hd = document.getElementsByTagName('header')[0];
        var self = document.getElementById('metaBackground');
        if (!hd) return;
        var style = {};
        style['background-image'] = 'url(' + uri + ')';
        $(hd).css(style);
        $(self).css(style);
      }
    }
  }

  function metaShareDirective($duoshuo) {
    var directive = {
      restrict: 'AE',
      require: 'ngModel',
      replace: true,
      link: link,
      template: [
        '<div id="metaShare" class="meta-share clearfix"">',
          '<input type="checkbox" ng-model="checkToShare" ng-change="updateCheckStatus()" />',
          '<span>分享到微博</span>',
        '</div>'
      ].join('\n')
    };
    return directive;

    function link(scope, element, attrs, ctrl) {
      scope.checkToShare = false;
      scope.updateCheckStatus = updateCheckingStatus;

      // bind events 
      scope.on('afterCreate', shareArticle());
      scope.on('afterUpdate', shareArticle());

      // view => model
      function updateCheckingStatus() {
        ctrl.$setViewValue(scope.checkToShare);
      }

      // share article
      function shareArticle(type) {
        return function(article) {
          return; // disable for temp
          if (!scope.checkToShare) return;
          var query = article;
          query.sync_to = type || 'weibo';
          query.short_name = duoshuoQuery.short_name;
          if (query.meta) delete query.meta;
          // todo: update this API
          return $duoshuo.post('threads/sync', query, function(){});
        };
      }
    }
  }
})();
