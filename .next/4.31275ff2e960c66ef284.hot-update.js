webpackHotUpdate(4,{

/***/ "./node_modules/video-react/dist/video-react.css":
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected character '@' (1:0)\nYou may need an appropriate loader to handle this file type.\n| @charset \"UTF-8\";\n| .video-react .video-react-big-play-button:before, .video-react .video-react-control:before {\n|   position: absolute;");

/***/ }),

/***/ "./pages/posts/show.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("./node_modules/react/cjs/react.development.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_video_react__ = __webpack_require__("./node_modules/video-react/dist/index.es.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_video_react_dist_video_react_css__ = __webpack_require__("./node_modules/video-react/dist/video-react.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_video_react_dist_video_react_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_video_react_dist_video_react_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__ = __webpack_require__("./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_general_Layout__ = __webpack_require__("./components/general/Layout.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ethereum_factory__ = __webpack_require__("./ethereum/factory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ethereum_post__ = __webpack_require__("./ethereum/post.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ethereum_web3__ = __webpack_require__("./ethereum/web3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routes__ = __webpack_require__("./routes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__routes__);

var _jsxFileName = "/home/ygeman/Projects/git/OddUcation/pages/posts/show.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

(function () {
  var enterModule = __webpack_require__("./node_modules/react-hot-loader/patch.js").enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



 // import css



 // not construct (capital P)



var PostShow = function (_Component) {
  _inherits(PostShow, _Component);

  function PostShow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PostShow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PostShow.__proto__ || Object.getPrototypeOf(PostShow)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      ownerName: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PostShow, [{
    key: "renderTables",
    value: function renderTables() {
      var Body = __WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["f" /* Table */].Body,
          Cell = __WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["f" /* Table */].Cell,
          Row = __WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["f" /* Table */].Row;
      var _props = this.props,
          owner = _props.owner,
          ownerName = _props.ownerName,
          title = _props.title,
          description = _props.description,
          contentHash = _props.contentHash,
          language = _props.language,
          postBalance = _props.postBalance,
          date = _props.date,
          length = _props.length,
          views = _props.views,
          viewFee = _props.viewFee,
          upVotes = _props.upVotes,
          downVotes = _props.downVotes,
          paymentOption = _props.paymentOption,
          state = _props.state,
          category = _props.category,
          type = _props.type,
          level = _props.level;


      var tab = __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["f" /* Table */],
        { celled: true, striped: true, __source: {
            fileName: _jsxFileName,
            lineNumber: 72
          }
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          Body,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 73
            }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 74
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 75
                }
              },
              "Author:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 76
                }
              },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_9__routes__["Link"],
                { route: "/users/" + owner, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 77
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "a",
                  { className: "item", __source: {
                      fileName: _jsxFileName,
                      lineNumber: 78
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_8__ethereum_web3__["a" /* default */].utils.hexToUtf8(ownerName)
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 85
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 86
                }
              },
              "Remaining Pool:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 87
                }
              },
              postBalance
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 90
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 91
                }
              },
              "Uploaded:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 92
                }
              },
              date
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 95
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 96
                }
              },
              "Views:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 97
                }
              },
              views
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 100
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 101
                }
              },
              "Length:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 102
                }
              },
              length
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 105
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 106
                }
              },
              "Level:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 107
                }
              },
              function () {
                switch (level) {
                  case "0":
                    return "Introductory";
                  case "1":
                    return "Beginner";
                  case "2":
                    return "Intermediate";
                  case "3":
                    return "Advanced";
                }
              }()
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 119
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 120
                }
              },
              "Language:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 121
                }
              },
              language
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 124
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 125
                }
              },
              "Category:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 126
                }
              },
              function () {
                switch (category) {
                  case "0":
                    return "Programming";
                  case "1":
                    return "Math";
                }
              }()
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 136
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 137
                }
              },
              "Upvotes:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 138
                }
              },
              upVotes
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 141
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 142
                }
              },
              "Downvotes:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 143
                }
              },
              downVotes
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 146
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 147
                }
              },
              "View fee:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 148
                }
              },
              viewFee
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 151
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 152
                }
              },
              "State:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 153
                }
              },
              function () {
                switch (state) {
                  case "0":
                    return "Draft";
                  case "1":
                    return "Published";
                  case "2":
                    return "Archived";
                }
              }()
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 164
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 165
                }
              },
              "Type:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 166
                }
              },
              function () {
                switch (type) {
                  case "0":
                    return "Audio";
                  case "1":
                    return "Text";
                  case "2":
                    return "Video";
                }
              }()
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 179
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { collapsing: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 180
                }
              },
              "Payment Option:"
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              Cell,
              { textAlign: "right", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 181
                }
              },
              function () {
                switch (paymentOption) {
                  case "0":
                    return "Regular";
                  case "1":
                    return "Organization";
                }
              }()
            )
          )
        )
      );

      return tab;
    }
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5__components_general_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 199
          }
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          "h3",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 200
            }
          },
          this.props.title
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["c" /* Grid */],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 202
            }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["c" /* Grid */].Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 204
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["c" /* Grid */].Column,
              { width: 16, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 205
                }
              },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_video_react__["a" /* Player */],
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 206
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("source", { src: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 207
                  }
                })
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["c" /* Grid */].Column,
            { width: 10, __source: {
                fileName: _jsxFileName,
                lineNumber: 212
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["a" /* Card */],
              { fluid: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 213
                }
              },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["a" /* Card */].Content, { header: "Description:", __source: {
                  fileName: _jsxFileName,
                  lineNumber: 214
                }
              }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["a" /* Card */].Content, {
                description: "Lorem ipsum dolor sit amet, cu harum tollit temporibus nec, no solum melius quaerendum cum. Id soleat postea pro. Accumsan sapientem mei at, ne dicat nonumy sanctus sea. Fuisset atomorum eu qui. Nostro nominavi salutandi ut mei, ludus epicurei evertitur cu cum. Illum scribentur ad sit, ad per facer eligendi. Cum te idque blandit postulant, at minim verterem erroribus nam, choro platonem ius ut. Graeco quaestio ea mei. Nam wisi albucius hendrerit ei, mel cu ferri ignota phaedrum. Eu mei tollit mollis referrentur. Eum id viderer reprimique. Eos ex alia enim omittantur, mazim melius posidonium at nam. Ut his tantas mucius. Ne modo singulis intellegebat his. Ne vis porro adipisci perpetua, vel ludus salutatus cu.",
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 215
                }
              })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_semantic_ui_react__["c" /* Grid */].Column,
            { width: 6, __source: {
                fileName: _jsxFileName,
                lineNumber: 221
              }
            },
            this.renderTables()
          )
        )
      );
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(props) {
        var post, summary, enumSummary, n;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                post = Object(__WEBPACK_IMPORTED_MODULE_7__ethereum_post__["a" /* default */])(props.query.address);
                _context.next = 3;
                return post.methods.getPostSummary().call();

              case 3:
                summary = _context.sent;
                _context.next = 6;
                return post.methods.getPostSummaryEnums().call();

              case 6:
                enumSummary = _context.sent;
                _context.next = 9;
                return __WEBPACK_IMPORTED_MODULE_6__ethereum_factory__["a" /* default */].methods.getProfile(summary[0]).call();

              case 9:
                n = _context.sent;
                return _context.abrupt("return", {
                  owner: summary[0],
                  ownerName: n[1],
                  title: __WEBPACK_IMPORTED_MODULE_8__ethereum_web3__["a" /* default */].utils.toAscii(summary[1]),
                  description: __WEBPACK_IMPORTED_MODULE_8__ethereum_web3__["a" /* default */].utils.toAscii(summary[2]),
                  contentHash: summary[3],
                  language: __WEBPACK_IMPORTED_MODULE_8__ethereum_web3__["a" /* default */].utils.toAscii(summary[4]),
                  postBalance: summary[5],
                  date: summary[6],
                  length: summary[7],
                  views: summary[8],
                  viewFee: summary[9],
                  upVotes: summary[10],
                  downVotes: summary[11],
                  paymentOption: enumSummary[0],
                  state: enumSummary[1],
                  category: enumSummary[2],
                  type: enumSummary[3],
                  level: enumSummary[4],
                  postSummary: summary
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref2.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return PostShow;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);

var _default = PostShow;


/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("./node_modules/react-hot-loader/patch.js").default;

  var leaveModule = __webpack_require__("./node_modules/react-hot-loader/patch.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PostShow, "PostShow", "/home/ygeman/Projects/git/OddUcation/pages/posts/show.js");
  reactHotLoader.register(_default, "default", "/home/ygeman/Projects/git/OddUcation/pages/posts/show.js");
  leaveModule(module);
})();

;
    (function (Component, route) {
      if(!Component) return
      if (false) return
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/posts/show")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=4.31275ff2e960c66ef284.hot-update.js.map