webpackHotUpdate(6,{

/***/ "./pages/posts/new.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("./node_modules/react/cjs/react.development.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__ = __webpack_require__("./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_general_Layout__ = __webpack_require__("./components/general/Layout.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ethereum_factory__ = __webpack_require__("./ethereum/factory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__ = __webpack_require__("./ethereum/web3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__routes__ = __webpack_require__("./routes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__routes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__routes__);

var _jsxFileName = "/home/ygeman/Projects/git/OddUcation/pages/posts/new.js";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

(function () {
  var enterModule = __webpack_require__("./node_modules/react-hot-loader/patch.js").enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// You need 'Component' when it is a class based component



 // import factory instance

 // Link = react component for <a> tags - navigation. Router = redirect from one page to another

var PostNew = function (_Component) {
  _inherits(PostNew, _Component);

  function PostNew() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, PostNew);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PostNew.__proto__ || Object.getPrototypeOf(PostNew)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      errorMessage: '',
      loading: false,
      title: '',
      description: '',
      contentHash: '',
      language: '',
      date: '',
      length: '',
      viewFee: '',
      viewFeePercentage: '',
      paymentOption: '0',
      state: '0',
      category: '0',
      pType: '0',
      level: '0',
      postCount: ''
    }, _this.onSubmit = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(event) {
        var accounts, a;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();

                _this.setState({ loading: true, errorMessage: '' });

                _context.prev = 2;
                _context.next = 5;
                return __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].eth.getAccounts();

              case 5:
                accounts = _context.sent;
                _context.next = 8;
                return __WEBPACK_IMPORTED_MODULE_4__ethereum_factory__["a" /* default */].methods.createPost(__WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.utf8ToHex(_this.state.title), __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.utf8ToHex(_this.state.description), __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.utf8ToHex(_this.state.contentHash), __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.utf8ToHex(_this.state.language), _this.state.date, _this.state.length, _this.state.viewFee, _this.state.viewFeePercentage, _this.state.paymentOption, _this.state.state, _this.state.category, _this.state.pType, _this.state.level).send({ from: accounts[0] });

              case 8:
                a = _context.sent;


                __WEBPACK_IMPORTED_MODULE_6__routes__["Router"].pushRoute('/');
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](2);

                _this.setState({ errorMessage: _context.t0.message });

              case 15:

                _this.setState({ loading: false });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[2, 12]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PostNew, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3__components_general_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 66
          }
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["d" /* Container */],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 67
            }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            "h3",
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 68
              }
            },
            "Create A Post"
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */],
            { onSubmit: this.onSubmit, error: !!this.state.errorMessage, __source: {
                fileName: _jsxFileName,
                lineNumber: 70
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Field,
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 71
                }
              },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["j" /* Input */], { label: "Title", labelPosition: "right", size: "mini", value: this.state.title,
                onChange: function onChange(event) {
                  return _this3.setState({ title: event.target.value });
                }, style: { marginTop: '15px' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 72
                }
              }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["j" /* Input */], { label: "Description", labelPosition: "right", size: "mini", value: this.state.description,
                onChange: function onChange(event) {
                  return _this3.setState({ description: event.target.value });
                }, style: { marginTop: '15px' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 75
                }
              }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["j" /* Input */], { label: "Content Hash", labelPosition: "right", size: "mini", value: this.state.contentHash,
                onChange: function onChange(event) {
                  return _this3.setState({ contentHash: event.target.value });
                }, style: { marginTop: '15px' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 78
                }
              }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["j" /* Input */], { label: "Language", labelPosition: "right", size: "mini", value: this.state.language,
                onChange: function onChange(event) {
                  return _this3.setState({ language: event.target.value });
                }, style: { marginTop: '15px' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 81
                }
              }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["j" /* Input */], { label: "Date", labelPosition: "right", size: "mini", value: this.state.date,
                onChange: function onChange(event) {
                  return _this3.setState({ date: event.target.value });
                }, style: { marginTop: '15px' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 84
                }
              }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["j" /* Input */], { label: "Length", labelPosition: "right", size: "mini", value: this.state.length,
                onChange: function onChange(event) {
                  return _this3.setState({ length: event.target.value });
                }, style: { marginTop: '15px' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 87
                }
              }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["j" /* Input */], { label: "View Fee", labelPosition: "right", size: "mini", value: this.state.viewFee,
                onChange: function onChange(event) {
                  return _this3.setState({ viewFee: event.target.value });
                }, style: { marginTop: '15px' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 90
                }
              }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["j" /* Input */], { label: "View Fee Percentage", labelPosition: "right", size: "mini", value: this.state.viewFeePercentage,
                onChange: function onChange(event) {
                  return _this3.setState({ viewFeePercentage: event.target.value });
                }, style: { marginTop: '15px' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 93
                }
              }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Group,
                { inline: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 96
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "label",
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 97
                    }
                  },
                  "Payment Option: "
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Personal",
                  name: "paymentOption",
                  checked: this.state.paymentOption === 0,
                  onChange: function onChange(event) {
                    return _this3.setState({ paymentOption: 0 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 99
                  }
                }),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Organization",
                  name: "paymentOption",
                  checked: this.state.paymentOption === 1,
                  onChange: function onChange(event) {
                    return _this3.setState({ paymentOption: 1 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 105
                  }
                })
              ),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Group,
                { inline: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 113
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "label",
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 114
                    }
                  },
                  "State: "
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Draft",
                  name: "state",
                  checked: this.state.state === 0,
                  onChange: function onChange(event) {
                    return _this3.setState({ state: 0 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 116
                  }
                }),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Published",
                  name: "state",
                  checked: this.state.state === 1,
                  onChange: function onChange(event) {
                    return _this3.setState({ state: 1 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 123
                  }
                }),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Archived",
                  name: "state",
                  checked: this.state.state === 2,
                  onChange: function onChange(event) {
                    return _this3.setState({ state: 2 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 130
                  }
                })
              ),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Group,
                { inline: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 138
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "label",
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 139
                    }
                  },
                  "Category: "
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Programming",
                  name: "category",
                  checked: this.state.category === 0,
                  onChange: function onChange(event) {
                    return _this3.setState({ category: 0 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 141
                  }
                }),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Math",
                  name: "category",
                  checked: this.state.category === 1,
                  onChange: function onChange(event) {
                    return _this3.setState({ category: 1 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 147
                  }
                })
              ),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Group,
                { inline: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 155
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "label",
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 156
                    }
                  },
                  "Post Type: "
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Audio",
                  name: "pType",
                  checked: this.state.pType === 0,
                  onChange: function onChange(event) {
                    return _this3.setState({ pType: 0 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 158
                  }
                }),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Text",
                  name: "pType",
                  checked: this.state.pType === 1,
                  onChange: function onChange(event) {
                    return _this3.setState({ pType: 1 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 165
                  }
                }),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Video",
                  name: "pType",
                  checked: this.state.pType === 2,
                  onChange: function onChange(event) {
                    return _this3.setState({ pType: 2 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 172
                  }
                })
              ),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Group,
                { inline: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 180
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "label",
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 181
                    }
                  },
                  "Post Level: "
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Introductory",
                  name: "level",
                  checked: this.state.level === 0,
                  onChange: function onChange(event) {
                    return _this3.setState({ level: 0 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 183
                  }
                }),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Beginner",
                  name: "level",
                  checked: this.state.level === 1,
                  onChange: function onChange(event) {
                    return _this3.setState({ level: 1 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 190
                  }
                }),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Intermediate",
                  name: "level",
                  checked: this.state.level === 2,
                  onChange: function onChange(event) {
                    return _this3.setState({ level: 2 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 197
                  }
                }),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Form */].Radio, {
                  label: "Advanced",
                  name: "level",
                  checked: this.state.level === 3,
                  onChange: function onChange(event) {
                    return _this3.setState({ level: 3 });
                  },
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 204
                  }
                })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["l" /* Message */], { error: true, header: "Oops!", content: this.state.errorMessage, __source: {
                fileName: _jsxFileName,
                lineNumber: 214
              }
            }),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["b" /* Button */],
              { loading: this.state.loading, primary: true, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 216
                }
              },
              "Create"
            )
          )
        )
      );
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }]);

  return PostNew;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);

;

var _default = PostNew;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("./node_modules/react-hot-loader/patch.js").default;

  var leaveModule = __webpack_require__("./node_modules/react-hot-loader/patch.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PostNew, "PostNew", "/home/ygeman/Projects/git/OddUcation/pages/posts/new.js");
  reactHotLoader.register(_default, "default", "/home/ygeman/Projects/git/OddUcation/pages/posts/new.js");
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
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/posts/new")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=6.e3d7b7599d477d631f9b.hot-update.js.map