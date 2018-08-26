define([
    "dojo/_base/declare",
    "dijit/_Widget",
    "dijit/_TemplatedMixin"
], function (
    declare,
    _Widget,
    _TemplatedMixin) {

    return declare([_Widget, _TemplatedMixin], {

        // templateString: [protected] String
        //    A string that represents the default widget template.
        templateString: '<div class="dijitInline" tabindex="-1" role="presentation"> \
                      <input hidden class="thostestemail" type="email" data-dojo-attach-point="email" data-dojo-attach-event="onchange:_onChange" /> \
                      <div data-id="1" id="1" data-val="1-Yolo"      class="col1 dojo-col "><span>1</span></div> \
                      <div data-id="2" id="2" data-val="2-LiveOrDie" class="col2 dojo-col "><span>2</span></div> \
                      <div data-id="3" id="3" data-val="3-DOIt"      class="col3 dojo-col "><span>3</span></div> \
                        <style> \
                           .thostestemail{\
                               display:hidden;\
                               }\
                           .dojo-col{ \
                               height: 50px; \
                               width: 50px; \
                               BACKGROUND-COLOR: green; \
                               display: inline-block; \
                               margin: 10px; \
                           }\
                          .dojo.col span{ \
                                color:black;\
                                pointer-events: none;\
                           }\
                          .active{\
                               border: 2px solid:gold;\
                               BACKGROUND-COLOR: GOLD; \
                           }\
                        </style> \
                     </div>',

            _setValueAttr: function (value) {
                // summary:
                //    Sets the value of the widget to "value" and updates the value displayed in the textbox.
                // tags:
                //    private

                this._set('value', value);
                this.email.value = this.value || '';
            },
            _onChange: function (event) {
                // summary:
                //    Handles the textbox change event and populates this to the onChange method.
                // tags:
                //    private

                this._set('value', event.target.value);
                this.onChange(this.value);
            },
            onChange: function (value) {
                // Event
            },
            _onClick: function (event) {
                // summary:
                //    Handles the textbox change event and populates this to the onChange method.
                // tags:
                //    private
                var box = event.target.attr('data-val');
                console.log("Clicked!")
                this._set('value', box);
                this.onChange(this.value);
            },
            onClick: function (value) {
                // Event
            },
            postCreate: function () {
                // summary:
                //    Connects keyboard events of the email textbox to update the value of the editor.
                // tags:
                //    protected
                var that = this;
                that.$container = $(that.domNode).find('.dojo-col');
                that.$container.click(function (e) {
                    var $target = $(e.target);
                    var option = $target.attr('data-val');
                    console.log("Here it comes!!: " + option)
                    //thostestemail
                    var inputNode = $(that.domNode).find('.thostestemail');
                    inputNode.val(option);

                    $(that.domNode).find('.dojo-col').removeClass("active");

                    var idd = $target.attr("data-id");
                    console.log(idd);
                    var activeContainer = $(that.domNode).find('#' + idd)
                    activeContainer.addClass("active");

                    that.set('value', option);
                    that.onChange(option);

                });
            },

            _onIntermediateChange: function (event) {
                // summary:
                //    Handles the textbox key press events event and populates this to the onChange method.
                // tags:
                //    private

                if (this.intermediateChanges) {
                    this._set('value', event.target.value);
                    this.onChange(this.value);
                }
            },
            focus: function () {
                // summary:
                //    Put focus on this widget.
                // tags:
                //    public

                dijit.focus(this.email);
            },
            isValid: function () {
                // summary:
                //    Indicates whether the current value is valid.
                // tags:
                //    public

                //var emailRegex = '[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+';
                //if (!this.required) {
                //    emailRegex = '(' + emailRegex + ')?';
                //}
                //var regex = new RegExp('^' + emailRegex + '$');
                return this.value;
            },
            _showChildDialog: function () {
                var dialog = dijit.Dialog({
                    title: 'Child Dialog'
                });
                this.connect(dialog, 'onHide', this._onHide);

                this.isShowingChildDialog = true;

                dialog.show();
            },

            _onHide: function () {
                this.isShowingChildDialog = false;
            }
        })
    });