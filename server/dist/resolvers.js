"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphqlTypeJson = require("graphql-type-json");

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

var _graphqlIsoDate = require("graphql-iso-date");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require("fs"),
    createWriteStream = _require.createWriteStream; // added


var path = require("path"); //added
var files = [];

var ROOT_PATH = "C:\\inetpub\\wwwroot";
//const TEST_PATH = "../test"
var AUDIO_PATH = "\\audio\\disclosure\\comm\\ie\\";
var VIDEO_PATH = "\\video\\disclosure\\comm\\ie\\";
var DOC_PATH = "\\PDF\\disclosure\\comm\\ie\\";

exports.default = {
	JSON: _graphqlTypeJson2.default,
	Date: _graphqlIsoDate.GraphQLDate,
	Time: _graphqlIsoDate.GraphQLTime,
	DateTime: _graphqlIsoDate.GraphQLDateTime,

	IndExp: {
		comms: function comms(parent, args, context, info) {
			return parent.getInd_exp_communications();
		},
		payments: function payments(parent, args, context, info) {
			return parent.getInd_exp_payments();
		}
	},

	Mutation: {
		uploadFile: function () {
			var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, _ref) {
				var file = _ref.file,
				    meta = _ref.meta;

				var filePath, _ref3, createReadStream, filename;

				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								filePath = "";
								_context.t0 = meta.FILE_TYPE;
								_context.next = _context.t0 === "AUDIO" ? 4 : _context.t0 === "VIDEO" ? 6 : 8;
								break;

							case 4:
								filePath = filePath + AUDIO_PATH;
								return _context.abrupt("break", 10);

							case 6:
								filePath = filePath + VIDEO_PATH;
								return _context.abrupt("break", 10);

							case 8:
								filePath = filePath + DOC_PATH;
								return _context.abrupt("break", 10);

							case 10:
								_context.next = 12;
								return file;

							case 12:
								_ref3 = _context.sent;
								createReadStream = _ref3.createReadStream;
								filename = _ref3.filename;
								_context.next = 17;
								return new _promise2.default(function (res) {
									return createReadStream().pipe(createWriteStream(path.join(ROOT_PATH, filePath, meta.MODIFIED_FILE_NAME))).on("close", res);
								});

							case 17:

								files.push(filename);

								return _context.abrupt("return", true);

							case 19:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, undefined);
			}));

			function uploadFile(_x, _x2) {
				return _ref2.apply(this, arguments);
			}

			return uploadFile;
		}(),

		updateIndExp: function () {
			var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(parent, args, _ref4) {
				var db = _ref4.db;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								console.log(args.ie.DATE_DISTRIBUTED);
								_context2.next = 3;
								return db.ind_exp.update(args.ie, { where: { IE_ID: args.IE_ID } });

							case 3:
								return _context2.abrupt("return", db.ind_exp.findByPk(args.IE_ID));

							case 4:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, undefined);
			}));

			function updateIndExp(_x3, _x4, _x5) {
				return _ref5.apply(this, arguments);
			}

			return updateIndExp;
		}(),

		addIndExp: function addIndExp(parent, args, _ref6) {
			var db = _ref6.db;

			return db.ind_exp.create(args.ie);
		},

		upsertIndExpPayment: function () {
			var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(parent, args, _ref7) {
				var db = _ref7.db;
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								if (!(typeof args.payment.IE_PAYMENT_ID !== "undefined")) {
									_context3.next = 6;
									break;
								}

								_context3.next = 3;
								return db.ind_exp_payment.update(args.payment, { where: { IE_PAYMENT_ID: args.payment.IE_PAYMENT_ID } });

							case 3:
								return _context3.abrupt("return", db.ind_exp_payment.findByPk(args.payment.IE_PAYMENT_ID));

							case 6:
								return _context3.abrupt("return", db.ind_exp_payment.create(args.payment));

							case 7:
							case "end":
								return _context3.stop();
						}
					}
				}, _callee3, undefined);
			}));

			function upsertIndExpPayment(_x6, _x7, _x8) {
				return _ref8.apply(this, arguments);
			}

			return upsertIndExpPayment;
		}(),

		deleteIndExpPayment: function deleteIndExpPayment(_, _ref9, _ref10) {
			var IE_PAYMENT_ID = _ref9.IE_PAYMENT_ID;
			var db = _ref10.db;

			//returns number of deleted rows
			return db.ind_exp_payment.destroy({ where: { IE_PAYMENT_ID: IE_PAYMENT_ID } });
		},

		upsertIndExpComm: function () {
			var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(parent, args, _ref11) {
				var db = _ref11.db;
				return _regenerator2.default.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								if (!(typeof args.comm.IE_COMM_ID !== "undefined")) {
									_context4.next = 6;
									break;
								}

								_context4.next = 3;
								return db.ind_exp_communication.update(args.comm, { where: { IE_COMM_ID: args.comm.IE_COMM_ID } });

							case 3:
								return _context4.abrupt("return", db.ind_exp_communication.findByPk(args.comm.IE_COMM_ID));

							case 6:
								return _context4.abrupt("return", db.ind_exp_communication.create(args.comm));

							case 7:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, undefined);
			}));

			function upsertIndExpComm(_x9, _x10, _x11) {
				return _ref12.apply(this, arguments);
			}

			return upsertIndExpComm;
		}(),

		deleteIndExpComm: function deleteIndExpComm(_, _ref13, _ref14) {
			var IE_COMM_ID = _ref13.IE_COMM_ID;
			var db = _ref14.db;

			//returns number of deleted rows
			return db.ind_exp_communication.destroy({ where: { IE_COMM_ID: IE_COMM_ID } });
		}

	},

	Query: {
		getFiles: function getFiles() {
			return files;
		},
		getIndExpPayment: function getIndExpPayment(parent, _ref15, _ref16) {
			var IE_PAYMENT_ID = _ref15.IE_PAYMENT_ID;
			var db = _ref16.db;
			return db.payment.findByPk(IE_PAYMENT_ID);
		},
		getCandidates: function getCandidates(parent, args, _ref17) {
			var db = _ref17.db;
			return db.candidate.findAll();
		},
		getBallotmeasures: function getBallotmeasures(parent, args, _ref18) {
			var db = _ref18.db;
			return db.ballotmeasures.findAll();
		},
		getCommtypes: function getCommtypes(parent, args, _ref19) {
			var db = _ref19.db;
			return db.comm_type.findAll({ where: { ACTIVE_FLG: 1 } });
		},
		getIndExp: function getIndExp(parent, _ref20, _ref21) {
			var IE_ID = _ref20.IE_ID;
			var db = _ref21.db;
			return db.ind_exp.findByPk(IE_ID);
		}
	}

	//FOR REFERENCE ONLY

	// getIndExps: (parent, args, { db }) => {
	//     const Op = db.Sequelize.Op
	//     if (!args.limit) return db.ind_exp.findAll()

	//     return db.ind_exp.findAll({
	//         where: {
	//             IE_ID: {
	//                 [Op.gt]: 641,
	//                 [Op.lt]: 645
	//             }
	//         }
	//     })
	// }

};