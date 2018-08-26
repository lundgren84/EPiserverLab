define([
  'dojo/_base/declare',
  'dijit/_Widget',
  'dijit/_TemplatedMixin',
], function (
  declare,
  _Widget,
  _TemplatedMixin
) {
  return declare(
    'alloy.editors.RowLayoutPicker',
    [_Widget, _TemplatedMixin],
    {
        templateString: '<div class="rowlayoutpicker dijitInline" tabindex="-1" role="presentation"> \
                         <style> \
                         .rowlayoutpicker { \
                           display: inline-block; \
                           max-width: 672px; \
                         } \
                         .rowlayoutcontainer { \
                           background: #f8f9f9; \
                           border: 1px solid #eaeaea; \
                         } \
                         .rowlayoutcontainer img { \
                           display: inline-block; \
                           margin: 7px; \
                           cursor: pointer; \
                         } \
                         .rowlayoutcontainer img.selected { \
                           border: 2px solid #f7542b; \
                           margin: 5px; \
                         } \
                         .rowlayoutpicker em { \
                           font-size: 11px; \
                           display: inline-block; \
                           margin-top: 3px; \
                         } \
                         .rowlayoutsection { \
                           margin-bottom: 10px; \
                         } \
                         .rowlayoutsection h3 { \
                           margin: 5px; \
                           font-size: 12px; \
                           border-bottom: 1px solid #eaeaea; \
                           padding: 0 0 3px 0; \
                         } \
                         </style> \
                         <div class="rowlayoutcontainer"></div> \
                         <div><em>The numbers in the layouts above corresponds to the position of the block in the content area</em></div> \
                       </div>',
      postCreate: function () {
        var that = this;
        that.$container = $(that.domNode).find('.rowlayoutcontainer');
        var html = '';

        var layoutsByBlockCount = [];

        Object.keys(that.layoutOptions).forEach(function (option) {
          var layoutOption = that.layoutOptions[option];
          var count = layoutOption.reduce(function (prev, next) {
            return prev + (next.childHeights.length ? next.childHeights.length : 1);
          }, 0);
          if (!layoutsByBlockCount[count]) {
            layoutsByBlockCount[count] = [];
          }
          layoutsByBlockCount[count].push(option);
        });

        Object.keys(layoutsByBlockCount).forEach(function (count) {
          var option = layoutsByBlockCount[count].value;

          html += '<div class="rowlayoutsection"><h3>With ' + count + ' blocks</h3>';

          layoutsByBlockCount[count].forEach(function (option) {
            // We replace `:` with `-` because we get for eg. `1:2` from the server as a ratio, but
            // files can't contain `:`
            var file = option.replace(/:/g, '-') + '.png';
            var image = '/ClientResources/Scripts/Editors/RowLayoutImages/' + file;
            html +=
              '<img' +
              '  class="' + (option === that.value ? 'selected' : '') +'"' +
              '  data-option="' + option + '" src="' + image + '"' +
              '>';
          });

          html += '</div>'
        });
        that.$container.html(html);
        that.$container.click(function (e) {
          var $target = $(e.target);
          if ($target.is('img')) {
            var option = $target.attr('data-option');

            if (option !== that.value) {
              that.set('value', option);
              that.onChange(option);
            }
          }
        });
      },
      _setValueAttr: function (value) {
        var that = this;
        that._set('value', value);

        // Somehow this is called before `postCreate`
        if (that.$container) {
          that.$container.find('.selected').removeClass('selected');
          that.$container.find('[data-option="' + value + '"]').addClass('selected');
        }
      }
    }
  );
});
