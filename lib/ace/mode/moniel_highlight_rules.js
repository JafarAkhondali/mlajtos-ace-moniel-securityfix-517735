define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var lang = require("../lib/lang");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;

var MonielHighlightRules = function() {

   this.$rules = {
        "start" : [
            {
                regex : "{",
                token : "lparen",
                next  : "start"
            }, {
                regex : "}",
                token : "rparen",
                next  : "start"
            },
            
            {
                regex : "\\(",
                token : "lparen",
                next  : "blockParameters"
            },
            
            {
                regex : /\/\*/,
                token : "comment",
                next  : "comment"
            },

            {
                token : "comment",
                regex : /\/\/.*$/
            },
            
            {
                regex : "\\+",
                token : "entity.name.function",
                next  : "blockDefinition"
            },
            
            { /* Block Instance*/
                regex : "[A-Z][0-9a-zA-Z\u0080-\ufffe_]*",
                token : "entity.name.function",
                next  : "start"
            },
            
            { /* Operators */
                token : "keyword.operator",
                regex : "->|\\:|,|\\+"
            }, {
                token : "support.other",
                regex : "([a-z][0-9a-zA-Z_]*)"
            }
        ],
    "blockParameters": [
            {
                regex : "\\)",
                token : "rparen",
                next  : "start"
            }, {
                regex : "([a-z][0-9a-zA-Z_]*)",
                token : "variable.parameter"
            }, {
                regex : "=",
                token : "keyword.operator",
                next  : "blockParameter"
            }
        ],
    "blockDefinition": [
            { /* Block Definition*/
                regex : "[A-Z][0-9a-zA-Z\u0080-\ufffe_]*",
                token : "storage.type",
                next  : "start"
            }
    ],
    "blockParameter": [
            {
                regex : ",",
                token : "keyword.operator",
                next  : "blockParameters"
            }, {
                regex : "\\)",
                token : "rparen",
                next  : "start"
            }, {
                regex : "[0-9]+(x[0-9]+)+",
                token : "constant.numeric.shape"
            }, {
                regex : "([a-z][0-9a-zA-Z_]*)",
                token : "variable.parameter"
            } , {
                regex : "[A-Z][0-9a-zA-Z\u0080-\ufffe_]*",
                token : "storage.type"
            } , {
                regex : "[0-9]+(\.[0-9]+)?",
                token : "constant.numeric.number"
            }

        ],
    "comment": [
            {
                regex : /\*\//,
                token : "comment",
                next  : "start"
            },
            {
                defaultToken: "comment"
            }
        ]
   };
};

oop.inherits(MonielHighlightRules, TextHighlightRules);

exports.MonielHighlightRules = MonielHighlightRules;

});