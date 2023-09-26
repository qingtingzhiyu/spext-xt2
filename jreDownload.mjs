/* --------------------------------------------------------------------------------------------
 * SonarLint for VisualStudio Code
 * Copyright (C) 2017-2022 SonarSource SA
 * sonarlint@sonarsource.com
 * Licensed under the LGPLv3 License. See LICENSE.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
import { cleanJreDir, deleteFile } from './fsUtils.mjs';
import { ensureDir } from 'fs-extra';
import { parse } from 'url';
import { basename } from 'path';
import { error, info } from 'fancy-log';
import fetch from 'node-fetch';
import { existsSync, mkdirSync, createReadStream, createWriteStream } from 'fs';
import { extract } from 'tar';
import { createGunzip } from 'node:zlib';

export default async function downloadJre(targetPlatform, javaVersion) {
	cleanJreDir();
	ensureDir('./jre', err => {
		if (err) {
			error(`Error while ensuring existance of ./jre folder.${err}`);
		}
	});

	const platformMapping = {
		'linux-arm64': 'linux-aarch64',
		'linux-x64': 'linux-x86_64',
		'darwin-arm64': 'macosx-aarch64',
		'darwin-x64': 'macosx-x86_64',
		'win32-x64': 'win32-x86_64'
	};

	if (!isValidParams(targetPlatform, platformMapping)) {
		return;
	}

	// let jreVersionLabel = 'SpecCheckerLite_win';
	// if (targetPlatform === 'linux-x6') {
	// 	jreVersionLabel = 'SpecCheckerLite_linux';
	// }

	// const outputFolderPath = './bin/' + jreVersionLabel;
	// if (!existsSync(outputFolderPath)) {
	// 	mkdirSync(outputFolderPath);
	// }

}

function isValidParams(targetPlatform, platformMapping) {
	if (!targetPlatform || !Object.keys(platformMapping).includes(targetPlatform)) {
		error(
			'[Error] download_jre failed, please specify a valid target platform via --target argument. ' +
			'Here are the supported platform list:'
		);
		for (const platform of Object.keys(platformMapping)) {
			info(platform);
		}
		return false;
	}
	return true;
}

