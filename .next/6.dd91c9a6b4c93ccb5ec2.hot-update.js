webpackHotUpdate(6,{

/***/ "./pages/users/members.js":
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__profile__ = __webpack_require__("./pages/users/profile.js");

var _jsxFileName = "/home/ygeman/Projects/git/OddUcation/pages/users/members.js";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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




var ShowMembers = function (_Component) {
  _inherits(ShowMembers, _Component);

  function ShowMembers() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShowMembers);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShowMembers.__proto__ || Object.getPrototypeOf(ShowMembers)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      errorMessage: '',
      loading: false,
      userAddress: '',
      balance: '0',
      name: '',
      role: '',
      organizationMembersCount: '0',
      organizationMembers: '',
      posts: '',
      userPostsCount: '0',
      socialMedia1: '',
      socialMedia2: '',
      socialMedia3: '',
      addressToAdd: ''
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShowMembers, [{
    key: "componentDidMount",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
        var accounts, balance, profileSummary, userPostsCount;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].eth.getAccounts();

              case 3:
                accounts = _context.sent;
                _context.next = 6;
                return __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].eth.getBalance(accounts[0]);

              case 6:
                balance = _context.sent;
                _context.next = 9;
                return __WEBPACK_IMPORTED_MODULE_4__ethereum_factory__["a" /* default */].methods.getProfile(accounts[0]).call();

              case 9:
                profileSummary = _context.sent;
                _context.next = 12;
                return __WEBPACK_IMPORTED_MODULE_4__ethereum_factory__["a" /* default */].methods.userPostsCount(accounts[0]).call();

              case 12:
                userPostsCount = _context.sent;


                this.setState({ userAddress: accounts[0] });
                this.setState({ balance: balance });

                if (profileSummary[0] === '1') {
                  this.setState({ role: 'Regular' });
                } else if (profileSummary[0] === '2') {
                  this.setState({ role: 'Organization' });
                  this.setState({ organizationMembers: profileSummary[4] });
                  console.log(this.state.organizationMembers);
                  console.log(_typeof(this.state.organizationMembers));
                  this.setState({ organizationMembersCount: profileSummary[4].length });
                }

                this.setState({ name: __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.hexToUtf8(profileSummary[1]) });
                this.setState({ socialMedia1: __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.hexToUtf8(profileSummary[2][0]) });
                this.setState({ socialMedia2: __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.hexToUtf8(profileSummary[2][1]) });
                this.setState({ socialMedia3: __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.hexToUtf8(profileSummary[2][2]) });
                this.setState({ posts: profileSummary[3] });
                this.setState({ userPostsCount: userPostsCount });
                _context.next = 27;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context["catch"](0);

                console.log(_context.t0);

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 24]]);
      }));

      function componentDidMount() {
        return _ref2.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "renderEssentials",
    value: function renderEssentials() {
      var Content = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["b" /* Card */].Content,
          Header = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["b" /* Card */].Header,
          Meta = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["b" /* Card */].Meta,
          Description = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["b" /* Card */].Description;


      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["b" /* Card */],
        { fluid: true, __source: {
            fileName: _jsxFileName,
            lineNumber: 65
          }
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          Content,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 66
            }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Header,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 67
              }
            },
            this.state.name,
            " (",
            this.state.role,
            ")"
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Meta,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 68
              }
            },
            this.state.organizationMembersCount,
            " members"
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Meta,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 69
              }
            },
            this.state.userPostsCount,
            " posts"
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Description,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 70
              }
            },
            "Balance: ",
            __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.fromWei(this.state.balance, 'ether'),
            " (ETH)"
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Content,
            { extra: true, __source: {
                fileName: _jsxFileName,
                lineNumber: 71
              }
            },
            this.state.socialMedia1
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Content,
            { extra: true, __source: {
                fileName: _jsxFileName,
                lineNumber: 72
              }
            },
            this.state.socialMedia2
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Content,
            { extra: true, __source: {
                fileName: _jsxFileName,
                lineNumber: 73
              }
            },
            this.state.socialMedia3
          )
        )
      );
    }
  }, {
    key: "renderMembers",
    value: function renderMembers() {
      var Header = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Table */].Header,
          Row = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Table */].Row,
          HeaderCell = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Table */].HeaderCell,
          Body = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Table */].Body,
          Cell = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Table */].Cell;


      for (var value in this.state.organizationMembers) {
        console.log(value);
      }

      // return this.state.organizationMembers.map((mem, index) => {
      //   return (
      //     <Row>
      //       <Cell>index {index}</Cell>
      //       <Cell>mem {mem}</Cell>
      //     </Row>
      //   );
      // });

      // for (let value of this.state.organizationMembers) {
      //   return (
      //     <Row>
      //       <Cell>{value}</Cell>
      //     </Row>
      //   );
      // }
    }
  }, {
    key: "render",
    value: function render() {
      var Header = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Table */].Header,
          Row = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Table */].Row,
          HeaderCell = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Table */].HeaderCell,
          Body = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Table */].Body,
          Cell = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Table */].Cell;


      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3__components_general_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 109
          }
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_6__routes__["Link"],
          { route: "/users/" + this.state.userAddress, __source: {
              fileName: _jsxFileName,
              lineNumber: 111
            }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            "a",
            { className: "item", __source: {
                fileName: _jsxFileName,
                lineNumber: 112
              }
            },
            "Back"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          "h3",
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 115
            }
          },
          "ShowUsers"
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["d" /* Grid */],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 117
            }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["d" /* Grid */].Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 118
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["d" /* Grid */].Column,
              { width: 4, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 119
                }
              },
              this.renderEssentials(),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_6__routes__["Link"],
                { route: "/posts/new", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 122
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "a",
                  { className: "item", __source: {
                      fileName: _jsxFileName,
                      lineNumber: 123
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["a" /* Button */], { fluid: true, content: "Create Post", icon: "add circle", primary: true, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 124
                    }
                  })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_6__routes__["Link"],
                { route: "/users/" + this.state.userAddress + "/add-user", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 128
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "a",
                  { className: "item", __source: {
                      fileName: _jsxFileName,
                      lineNumber: 129
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["a" /* Button */], { fluid: true, content: "Add User", icon: "add circle", primary: true, style: { marginTop: '10px' }, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 130
                    }
                  })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_6__routes__["Link"],
                { route: "/users/" + this.state.userAddress + "/show-users", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 134
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "a",
                  { className: "item", __source: {
                      fileName: _jsxFileName,
                      lineNumber: 135
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["a" /* Button */], { fluid: true, content: "Show Users", icon: "add circle", primary: true, style: { marginTop: '10px' }, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 136
                    }
                  })
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["d" /* Grid */].Column,
              { width: 12, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 142
                }
              },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["f" /* Table */],
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 144
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  Header,
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 145
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    Row,
                    {
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 146
                      }
                    },
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                      HeaderCell,
                      {
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 147
                        }
                      },
                      "User Address"
                    )
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  Body,
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 151
                    }
                  },
                  this.renderMembers()
                )
              )
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

  return ShowMembers;
}(__WEBPACK_IMPORTED_MODULE_1_react__["Component"]);

var _default = ShowMembers;


/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("./node_modules/react-hot-loader/patch.js").default;

  var leaveModule = __webpack_require__("./node_modules/react-hot-loader/patch.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ShowMembers, "ShowMembers", "/home/ygeman/Projects/git/OddUcation/pages/users/members.js");
  reactHotLoader.register(_default, "default", "/home/ygeman/Projects/git/OddUcation/pages/users/members.js");
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
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/users/members")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=6.dd91c9a6b4c93ccb5ec2.hot-update.js.map