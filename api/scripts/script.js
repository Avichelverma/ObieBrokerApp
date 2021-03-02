const xlsxFile = require('read-excel-file/node');

const fileURL = './Carrier Preferences.xlsx';

exports.sheetPL = (sheetNo) =>
	xlsxFile(fileURL, { sheet: sheetNo }).then((rows) => {
		let header = rows[0];
		const fireData = {};
		const autoData = {};
		const floodData = {};
		let R = rows.length;
		let C = rows[0].length;
		for (let i = 1; i < C; i++) {
			fireData[rows[0][i]] = [];
			autoData[rows[0][i]] = [];
			floodData[rows[0][i]] = [];
		}
		for (let i = 1; i < R; i++) {
			carrierName = rows[i][0];
			for (let j = 1; j < C; j++) {
				let value = rows[i][j];
				if (value === 'Both' || value === 'BOTH') {
					fireData[header[j]].push(carrierName);
					autoData[header[j]].push(carrierName);
				} else if (value === 'FIRE/FLOOD') {
					fireData[header[j]].push(carrierName);
					floodData[header[j]].push(carrierName);
				} else if (value === 'FIRE') {
					fireData[header[j]].push(carrierName);
				} else if (value === 'AUTO') {
					autoData[header[j]].push(carrierName);
				}
			}
		}
		let data = [
			{ name: 'fire', state_carrier: fireData },
			{ name: 'auto', state_carrier: autoData },
			{ name: 'flood', state_carrier: floodData }
		];
		return data;
	});

exports.sheetCL = (sheetNo) =>
	xlsxFile(fileURL, { sheet: sheetNo }).then((rows) => {
		let header = rows[0];
		const stateAptData = {};
		let R = rows.length;
		let C = rows[0].length;
		for (let i = 1; i < C; i++) {
			stateAptData[rows[0][i]] = [];
		}
		for (let i = 1; i < R; i++) {
			carrierName = rows[i][0];
			for (let j = 1; j < C; j++) {
				let value = rows[i][j];
				if (value === 'Yes') stateAptData[header[j]].push(carrierName);
			}
		}
		let data = { name: 'state_apt', state_carrier: stateAptData };
		return data;
	});

exports.sheetFlood = (sheetNo) =>
	xlsxFile(fileURL, { sheet: sheetNo }).then((rows) => {
		const floodData = {};
		let header = [];
		let R = rows.length;
		let C = rows[0].length;
		for (let i = 0; i < R; i++) {
			carrierName = rows[i][0];
			if (carrierName === 'Personal Lines' || carrierName === 'Commercial Lines' || carrierName === null) continue;
			if (carrierName === 'Carrier') {
				header = rows[i];
				continue;
			}
			for (let j = 1; j < C; j++) {
				value = rows[i][j];
				if (value === 'Yes') {
					if (header[j] in floodData) {
						floodData[header[j]].push(carrierName);
					} else {
						floodData[header[j]] = [ carrierName ];
					}
				}
			}
		}
		let data = [ { name: 'fire', state_carrier: {} }, { name: 'auto', state_carrier: {} }, { name: 'flood', state_carrier: floodData } ];
		return data;
	});
