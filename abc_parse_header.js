//    abc_parse_header.js: parses a the header fields from a string representing ABC Music Notation into a usable internal structure.
//    Copyright (C) 2010 Paul Rosen (paul at paulrosen dot net)
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.

/*global Class */
/*extern AbcParseHeader */

var AbcParseHeader = Class.create({
	initialize: function (tokenizer, warn, multilineVars, tune) {
		var keys = {
			'C#': {num: 7, acc: 'sharp'},
			'A#m': {num: 7, acc: 'sharp'},
			'G#Mix': {num: 7, acc: 'sharp'},
			'D#Dor': {num: 7, acc: 'sharp'},
			'E#Phr': {num: 7, acc: 'sharp'},
			'F#Lyd': {num: 7, acc: 'sharp'},
			'B#Loc': {num: 7, acc: 'sharp'},

			'F#': {num: 6, acc: 'sharp'},
			'D#m': {num: 6, acc: 'sharp'},
			'C#Mix': {num: 6, acc: 'sharp'},
			'G#Dor': {num: 6, acc: 'sharp'},
			'A#Phr': {num: 6, acc: 'sharp'},
			'BLyd': {num: 6, acc: 'sharp'},
			'E#Loc': {num: 6, acc: 'sharp'},

			'B': {num: 5, acc: 'sharp'},
			'G#m': {num: 5, acc: 'sharp'},
			'F#Mix': {num: 5, acc: 'sharp'},
			'C#Dor': {num: 5, acc: 'sharp'},
			'D#Phr': {num: 5, acc: 'sharp'},
			'ELyd': {num: 5, acc: 'sharp'},
			'A#Loc': {num: 5, acc: 'sharp'},

			'E': {num: 4, acc: 'sharp'},
			'C#m': {num: 4, acc: 'sharp'},
			'BMix': {num: 4, acc: 'sharp'},
			'F#Dor': {num: 4, acc: 'sharp'},
			'G#Phr': {num: 4, acc: 'sharp'},
			'ALyd': {num: 4, acc: 'sharp'},
			'D#Loc': {num: 4, acc: 'sharp'},

			'A': {num: 3, acc: 'sharp'},
			'F#m': {num: 3, acc: 'sharp'},
			'EMix': {num: 3, acc: 'sharp'},
			'BDor': {num: 3, acc: 'sharp'},
			'C#Phr': {num: 3, acc: 'sharp'},
			'DLyd': {num: 3, acc: 'sharp'},
			'G#Loc': {num: 3, acc: 'sharp'},

			'D': {num: 2, acc: 'sharp'},
			'Bm': {num: 2, acc: 'sharp'},
			'AMix': {num: 2, acc: 'sharp'},
			'EDor': {num: 2, acc: 'sharp'},
			'F#Phr': {num: 2, acc: 'sharp'},
			'GLyd': {num: 2, acc: 'sharp'},
			'C#Loc': {num: 2, acc: 'sharp'},

			'G': {num: 1, acc: 'sharp'},
			'Em': {num: 1, acc: 'sharp'},
			'DMix': {num: 1, acc: 'sharp'},
			'ADor': {num: 1, acc: 'sharp'},
			'BPhr': {num: 1, acc: 'sharp'},
			'CLyd': {num: 1, acc: 'sharp'},
			'F#Loc': {num: 1, acc: 'sharp'},

			'C': {num: 0, acc: 'sharp'},
			'Am': {num: 0, acc: 'sharp'},
			'GMix': {num: 0, acc: 'sharp'},
			'DDor': {num: 0, acc: 'sharp'},
			'EPhr': {num: 0, acc: 'sharp'},
			'FLyd': {num: 0, acc: 'sharp'},
			'BLoc': {num: 0, acc: 'sharp'},

			'F': {num: 1, acc: 'flat'},
			'Dm': {num: 1, acc: 'flat'},
			'CMix': {num: 1, acc: 'flat'},
			'GDor': {num: 1, acc: 'flat'},
			'APhr': {num: 1, acc: 'flat'},
			'BbLyd': {num: 1, acc: 'flat'},
			'ELoc': {num: 1, acc: 'flat'},

			'Bb': {num: 2, acc: 'flat'},
			'Gm': {num: 2, acc: 'flat'},
			'FMix': {num: 2, acc: 'flat'},
			'CDor': {num: 2, acc: 'flat'},
			'DPhr': {num: 2, acc: 'flat'},
			'EbLyd': {num: 2, acc: 'flat'},
			'ALoc': {num: 2, acc: 'flat'},

			'Eb': {num: 3, acc: 'flat'},
			'Cm': {num: 3, acc: 'flat'},
			'BbMix': {num: 3, acc: 'flat'},
			'FDor': {num: 3, acc: 'flat'},
			'GPhr': {num: 3, acc: 'flat'},
			'AbLyd': {num: 3, acc: 'flat'},
			'DLoc': {num: 3, acc: 'flat'},

			'Ab': {num: 4, acc: 'flat'},
			'Fm': {num: 4, acc: 'flat'},
			'EbMix': {num: 4, acc: 'flat'},
			'BbDor': {num: 4, acc: 'flat'},
			'CPhr': {num: 4, acc: 'flat'},
			'DbLyd': {num: 4, acc: 'flat'},
			'GLoc': {num: 4, acc: 'flat'},

			'Db': {num: 5, acc: 'flat'},
			'Bbm': {num: 5, acc: 'flat'},
			'AbMix': {num: 5, acc: 'flat'},
			'EbDor': {num: 5, acc: 'flat'},
			'FPhr': {num: 5, acc: 'flat'},
			'GgLyd': {num: 5, acc: 'flat'},
			'CLoc': {num: 5, acc: 'flat'},

			'Gb': {num: 6, acc: 'flat'},
			'Ebm': {num: 6, acc: 'flat'},
			'DbMix': {num: 6, acc: 'flat'},
			'AbDor': {num: 6, acc: 'flat'},
			'BbPhr': {num: 6, acc: 'flat'},
			'CbLyd': {num: 6, acc: 'flat'},
			'FLoc': {num: 6, acc: 'flat'},

			'Cb': {num: 7, acc: 'flat'},
			'Abm': {num: 7, acc: 'flat'},
			'GbMix': {num: 7, acc: 'flat'},
			'DbDor': {num: 7, acc: 'flat'},
			'EbPhr': {num: 7, acc: 'flat'},
			'FbLyd': {num: 7, acc: 'flat'},
			'BbLoc': {num: 7, acc: 'flat'},

			// The following are not in the 2.0 spec, but seem normal enough.
			// TODO-PER: These SOUND the same as what's written, but they aren't right
			'A#': {num: 2, acc: 'flat'},
			'B#': {num: 0, acc: 'sharp'},
			'D#': {num: 3, acc: 'flat'},
			'E#': {num: 1, acc: 'flat'},
			'G#': {num: 4, acc: 'flat'}
		};

		this.parseKey = function(str)	// (and clef)
		{
			var origStr = str;
			// The format is:
			// [space][tonic[#|b][ ][3-letter-mode][ignored-chars][space]][ accidentals...][ clef=treble|bass|bass3|tenor|alto|alto2|alto1|none [+8|-8]]
			// -- or -- the key can be "none"
			// First get the key letter: turn that into a index into the key array (0-11)
			// Then see if there is a sharp or flat. Increment or decrement.
			// Then see if there is a mode modifier. Add or subtract to the index.
			// Then do a mod 12 on the index and return the key.
			// TODO: This may leave unparsed characters at the end after something reasonable was found.

			var setMiddle = function(str) {
				var i = tokenizer.skipWhiteSpace(str);
				str = str.substring(i);
				if (str.startsWith('m=') || str.startsWith('middle=')) {
					str = str.substring(str.indexOf('=')+1);
					multilineVars.clef.middle = str;
				}
			};
			// check first to see if there is only a clef. If so, just take that, but ignore an error after that.
			var retClef = tokenizer.getClef(str);
			if (retClef.token !== undefined && (retClef.explicit === true || retClef.token !== 'none')) {	// none is the only ambiguous marking. We need to assume that's a key
				multilineVars.clef = { type: retClef.token };
				str = str.substring(retClef.len);
				setMiddle(str);
				return {foundClef: true};
			}

			var ret = {};

			var retPitch = tokenizer.getKeyPitch(str);
			if (retPitch.len > 0) {
				var key = retPitch.token;
				str = str.substring(retPitch.len);
				// We got a pitch to start with, so we might also have an accidental and a mode
				var retAcc = tokenizer.getSharpFlat(str);
				if (retAcc.len > 0) {
					key += retAcc.token;
					str = str.substring(retAcc.len);
				}
				var retMode = tokenizer.getMode(str);
				if (retMode.len > 0) {
					key += retMode.token;
					str = str.substring(retMode.len);
				}
				ret.regularKey = keys[key];
			} else if (str.startsWith('HP')) {
				this.addDirective("bagpipes");
				ret.regularKey = keys.C;
				multilineVars.key = ret;
				return {foundKey: true};
			} else if (str.startsWith('Hp')) {
				ret.extraAccidentals = [ {acc: 'natural', note: 'g'}, {acc: 'sharp', note: 'f'}, {acc: 'sharp', note: 'c'} ];
				this.addDirective("bagpipes");
				multilineVars.key = ret;
				return {foundKey: true};
			} else {
				var retNone = tokenizer.isMatch(str, 'none');
				if (retNone > 0) {
					// we got the none key - that's the same as C to us
					ret.regularKey = keys.C;
					str = str.substring(retNone);
				}
			}
			// There are two special cases of deprecated syntax. Ignore them if they occur
			var j = tokenizer.skipWhiteSpace(str);
			str = str.substring(j);
			if (str.startsWith('exp') || str.startsWith('oct'))
				str = str.substring(3);

			// now see if there are extra accidentals
			var done = false;
			while (!done) {
				var retExtra = tokenizer.getKeyAccidental(str);
				if (retExtra.len === 0)
					done = true;
				else {
					str = str.substring(retExtra.len);
					if (retExtra.warn)
						warn("error parsing extra accidentals:", origStr, 0);
					else {
						if (!ret.extraAccidentals)
							ret.extraAccidentals = [];
						ret.extraAccidentals.push(retExtra.token);
					}
				}
			}

			// now see if there is a clef
			retClef = tokenizer.getClef(str);
			if (retClef.len > 0) {
				if (retClef.warn)
					warn("error parsing clef:" + retClef.warn, origStr, 0);
				else {
					//ret.clef = retClef.token;
					multilineVars.clef = { type: retClef.token};
					str = str.substring(retClef.len);
					setMiddle(str);
				}
			}

			if (ret.regularKey === undefined && ret.extraAccidentals === undefined && retClef.token === undefined) {
				warn("error parsing key: ", origStr, 0);
				//ret.regularKey = keys.C;
				return {};
			}
			var result = {};
			if (retClef.token !== undefined)
				result.foundClef = true;
			if (ret.regularKey !== undefined || ret.extraAccidentals !== undefined) {
				multilineVars.key = ret;
				result.foundKey = true;
			}
			return result;
		};

		this.addDirective = function(str) {
			var tokens = tokenizer.tokenize(str, 0, str.length);	// 3 or more % in a row, or just spaces after %% is just a comment
			if (tokens.length === 0 || tokens[0].type !== 'alpha') return null;
			var restOfString = str.substring(str.indexOf(tokens[0].token)+tokens[0].token.length);
			restOfString = tokenizer.stripComment(restOfString);
			var cmd = tokens.shift().token.toLowerCase();
			var num;
			var scratch = "";
			switch (cmd)
			{
				case "bagpipes":tune.formatting.bagpipes = true;break;
				case "stretchlast":tune.formatting.stretchlast = true;break;
				case "staffwidth":
					scratch = tokenizer.getMeasurement(tokens);
					if (scratch.used === 0 || tokens.length !== 0)
						return "Directive \"" + cmd + "\" requires a measurement as a parameter.";
					tune.formatting.staffwidth = scratch.value;
					break;
				case "scale":
					scratch = "";
					tokens.each(function(tok) {
						scratch += tok.token;
					});
					num = parseFloat(scratch);
					if (isNaN(num) || num === 0)
						return "Directive \"" + cmd + "\" requires a number as a parameter.";
					tune.formatting.scale = num;
					break;
				case "sep":
					if (tokens.length === 0)
						tune.addSeparator();
					else {
						if (tokens.length !== 3 || tokens[0].type !== 'number' || tokens[1].type !== 'number' || tokens[2].type !== 'number')
							return "Directive \"" + cmd + "\" requires 3 numbers: space above, space below, length of line";
						tune.addSeparator(parseInt(tokens[0].token), parseInt(tokens[1].token), parseInt(tokens[2].token));
					}
					break;
				case "barnumbers":
					if (tokens.length !== 1 || tokens[0].type !== 'number')
						return "Directive \"" + cmd + "\" requires a number as a parameter.";
					multilineVars.barNumbers = parseInt(tokens[0].token);
					break;
				case "begintext":
					multilineVars.inTextBlock = true;
					break;
				case "text":
					tune.addText(tokenizer.translateString(restOfString));	// display secondary title
					break;
				case "vocalfont":
					multilineVars.fontVocal = {};
					var token = tokens.last();
					if (token.type === 'number') {
						multilineVars.fontVocal.size = parseInt(token.token);
						tokens.pop();
					}
					if (tokens.length > 0) {
						scratch = "";
						tokens.each(function(tok) {
							if (tok.token === '-') scratch += ' ';
							else scratch += tok.token;
						});
						multilineVars.fontVocal.font = scratch;
					}
					break;
				case "score":
					multilineVars.score_is_present = true;
					var addVoice = function(id, newStaff, bracket, brace, continueBar) {
						if (newStaff || multilineVars.staves.length === 0) {
							multilineVars.staves.push({ index: multilineVars.staves.length, numVoices: 0 });
						}
						var staff = multilineVars.staves.last();
						if (bracket !== undefined) staff.bracket = bracket;
						if (brace !== undefined) staff.brace = brace;
						if (continueBar) staff.bar = 'end';
						if (multilineVars.voices[id] === undefined) {
							multilineVars.voices[id] = { staffNum: staff.index, index: staff.numVoices};
							staff.numVoices++;
						}
					};

					var openParen = false;
					var openBracket = false;
					var openBrace = false;
					var justOpenParen = false;
					var justOpenBracket = false;
					var justOpenBrace = false;
					var continueBar = false;
					var lastVoice = undefined;
					while (tokens.length) {
						var t = tokens.shift();
						switch (t.token) {
							case '(':
								if (openParen) warn("Can't nest parenthesis in %%score", str, t.start);
								else { openParen = true; justOpenParen = true; }
								break;
							case ')':
								if (!openParen || justOpenParen) warn("Unexpected close parenthesis in %%score", str, t.start);
								else openParen = false;
								break;
							case '[':
								if (openBracket) warn("Can't nest brackets in %%score", str, t.start);
								else { openBracket = true; justOpenBracket = true; }
								break;
							case ']':
								if (!openBracket || justOpenBracket) warn("Unexpected close bracket in %%score", str, t.start);
								else { openBracket = false; multilineVars.staves[lastVoice.staffNum].bracket = 'end'; }
								break;
							case '{':
								if (openBrace ) warn("Can't nest braces in %%score", str, t.start);
								else { openBrace = true; justOpenBrace = true; }
								break;
							case '}':
								if (!openBrace || justOpenBrace) warn("Unexpected close brace in %%score", str, t.start);
								else { openBrace = false; multilineVars.staves[lastVoice.staffNum].brace = 'end'; }
								break;
							case '|':
								continueBar = true;
								if (lastVoice)
									multilineVars.staves[lastVoice.staffNum].bar = 'start';
								break;
							default:
								var vc = "";
								while (t.type === 'alpha' || t.type === 'number') {
									vc += t.token;
									if (t.continueId)
										t = tokens.shift();
									else
										break;
								}
								var newStaff = !openParen || justOpenParen;
								var bracket = justOpenBracket ? 'start' : openBracket ? 'continue' : undefined;
								var brace = justOpenBrace ? 'start' : openBrace ? 'continue' : undefined;
								addVoice(vc, newStaff, bracket, brace, continueBar);
								justOpenParen = false;
								justOpenBracket = false;
								justOpenBrace = false;
								continueBar = false;
								lastVoice = multilineVars.voices[vc];
								break;
						}
					}
					break;
				case "indent":
				case "voicefont":
				case "titlefont":
				case "barlabelfont":
				case "barnumfont":
				case "barnumberfont":
				case "topmargin":
				case "botmargin":
				case "topspace":
				case "titlespace":
				case "subtitlespace":
				case "composerspace":
				case "musicspace":
				case "partsspace":
				case "wordsspace":
				case "textspace":
				case "vocalspace":
				case "staffsep":
				case "linesep":
				case "midi":
				case "titlecaps":
				case "titlefont":
				case "composerfont":
				case "indent":
				case "playtempo":
				case "auquality":
				case "systemsep":
				case "sysstaffsep":
				case "landscape":
				case "gchordfont":
				case "leftmargin":
				case "partsfont":
				case "staves":
				case "slurgraces":
				case "titleleft":
				case "subtitlefont":
				case "tempofont":
				case "continuous":
				case "botspace":
				case "nobarcheck":
					// TODO-PER: Actually handle the parameters of these
					tune.formatting[cmd] = restOfString;
					break;
				default:
					return "Unknown directive: " + cmd;
			}
			return null;
		};

		this.setCurrentVoice = function(id) {
			multilineVars.currentVoice = multilineVars.voices[id];
			tune.setCurrentVoice(multilineVars.currentVoice.staffNum, multilineVars.currentVoice.index);
		};

		this.parseVoice = function(line, i, e) {
			//First truncate the string to the first non-space character after V: through either the
			//end of the line or a % character. Then remove trailing spaces, too.
			var ret = tokenizer.getMeat(line, i, e);
			var start = ret.start;
			var end = ret.end;
			//The first thing on the line is the ID. It can be any non-space string and terminates at the
			//first space.
			var id = tokenizer.getToken(line, start, end);
			if (id.length === 0) {
				warn("Expected a voice id", line, start);
				return;
			}
			var isNew = false;
			if (multilineVars.voices[id] === undefined) {
				multilineVars.voices[id] = {};
				isNew = true;
				if (multilineVars.score_is_present)
					warn("Can't have an unknown V: id when the %score directive is present", line, i);
			}
			start += id.length;
			start += tokenizer.eatWhiteSpace(line, start);

			var staffInfo = {startStaff: isNew};
			var addNextTokenToStaffInfo = function(name) {
				var attr = tokenizer.getVoiceToken(line, start, end);
				if (attr.warn !== undefined)
					warn("Expected value for " + name + " in voice: " + attr.warn, line, start);
				else if (attr.token.length === 0 && line[start] !== '"')
					warn("Expected value for " + name + " in voice", line, start);
				else
					staffInfo[name] = attr.token;
				start += attr.len;
			};

			//Then the following items can occur in any order:
			while (start < end) {
				var token = tokenizer.getVoiceToken(line, start, end);
				start += token.len;

				if (token.warn) {
					warn("Error parsing voice: " + token.warn, line, start);
				} else {
					var attr = null;
					switch (token.token) {
						case 'clef':
						case 'cl':
							addNextTokenToStaffInfo('clef');
							// TODO-PER: check for a legal clef; do octavizing
							staffInfo.clef = staffInfo.clef.replace(/[',]/g, "");
							break;
						case 'treble':
						case 'bass':
						case 'tenor':
						case 'alto':
						case 'none':
						case 'treble\'':
						case 'bass\'':
						case 'tenor\'':
						case 'alto\'':
						case 'none\'':
						case 'treble\'\'':
						case 'bass\'\'':
						case 'tenor\'\'':
						case 'alto\'\'':
						case 'none\'\'':
						case 'treble,':
						case 'bass,':
						case 'tenor,':
						case 'alto,':
						case 'none,':
						case 'treble,,':
						case 'bass,,':
						case 'tenor,,':
						case 'alto,,':
						case 'none,,':
							// TODO-PER: handle the octave indicators on the clef by changing the middle property
							staffInfo.clef = token.token.replace(/[',]/g, "");
							break;
						case 'staves':
						case 'stave':
						case 'stv':
							addNextTokenToStaffInfo('staves');
							break;
						case 'brace':
						case 'brc':
							addNextTokenToStaffInfo('brace');
							break;
						case 'bracket':
						case 'brk':
							addNextTokenToStaffInfo('bracket');
							break;
						case 'name':
						case 'nm':
							addNextTokenToStaffInfo('name');
							break;
						case 'subname':
						case 'sname':
						case 'snm':
							addNextTokenToStaffInfo('subname');
							break;
						case 'merge':
							staffInfo.startStaff = false;
							break;
						case 'stems':
							attr = tokenizer.getVoiceToken(line, start, end);
							if (attr.warn !== undefined)
								warn("Expected value for stems in voice: " + attr.warn, line, start);
							else if (attr.token === 'up' || attr.token === 'down')
								multilineVars.voices[id].stem = attr.token;
							else
								warn("Expected up or down for voice stem", line, start);
							start += attr.len;
							break;
						case 'up':
						case 'down':
							multilineVars.voices[id].stem = token.token;
							break;
						case 'middle':
						case 'm':
							addNextTokenToStaffInfo('middle');
							break;
						case 'gchords':
						case 'gch':
							multilineVars.voices[id].suppressChords = true;
							break;
						case 'space':
						case 'spc':
							addNextTokenToStaffInfo('spacing');
							break;
					}
				}
				start += tokenizer.eatWhiteSpace(line, start);
			}

			// now we've filled up staffInfo, figure out what to do with this voice
			// TODO-PER: It is unclear from the standard and the examples what to do with brace, bracket, and staves, so they are ignored for now.
			if (staffInfo.startStaff || multilineVars.staves.length === 0) {
				multilineVars.staves.push({ index: multilineVars.staves.length, meter: multilineVars.origMeter });
				if (!multilineVars.score_is_present)
					multilineVars.staves[multilineVars.staves.length-1].numVoices = 0;
			}
			if (multilineVars.voices[id].staffNum === undefined) {
				// store where to write this for quick access later.
				multilineVars.voices[id].staffNum = multilineVars.staves.length-1;
				var vi = 0;
				for(var v in multilineVars.voices) {
					if(multilineVars.voices.hasOwnProperty(v)) {
						if (multilineVars.voices[v].staffNum === multilineVars.voices[id].staffNum)
							vi++;
					}
				}
				multilineVars.voices[id].index = vi-1;
			}
			var s = multilineVars.staves[multilineVars.voices[id].staffNum];
			if (!multilineVars.score_is_present)
				s.numVoices++;
			if (staffInfo.clef) s.clef = { type: staffInfo.clef, middle: staffInfo.middle };
			if (staffInfo.spacing) s.spacing_below_offset = staffInfo.spacing;
			if (staffInfo.middle) s.middle = staffInfo.middle;

			if (staffInfo.name) {if (s.name) s.name.push(staffInfo.name); else s.name = [ staffInfo.name ];}
			if (staffInfo.subname) {if (s.subname) s.subname.push(staffInfo.subname); else s.subname = [ staffInfo.subname ];}

			this.setCurrentVoice(id);
		};

		this.setTitle = function(title) {
			if (multilineVars.hasMainTitle)
				tune.addSubtitle(tokenizer.translateString(tokenizer.stripComment(title)));	// display secondary title
			else
			{
				tune.addMetaText("title", tokenizer.translateString(tokenizer.theReverser(tokenizer.stripComment(title))));
				multilineVars.hasMainTitle = true;
			}
		};

		this.setMeter = function(line) {
			line = tokenizer.stripComment(line);
			if (line === 'C') {
				if (multilineVars.havent_set_length === true)
					multilineVars.default_length = 0.125;
				return {type: 'common_time'};
			} else if (line === 'C|') {
				if (multilineVars.havent_set_length === true)
					multilineVars.default_length = 0.125;
				return {type: 'cut_time'};
			} else if (line.length === 0 || line.toLowerCase() === 'none') {
				if (multilineVars.havent_set_length === true)
					multilineVars.default_length = 0.125;
				return null;
			}
			else
			{
				var tokens = tokenizer.tokenize(line, 0, line.length);
				// the form is [open_paren] decimal [ plus|dot decimal ]... [close_paren] slash decimal [plus same_as_before]
				try {
					var parseNum = function() {
						// handles this much: [open_paren] decimal [ plus|dot decimal ]... [close_paren]
						var ret = { value: 0, num: "" };

						var tok = tokens.shift();
						if (tok.token === '(')
							tok = tokens.shift();
						while (1) {
							if (tok.type !== 'number') throw "Expected top number of meter";
							ret.value += parseInt(tok.token);
							ret.num += tok.token;
							if (tokens.length === 0 || tokens[0].token === '/') return ret;
							tok = tokens.shift();
							if (tok.token === ')') {
								if (tokens.length === 0 || tokens[0].token === '/') return ret;
								throw "Unexpected paren in meter";
							}
							if (tok.token !== '.' && tok.token !== '+') throw "Expected top number of meter";
							ret.num += tok.token;
							if (tokens.length === 0) throw "Expected top number of meter";
							tok = tokens.shift();
						}
						return ret;	// just to suppress warning
					};

					var parseFraction = function() {
						// handles this much: parseNum slash decimal
						var ret = parseNum();
						if (tokens.length === 0) throw "Expected slash in meter";
						var tok = tokens.shift();
						if (tok.token !== '/') throw "Expected slash in meter";
						tok = tokens.shift();
						if (tok.type !== 'number') throw "Expected bottom number of meter";
						ret.den = tok.token;
						ret.value = ret.value / parseInt(ret.den);
						return ret;
					};

					if (tokens.length === 0) throw "Expected meter definition in M: line";
					var meter = {type: 'specified', value: [ ]};
					var totalLength = 0;
					while (1) {
						var ret = parseFraction();
						totalLength += ret.value;
						meter.value.push({ num: ret.num, den: ret.den });
						if (tokens.length === 0) break;
						var tok = tokens.shift();
						if (tok.token !== '+') throw "Extra characters in M: line";
					}

					if (multilineVars.havent_set_length === true) {
						multilineVars.default_length = totalLength < 0.75 ? 0.0625 : 0.125;
					}
					return meter;
				} catch (e) {
					warn(e, line, 0);
				}
			}
			return null;
		};

		this.calcTempo = function(relTempo) {
			var dur = multilineVars.default_length ? multilineVars.default_length : 1;
			for (var i = 0; i < relTempo.duration; i++)
				relTempo.duration[i] = dur * relTempo.duration[i];
			return relTempo;
		};

		this.resolveTempo = function() {
			if (multilineVars.tempo) {	// If there's a tempo waiting to be resolved
				this.calcTempo(multilineVars.tempo);
				tune.metaText.tempo = multilineVars.tempo;
				delete multilineVars.tempo;
			}
		};

		this.addUserDefinition = function(line, start, end) {
			var equals = line.indexOf('=', start);
			if (equals === -1) {
				warn("Need an = in a macro definition", line, start);
				return;
			}

			var before = line.substring(start, equals).strip();
			var after = line.substring(equals+1).strip();

			if (before.length !== 1) {
				warn("Macro definitions can only be one character", line, start);
				return;
			}
			var legalChars = "HIJKLMNOPQRSTUVWhijklmnopqrstuvw~";
			if (legalChars.indexOf(before) === -1) {
				warn("Macro definitions must be H-W, h-w, or tilde", line, start);
				return;
			}
			if (after.length === 0) {
				warn("Missing macro definition", line, start);
				return;
			}
			if (multilineVars.macros === undefined)
				multilineVars.macros = {};
			multilineVars.macros[before] = after;
		};

		this.setDefaultLength = function(line, start, end) {
			var len = line.substring(start, end).gsub(" ", "");
			var len_arr = len.split('/');
			if (len_arr.length === 2) {
				var n = parseInt(len_arr[0]);
				var d = parseInt(len_arr[1]);
				if (d > 0) {
					var q = n / d;
					multilineVars.default_length = q;	// a whole note is 1
					multilineVars.havent_set_length = false;
				}
			}
		};

		this.setTempo = function(line, start, end) {
			//Q - tempo; can be used to specify the notes per minute, e.g.   if
			//the  default  note length is an eighth note then Q:120 or Q:C=120
			//is 120 eighth notes per minute. Similarly  Q:C3=40  would  be  40
			//dotted  quarter  notes per minute.  An absolute tempo may also be
			//set,  e.g.  Q:1/8=120  is  also  120  eighth  notes  per  minute,
			//irrespective of the default note length.
			//
			// This is either a number, "C=number", "Cnumber=number", or fraction [fraction...]=number
			// It depends on the L: field, which may either not be present, or may appear after this.
			// If L: is not present, an eighth note is used.
			// That means that this field can't be calculated until the end, if it is the first three types, since we don't know if we'll see an L: field.
			// So, if it is the fourth type, set it here, otherwise, save the info in the multilineVars.
			// The temporary variables we keep are the duration and the bpm. In the first two forms, the duration is 1.
			// In addition, a quoted string may both precede and follow. If a quoted string is present, then the duration part is optional.
			try {
				var tokens = tokenizer.tokenize(line, start, end);

				if (tokens.length === 0) throw "Missing parameter in Q: field";

				var tempo = {};
				var delaySet = true;
				var token = tokens.shift();
				if (token.type === 'quote') {
					tempo.preString = token.token;
					token = tokens.shift();
					if (tokens.length === 0) {	// It's ok to just get a string for the tempo
						return { type: 'immediate', tempo: tempo };
					}
				}
				if (token.type === 'alpha' && token.token === 'C')	 { // either type 2 or type 3
					if (tokens.length === 0) throw "Missing tempo after C in Q: field";
					token = tokens.shift();
					if (token.type === 'punct' && token.token === '=') {
						// This is a type 2 format. The duration is an implied 1
						if (tokens.length === 0) throw "Missing tempo after = in Q: field";
						token = tokens.shift();
						if (token.type !== 'number') throw "Expected number after = in Q: field";
						tempo.duration = [1];
						tempo.bpm = parseInt(token.token);
					} else if (token.type === 'number') {
						// This is a type 3 format.
						tempo.duration = [parseInt(token.token)];
						if (tokens.length === 0) throw "Missing = after duration in Q: field";
						token = tokens.shift();
						if (token.type !== 'punct' || token.token !== '=') throw "Expected = after duration in Q: field";
						if (tokens.length === 0) throw "Missing tempo after = in Q: field";
						token = tokens.shift();
						if (token.type !== 'number') throw "Expected number after = in Q: field";
						tempo.bpm = parseInt(token.token);
					} else throw "Expected number or equal after C in Q: field";

				} else if (token.type === 'number') {	// either type 1 or type 4
					var num = parseInt(token.token);
					if (tokens.length === 0 || tokens[0].type === 'quote') {
						// This is type 1
						tempo.duration = [1];
						tempo.bpm = num;
					} else {	// This is type 4
						delaySet = false;
						token = tokens.shift();
						if (token.type !== 'punct' && token.token !== '/') throw "Expected fraction in Q: field";
						token = tokens.shift();
						if (token.type !== 'number') throw "Expected fraction in Q: field";
						var den = parseInt(token.token);
						tempo.duration = [num/den];
						// We got the first fraction, keep getting more as long as we find them.
						while (tokens.length > 0  && tokens[0].token !== '=' && tokens[0].type !== 'quote') {
							token = tokens.shift();
							if (token.type !== 'number') throw "Expected fraction in Q: field";
							num = parseInt(token.token);
							token = tokens.shift();
							if (token.type !== 'punct' && token.token !== '/') throw "Expected fraction in Q: field";
							token = tokens.shift();
							if (token.type !== 'number') throw "Expected fraction in Q: field";
							den = parseInt(token.token);
							tempo.duration.push(num/den);
						}
						token = tokens.shift();
						if (token.type !== 'punct' && token.token !== '=') throw "Expected = in Q: field";
						token = tokens.shift();
						if (token.type !== 'number') throw "Expected tempo in Q: field";
						tempo.bpm = parseInt(token.token);
					}
				} else throw "Unknown value in Q: field";
				if (tokens.length !== 0) {
					token = tokens.shift();
					if (token.type === 'quote') {
						tempo.postString = token.token;
						token = tokens.shift();
					}
					if (tokens.length !== 0) throw "Unexpected string at end of Q: field";
				}
				return { type: delaySet?'delaySet':'immediate', tempo: tempo };
			} catch (msg) {
				warn(msg, line, start);
				return { type: 'none' };
			}
		};

		this.letter_to_inline_header = function(line, i)
		{
			var ws = tokenizer.eatWhiteSpace(line, i);
			i +=ws;
			if (line.length >= i+5 && line[i] === '[' && line[i+2] === ':') {
				var e = line.indexOf(']', i);
				switch(line.substring(i, i+3))
				{
					case "[I:":
						var err = this.addDirective(line.substring(i+3, e));
						if (err) warn(err, line, i);
						return [ e-i+1+ws ];
					case "[M:":
						var meter = this.setMeter(line.substring(i+3, e));
						if (tune.hasBeginMusic() && meter)
							tune.appendStartingElement('meter', -1, -1, meter);
						return [ e-i+1+ws ];
					case "[K:":
						var result = this.parseKey(line.substring(i+3, e));
						if (result.foundClef && tune.hasBeginMusic())
							tune.appendStartingElement('clef', -1, -1, multilineVars.clef);
						if (result.foundKey && tune.hasBeginMusic())
							tune.appendStartingElement('key', -1, -1, multilineVars.key);
						return [ e-i+1+ws ];
					case "[P:":
						tune.appendElement('part', -1, -1, {title: line.substring(i+3, e)});
						return [ e-i+1+ws ];
					case "[L:":
						this.setDefaultLength(line, i+3, e);
						return [ e-i+1+ws ];
					case "[Q:":
						if (e > 0) {
							var tempo = this.setTempo(line, i+3, e);
							if (tempo.type === 'delaySet') tune.appendElement('tempo', -1, -1, this.calcTempo(tempo.tempo));
							else if (tempo.type === 'immediate') tune.appendElement('tempo', -1, -1, tempo.tempo);
							return [ e-i+1+ws, line[i+1], line.substring(i+3, e)];
						}
						break;
					case "[V:":
						if (e > 0) {
							this.parseVoice(line, i+3, e);
							//startNewLine();
							return [ e-i+1+ws, line[i+1], line.substring(i+3, e)];
						}
						break;

					default:
						// TODO: complain about unhandled header
				}
			}
			return [ 0 ];
		};

		this.letter_to_body_header = function(line, i)
		{
			if (line.length >= i+3) {
				switch(line.substring(i, i+2))
				{
					case "I:":
						var err = this.addDirective(line.substring(i+2));
						if (err) warn(err, line, i);
						return [ line.length ];
					case "M:":
						var meter = this.setMeter(line.substring(i+2));
						if (tune.hasBeginMusic() && meter)
							tune.appendStartingElement('meter', -1, -1, meter);
						return [ line.length ];
					case "K:":
						var result = this.parseKey(line.substring(i+2));
						if (result.foundClef && tune.hasBeginMusic())
							tune.appendStartingElement('clef', -1, -1, multilineVars.clef);
						if (result.foundKey && tune.hasBeginMusic())
							tune.appendStartingElement('key', -1, -1, multilineVars.key);
						return [ line.length ];
					case "P:":
						if (tune.hasBeginMusic())
							tune.appendStartingElement('part', -1, -1, {title: line.substring(i+2)});
						return [ line.length ];
					case "L:":
						this.setDefaultLength(line, i+2, line.length);
						return [ line.length ];
					case "Q:":
						var e = line.indexOf('\x12', i+2);
						if (e === -1) e = line.length;
						var tempo = this.setTempo(line, i+2, e);
						if (tempo.type === 'delaySet') tune.appendElement('tempo', -1, -1, this.calcTempo(tempo.tempo));
						else if (tempo.type === 'immediate') tune.appendElement('tempo', -1, -1, tempo.tempo);
						return [ e, line[i], line.substring(i+2).strip()];
					case "V:":
						this.parseVoice(line, 2, line.length);
//						startNewLine();
						return [ line.length, line[i], line.substring(i+2).strip()];
					default:
						// TODO: complain about unhandled header
				}
			}
			return [ 0 ];
		};
	}
});