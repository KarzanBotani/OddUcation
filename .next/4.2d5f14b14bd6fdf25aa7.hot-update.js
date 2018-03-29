webpackHotUpdate(4,{

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("./node_modules/react/cjs/react.development.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__ = __webpack_require__("./node_modules/semantic-ui-react/dist/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ethereum_factory__ = __webpack_require__("./ethereum/factory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ethereum_post__ = __webpack_require__("./ethereum/post.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_general_Layout__ = __webpack_require__("./components/general/Layout.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ethereum_web3__ = __webpack_require__("./ethereum/web3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes__ = __webpack_require__("./routes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__routes__);

var _jsxFileName = '/home/ygeman/Projects/git/OddUcation/pages/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

(function () {
  var enterModule = __webpack_require__("./node_modules/react-hot-loader/patch.js").enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



 // import factory instance





// class components allow you to use lifecycle components like: componentDidMount

var PostIndex = function (_Component) {
  _inherits(PostIndex, _Component);

  function PostIndex() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PostIndex);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PostIndex.__proto__ || Object.getPrototypeOf(PostIndex)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      errorMessage: '',
      loading: false,
      postSummaries: [],
      postsCount: '',
      ownerName: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PostIndex, [{
    key: 'componentDidMount',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
        var postAddresses, allSum, ownerNames, postsCount, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, addr, p, o, n;

        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.t0 = this;
                _context.next = 4;
                return __WEBPACK_IMPORTED_MODULE_3__ethereum_factory__["a" /* default */].methods.postsCount().call();

              case 4:
                _context.t1 = _context.sent;
                _context.t2 = {
                  postsCount: _context.t1
                };

                _context.t0.setState.call(_context.t0, _context.t2);

                postAddresses = [];
                allSum = [];
                ownerNames = [];
                postsCount = void 0;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 14;
                _iterator = this.props.posts[Symbol.iterator]();

              case 16:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 31;
                  break;
                }

                addr = _step.value;
                p = Object(__WEBPACK_IMPORTED_MODULE_4__ethereum_post__["a" /* default */])(addr);
                _context.next = 21;
                return p.methods.getPostSummary().call();

              case 21:
                o = _context.sent;
                _context.next = 24;
                return __WEBPACK_IMPORTED_MODULE_3__ethereum_factory__["a" /* default */].methods.getProfile(o[0]).call();

              case 24:
                n = _context.sent;


                postAddresses.push(addr);
                allSum.push(o);
                ownerNames.push(n[1]);

              case 28:
                _iteratorNormalCompletion = true;
                _context.next = 16;
                break;

              case 31:
                _context.next = 37;
                break;

              case 33:
                _context.prev = 33;
                _context.t3 = _context['catch'](14);
                _didIteratorError = true;
                _iteratorError = _context.t3;

              case 37:
                _context.prev = 37;
                _context.prev = 38;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 40:
                _context.prev = 40;

                if (!_didIteratorError) {
                  _context.next = 43;
                  break;
                }

                throw _iteratorError;

              case 43:
                return _context.finish(40);

              case 44:
                return _context.finish(37);

              case 45:
                _context.next = 47;
                return this.setState({
                  postSummaries: { postAddresses: postAddresses, allSum: allSum, ownerNames: ownerNames }
                });

              case 47:
                _context.next = 52;
                break;

              case 49:
                _context.prev = 49;
                _context.t4 = _context['catch'](0);

                console.log(_context.t4);

              case 52:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 49], [14, 33, 37, 45], [38,, 40, 44]]);
      }));

      function componentDidMount() {
        return _ref2.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'renderPosts',
    value: function renderPosts() {
      try {
        var Group = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["c" /* Card */].Group,
            Content = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["c" /* Card */].Content,
            Header = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["c" /* Card */].Header,
            Meta = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["c" /* Card */].Meta,
            Description = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["c" /* Card */].Description;
        var _state = this.state,
            postSummaries = _state.postSummaries,
            postsCount = _state.postsCount;

        var q = [];

        for (var i = 0; i < postsCount; i++) {
          q[i] = __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_7__routes__["Link"],
            { route: '/posts/' + postSummaries.postAddresses[i], __source: {
                fileName: _jsxFileName,
                lineNumber: 65
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["c" /* Card */],
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 66
                }
              },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["i" /* Image */], { src: 'https://react.semantic-ui.com/assets/images/wireframe/image.png', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 67
                }
              }),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                Content,
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 68
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  Header,
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 69
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_6__ethereum_web3__["a" /* default */].utils.hexToUtf8(postSummaries.allSum[i][1])
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  Meta,
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 70
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    'span',
                    { style: { float: 'right' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 71
                      }
                    },
                    postSummaries.allSum[i][8],
                    ' views'
                  ),
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    'span',
                    {
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 72
                      }
                    },
                    'by ',
                    __WEBPACK_IMPORTED_MODULE_6__ethereum_web3__["a" /* default */].utils.hexToUtf8(postSummaries.ownerNames[i])
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  Content,
                  { extra: true, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 74
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    'span',
                    { style: { float: 'right' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 75
                      }
                    },
                    'up: ',
                    postSummaries.allSum[i][10],
                    ' / down: ',
                    postSummaries.allSum[i][11]
                  ),
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    'span',
                    {
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 76
                      }
                    },
                    'uploaded: ',
                    postSummaries.allSum[i][6]
                  )
                )
              )
            )
          );
        }

        return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["g" /* Grid */],
          { columns: 3, __source: {
              fileName: _jsxFileName,
              lineNumber: 85
            }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["g" /* Grid */].Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 86
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["g" /* Grid */].Column,
              { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 87
                }
              },
              q[0]
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["g" /* Grid */].Column,
              { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 88
                }
              },
              q[1]
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["g" /* Grid */].Column,
              { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 89
                }
              },
              q[2]
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["g" /* Grid */].Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 92
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["g" /* Grid */].Column,
              { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 93
                }
              },
              q[3]
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["g" /* Grid */].Column,
              { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 94
                }
              },
              q[4]
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["g" /* Grid */].Column,
              { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 95
                }
              },
              q[5]
            )
          )
        );
      } catch (err) {
        console.log(err);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var Row = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["g" /* Grid */].Row,
          Column = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["g" /* Grid */].Column;


      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5__components_general_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 108
          }
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["a" /* Advertisement */], { style: { width: '100%', backgroundColor: 'red' }, unit: 'large leaderboard', test: 'Splash text', __source: {
            fileName: _jsxFileName,
            lineNumber: 109
          }
        }),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["d" /* Container */],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 110
            }
          },
          this.renderPosts()
        )
      );
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }], [{
    key: 'getInitialProps',


    // getInitialProps is required by next. next wants to  get the data without having to render the component.
    // so it calls the getInitialProps function, with static.
    // getInitialProps is similar to componentDidMount.
    // by doing this, 'posts' can be referenced anywhere, because it is now a 'prop'
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var posts, usrsAddrs;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return __WEBPACK_IMPORTED_MODULE_3__ethereum_factory__["a" /* default */].methods.getDeployedPosts().call();

              case 2:
                posts = _context2.sent;
                _context2.next = 5;
                return __WEBPACK_IMPORTED_MODULE_3__ethereum_factory__["a" /* default */].methods.getUsers().call();

              case 5:
                usrsAddrs = _context2.sent;
                return _context2.abrupt('return', { posts: posts, usrsAddrs: usrsAddrs });

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getInitialProps() {
        return _ref3.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return PostIndex;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);

var _default = PostIndex;


/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("./node_modules/react-hot-loader/patch.js").default;

  var leaveModule = __webpack_require__("./node_modules/react-hot-loader/patch.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(PostIndex, 'PostIndex', '/home/ygeman/Projects/git/OddUcation/pages/index.js');
  reactHotLoader.register(_default, 'default', '/home/ygeman/Projects/git/OddUcation/pages/index.js');
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
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=4.2d5f14b14bd6fdf25aa7.hot-update.js.map