define([
    "dojo/_base/array",
    "dojo/query",
    "dojo/on",
    "dojo/_base/declare",
    "dojo/_base/lang",

    "dijit/_CssStateMixin",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",

    "dijit/form/Textarea",

    "epi/epi",
    "epi/shell/widget/_ValueRequiredMixin"
],

    function (
        array,
        query,
        on,
        declare,
        lang,

        _CssStateMixin, //_CssStateMixin is a mixin for widgets that set CSS classes on their nodes depending on hover/active/focused state, and also semantic state (checked, selected, disabled, etc.). 
        _Widget, //BaseClass for all dijit widgets 
        _TemplatedMixin, //dijit/_TemplatedMixin is a mixin for most widgets in dijit. It takes an HTML template, and creates the widget’s DOM tree according to that template.


        _WidgetsInTemplateMixin, //When using this template in a directly extended widget class, you will need to mixin dijit._WidgetsInTemplateMixin in addition to dijit._TemplatedMixin. 

        Textarea,

        epi,
        _ValueRequiredMixin //Extends dijit/_CssStateMixin: http://world.episerver.com/Documentation/Javascript-Library/?documentId=episerverframework/7.1/epi/shell/widget/_ValueRequiredMixin 
    ) {
        return declare("alloy.editors.NewTextarea", [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin, _CssStateMixin, _ValueRequiredMixin], {
            templateString: '<div class="dijitInline">\
                                <div data-dojo-attach-point="textArea" data-dojo-type="dijit.form.Textarea"></div>\
                             <div>',
            baseClass: "epiString",

            helptext: "YOLO HELP",
            intermediateChanges: false, //default false. intermediatechanges is a dijit property which fire the change event when there is an actually change.  
            value: null,
            onChange: function (value) {
                // Event 
            },

            //built-in dijit widget. postCreate is run after all the properties are set up, but before the templateString is added to the DOM 
            postCreate: function () {

                // call base implementation 
                this.inherited(arguments);

                // Init textarea and bind event 
                this.textArea.set("intermediateChanges", this.intermediateChanges);

                // Notice the lang.hitch. It forces the on method to retain it’s original scope.   
                on(this.textArea, "change", lang.hitch(this, this._onTextAreaChanged));
            },

            //built-in dijit widget. Runs after the templateString is added to the DOM.  
            startup: function () {

            },

            // build-in dojo method. Prevents an invalid form from submitting 
            isValid: function () {
                return !this.required || lang.isArray(this.value) && this.value.length > 0 && this.value.join() != "";
            },

            // Setter for value property. Runs at startup.  
            _setValueAttr: function (value) {
                this._setValue(value, true);
            },

            //runs at startup.  
            _setReadOnlyAttr: function (value) {
                this._set("readOnly", value);
                this.textArea.set("readOnly", value);
            },

            //A setter for intermediateChanges 
            _setIntermediateChangesAttr: function (value) {
                this.textArea.set("intermediateChanges", value);
                this._set("intermediateChanges", value);
            },

            // Event handler for textarea 
            _onTextAreaChanged: function (value) {
                this._setValue(value, false);
            },

            _setValue: function (value, updateTextarea) {

                //avoids running this if the widget already is started 
                if (this._started && epi.areEqual(this.value, value)) {
                    return;
                }

                // set value to this widget (and notify observers). Built-in dijit method. Source: https://www.sitepen.com/blog/2013/10/16/dojo-faq-what-is-the-difference-between-set-and-_set/ 
                this._set("value", value);

                // set value to textarea 
                updateTextarea && this.textArea.set("value", value);

                if (this._started && this.validate()) {
                    // Trigger change event 
                    this.onChange(value);
                }
            },
        });
    }); 