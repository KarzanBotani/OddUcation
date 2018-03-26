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
    var _ref,
        _this2 = this;

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
      organizationMembers: [],
      posts: [],
      userPostsCount: '0',
      socialMedia1: '',
      socialMedia2: '',
      socialMedia3: '',
      addressToAdd: '',
      addressToRemove: '',
      memberInfo: [],
      memberIdsLength: ''
    }, _this.onDeleteAccount = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(event) {
        var accounts, g;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.setState({ loading: true, errorMessage: '' });
                event.preventDefault();

                _context.prev = 2;
                _context.next = 5;
                return __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].eth.getAccounts();

              case 5:
                accounts = _context.sent;
                _context.next = 8;
                return __WEBPACK_IMPORTED_MODULE_4__ethereum_factory__["a" /* default */].methods.deleteAccount().send({ from: accounts[0] });

              case 8:
                g = _context.sent;


                console.log('g: ', g);

                __WEBPACK_IMPORTED_MODULE_6__routes__["Router"].pushRoute('/');
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](2);

                console.log('err: ', _context.t0);

              case 16:

                _this.setState({ loading: false });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[2, 13]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.onRemoveMember = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2(member) {
        var accounts;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.setState({ loading: true, errorMessage: '' });

                _context2.prev = 1;
                _context2.next = 4;
                return __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].eth.getAccounts();

              case 4:
                accounts = _context2.sent;
                _context2.next = 7;
                return __WEBPACK_IMPORTED_MODULE_4__ethereum_factory__["a" /* default */].methods.removeMember(member).send({ from: accounts[0] });

              case 7:

                __WEBPACK_IMPORTED_MODULE_6__routes__["Router"].pushRoute("/users/" + _this.state.userAddress + "/add-user");
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);

                _this.setState({ errorMessage: _context2.t0.message });
                console.log(_context2.t0.message);

              case 14:

                _this.setState({ loading: false });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[1, 10]]);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShowMembers, [{
    key: "componentDidMount",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3() {
        var accounts, balance, profileSummary, userPostsCount, memberIds, memberProfiles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _member, g;

        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].eth.getAccounts();

              case 3:
                accounts = _context3.sent;
                _context3.next = 6;
                return __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].eth.getBalance(accounts[0]);

              case 6:
                balance = _context3.sent;
                _context3.next = 9;
                return __WEBPACK_IMPORTED_MODULE_4__ethereum_factory__["a" /* default */].methods.getProfile(accounts[0]).call();

              case 9:
                profileSummary = _context3.sent;
                _context3.next = 12;
                return __WEBPACK_IMPORTED_MODULE_4__ethereum_factory__["a" /* default */].methods.userPostsCount(accounts[0]).call();

              case 12:
                userPostsCount = _context3.sent;


                if (profileSummary[0] === '1') {
                  this.setState({ role: 'Regular' });
                } else if (profileSummary[0] === '2') {
                  this.setState({ role: 'Organization' });
                  this.setState({ organizationMembers: profileSummary[4] });
                  this.setState({ organizationMembersCount: profileSummary[4].length });
                }

                this.setState({ userAddress: accounts[0] });
                this.setState({ balance: balance });

                this.setState({ name: __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.hexToUtf8(profileSummary[1]) });
                this.setState({ socialMedia1: __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.hexToUtf8(profileSummary[2][0]) });
                this.setState({ socialMedia2: __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.hexToUtf8(profileSummary[2][1]) });
                this.setState({ socialMedia3: __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.hexToUtf8(profileSummary[2][2]) });
                this.setState({ posts: profileSummary[3] });
                this.setState({ userPostsCount: userPostsCount });

                memberIds = [];
                memberProfiles = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 27;
                _iterator = this.state.organizationMembers[Symbol.iterator]();

              case 29:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 39;
                  break;
                }

                _member = _step.value;
                _context3.next = 33;
                return __WEBPACK_IMPORTED_MODULE_4__ethereum_factory__["a" /* default */].methods.getProfile(_member).call();

              case 33:
                g = _context3.sent;

                memberIds.push(_member);
                memberProfiles.push(g);

              case 36:
                _iteratorNormalCompletion = true;
                _context3.next = 29;
                break;

              case 39:
                _context3.next = 45;
                break;

              case 41:
                _context3.prev = 41;
                _context3.t0 = _context3["catch"](27);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 45:
                _context3.prev = 45;
                _context3.prev = 46;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 48:
                _context3.prev = 48;

                if (!_didIteratorError) {
                  _context3.next = 51;
                  break;
                }

                throw _iteratorError;

              case 51:
                return _context3.finish(48);

              case 52:
                return _context3.finish(45);

              case 53:
                _context3.next = 55;
                return this.setState({
                  memberInfo: { memberIds: memberIds, memberProfiles: memberProfiles }
                });

              case 55:
                _context3.next = 57;
                return this.setState({ memberIdsLength: memberIds.length });

              case 57:
                _context3.next = 62;
                break;

              case 59:
                _context3.prev = 59;
                _context3.t1 = _context3["catch"](0);

                console.log(_context3.t1);

              case 62:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 59], [27, 41, 45, 53], [46,, 48, 52]]);
      }));

      function componentDidMount() {
        return _ref4.apply(this, arguments);
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
            lineNumber: 81
          }
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          Content,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 82
            }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Header,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 83
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
                lineNumber: 84
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
                lineNumber: 85
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
                lineNumber: 86
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
                lineNumber: 87
              }
            },
            this.state.socialMedia1
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Content,
            { extra: true, __source: {
                fileName: _jsxFileName,
                lineNumber: 88
              }
            },
            this.state.socialMedia2
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Content,
            { extra: true, __source: {
                fileName: _jsxFileName,
                lineNumber: 89
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
      var _this3 = this;

      var Row = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["h" /* Table */].Row,
          Cell = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["h" /* Table */].Cell;
      var _state = this.state,
          memberInfo = _state.memberInfo,
          memberIdsLength = _state.memberIdsLength;

      var x = [];

      for (var i = 0; i < memberIdsLength; i++) {
        x[i] = __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          Row,
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 136
            }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Cell,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 137
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_6__routes__["Link"],
              { route: "/users/" + memberInfo.memberIds[i], __source: {
                  fileName: _jsxFileName,
                  lineNumber: 138
                }
              },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                "a",
                { className: "item", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 139
                  }
                },
                __WEBPACK_IMPORTED_MODULE_5__ethereum_web3__["a" /* default */].utils.toAscii(memberInfo.memberProfiles[i][1])
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Cell,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 145
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_6__routes__["Link"],
              { route: "/users/" + memberInfo.memberIds[i], __source: {
                  fileName: _jsxFileName,
                  lineNumber: 146
                }
              },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                "a",
                { className: "item", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 147
                  }
                },
                memberInfo.memberIds[i]
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Cell,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 153
              }
            },
            memberInfo.memberProfiles[i][3].length
          ),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            Cell,
            { textAlign: "center", __source: {
                fileName: _jsxFileName,
                lineNumber: 154
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["a" /* Button */], { onClick: function onClick() {
                return _this3.onRemoveMember(member);
              }, loading: this.state.loading,
              icon: "remove user", negative: true, __source: {
                fileName: _jsxFileName,
                lineNumber: 155
              }
            })
          )
        );
      }

      return x;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var Header = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["h" /* Table */].Header,
          Row = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["h" /* Table */].Row,
          HeaderCell = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["h" /* Table */].HeaderCell,
          Body = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["h" /* Table */].Body,
          Cell = __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["h" /* Table */].Cell;


      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_3__components_general_Layout__["a" /* default */],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 169
          }
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_6__routes__["Link"],
          { route: "/users/" + this.state.userAddress, __source: {
              fileName: _jsxFileName,
              lineNumber: 171
            }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            "a",
            { className: "item", __source: {
                fileName: _jsxFileName,
                lineNumber: 172
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
              lineNumber: 175
            }
          },
          "ShowUsers"
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["d" /* Grid */],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 177
            }
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["d" /* Grid */].Row,
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 178
              }
            },
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["d" /* Grid */].Column,
              { width: 4, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 179
                }
              },
              this.renderEssentials(),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_6__routes__["Link"],
                { route: "/posts/new", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 182
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "a",
                  { className: "item", __source: {
                      fileName: _jsxFileName,
                      lineNumber: 183
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["a" /* Button */], { fluid: true, content: "Create Post", icon: "compose", primary: true, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 184
                    }
                  })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_6__routes__["Link"],
                { route: "/users/" + this.state.userAddress + "/add-user", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 188
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "a",
                  { className: "item", __source: {
                      fileName: _jsxFileName,
                      lineNumber: 189
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["a" /* Button */], { fluid: true, content: "Add User", icon: "add user", primary: true, style: { marginTop: '10px' }, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 190
                    }
                  })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_6__routes__["Link"],
                { route: "/users/" + this.state.userAddress + "/show-users", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 194
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  "a",
                  { className: "item", __source: {
                      fileName: _jsxFileName,
                      lineNumber: 195
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["a" /* Button */], { fluid: true, content: "Show Users", icon: "group", primary: true, style: { marginTop: '10px' }, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 196
                    }
                  })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["a" /* Button */], { fluid: true, onClick: function onClick(event) {
                  return _this4.onDeleteAccount(event);
                }, loading: this.state.loading,
                content: "Delete Account", icon: "user delete", negative: true, style: { marginTop: '10px' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 200
                }
              })
            ),
            __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["d" /* Grid */].Column,
              { width: 12, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 205
                }
              },
              __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_semantic_ui_react__["h" /* Table */],
                { celled: true, striped: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 207
                  }
                },
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  Header,
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 208
                    }
                  },
                  __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                    Row,
                    {
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 209
                      }
                    },
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                      HeaderCell,
                      {
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 210
                        }
                      },
                      "Address"
                    ),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                      HeaderCell,
                      {
                        __source: {
                          fileName: _jsxFileName,
                          lineNumber: 211
                        }
                      },
                      "Name"
                    ),
                    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                      HeaderCell,
                      { colSpan: "2", __source: {
                          fileName: _jsxFileName,
                          lineNumber: 212
                        }
                      },
                      "Posts Count"
                    )
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
                  Body,
                  {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 216
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

// <Body>{this.renderMembers()}</Body>

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
//# sourceMappingURL=6.50b1dad7a3a5759fec0a.hot-update.js.map