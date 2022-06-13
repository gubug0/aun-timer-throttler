function findBattleButton() {
	if (document.querySelector("form[action=bt]")) {
		return document.querySelector("form[action=bt]");
		
	} else if(document.querySelector("form[action='./bt']")) {
		return document.querySelector("form[action='./bt']");
	}
}

function isAutoBattleActive(callback) {
	chrome.storage.local.get(["isAutoBattle"], function(data) {
		callback(data.isAutoBattle);
	});
}

function isNonblockFrame(callback) {
	chrome.storage.local.get(["isNonblockFrame"], function(data) {
		callback(data.isNonblockFrame);
	});
}

function setNonblockFrame(value, callback) {
	chrome.storage.local.set({"isNonblockFrame": value}, callback);
}

function getGuildCityData(callback) {
	chrome.storage.local.get(["guildMap", "lastCity", "guildData", "cityData"], function(data) {
		if (data.guildMap === undefined) {
			data.guildMap = false;
		}
		if (data.lastCity === undefined) {
			data.lastCity = "";
		}
		if (data.guildData === undefined) {
			data.guildData = "";
		}
		if (data.cityData === undefined) {
			data.cityData = "";
		}

		if (callback) {
			callback(data);
		}
	});
}

function getAbilitySetData(callback) {
	chrome.storage.local.get(["userId", "userPass", "abilitySetA", "abilitySetB", "abilitySetC", "abilitySetD"], function(data) {
		if (data.abilitySetA === undefined) {
			data.abilitySetA = {};
		}
		if (data.abilitySetA.mainAbilityName === undefined) {
			data.abilitySetA.mainAbilityIndex = "-1";
			data.abilitySetA.mainAbilityName = "없음";
		}
		if (data.abilitySetA.classAbilityName === undefined) {
			data.abilitySetA.classAbilityIndex = "-1";
			data.abilitySetA.classAbilityName = "없음";
		}
		if (data.abilitySetB === undefined) {
			data.abilitySetB = {};
		}
		if (data.abilitySetB.mainAbilityName === undefined) {
			data.abilitySetB.mainAbilityIndex = "-1";
			data.abilitySetB.mainAbilityName = "없음";
		}
		if (data.abilitySetB.classAbilityName === undefined) {
			data.abilitySetB.classAbilityIndex = "-1";
			data.abilitySetB.classAbilityName = "없음";
		}
		if (data.abilitySetC === undefined) {
			data.abilitySetC = {};
		}
		if (data.abilitySetC.mainAbilityName === undefined) {
			data.abilitySetC.mainAbilityIndex = "-1";
			data.abilitySetC.mainAbilityName = "없음";
		}
		if (data.abilitySetC.classAbilityName === undefined) {
			data.abilitySetC.classAbilityIndex = "-1";
			data.abilitySetC.classAbilityName = "없음";
		}
		if (data.abilitySetD === undefined) {
			data.abilitySetD = {};
		}
		if (data.abilitySetD.mainAbilityName === undefined) {
			data.abilitySetD.mainAbilityIndex = "-1";
			data.abilitySetD.mainAbilityName = "없음";
		}
		if (data.abilitySetD.classAbilityName === undefined) {
			data.abilitySetD.classAbilityIndex = "-1";
			data.abilitySetD.classAbilityName = "없음";
		}

		if (callback) {
			callback(data);
		}
	});
}

function getUserServerData(callback) {
	chrome.storage.local.get(["userData"], function(data) {
		if (data.userData === undefined) {
			data.userData = [];
		}

		if (callback) {
			callback(data);
		}
	});
}

function changeUserAbility(credential, typeName, typeIndex, abilityIndex) {
	var form = document.createElement('form');
	form.setAttribute('name', 'frmTest');
	form.setAttribute('method', 'post');
	form.setAttribute('action', './status.cgi');
	form.setAttribute('target', 'transFrame');
	form.setAttribute('accept-charset', 'euc-kr');
	var inputIndex = document.createElement('input');
	inputIndex.setAttribute('type', 'radio');
	inputIndex.setAttribute('id', typeName);
	inputIndex.setAttribute('name', typeName);
	inputIndex.setAttribute('value', abilityIndex);
	inputIndex.setAttribute('checked', 'true');
	form.appendChild(inputIndex);
	var inputId = document.createElement('input');
	inputId.setAttribute('type', 'hidden');
	inputId.setAttribute('name', 'id');
	inputId.setAttribute('value', credential.userId);
	form.appendChild(inputId);
	var inputPass = document.createElement('input');
	inputPass.setAttribute('type', 'hidden');
	inputPass.setAttribute('name', 'pass');
	inputPass.setAttribute('value', credential.userPass);
	form.appendChild(inputPass);
	var inputMode = document.createElement('input');
	inputMode.setAttribute('type', 'hidden');
	inputMode.setAttribute('name', 'mode');
	inputMode.setAttribute('value', 'sk_set2');
	form.appendChild(inputMode);
	var inputType = document.createElement('input');
	inputType.setAttribute('type', 'hidden');
	inputType.setAttribute('name', 'type');
	inputType.setAttribute('value', typeIndex);
	form.appendChild(inputType);
	var inputSubmit = document.createElement('input');
	inputSubmit.setAttribute('type', 'submit');
	form.appendChild(inputSubmit);
	var iframeObject = document.createElement('iframe');
	iframeObject.setAttribute('name', 'transFrame');
	iframeObject.setAttribute('id', 'transFrame');
	setNonblockFrame(true, function() {
		try {
			document.body.appendChild(form);
			document.body.appendChild(iframeObject);
			form.submit();
			setTimeout(function() {
				document.body.removeChild(form);
				document.body.removeChild(iframeObject);
				setNonblockFrame(false);
			}, 750);
		} catch (e) {
			console.log(e);
		}
	});
}

function getCityData(cityDataArray, cityName) {
	if (cityDataArray == null) return null;
	try {
		for (var index = 0; index < cityDataArray.length; index ++) {
			var cityDataItem = cityDataArray[index];
			if (cityDataItem == null || cityDataItem.title == null) continue;
			if (cityDataItem.title != null && cityDataItem.title.trim() === cityName.trim()) {
				return cityDataItem;
			}
		}
	} catch (e) {
		console.log(e);
		return null;
	}
	return null;
}

function getGuildDataByName(guildDataArray, guildName) {
	if (guildDataArray == null) return null;
	try {
		for (var index = 0; index < guildDataArray.length; index ++) {
			var guildDataItem = guildDataArray[index];
			if (guildDataItem == null || guildDataItem.title == null) continue;
			if (guildDataItem.title.replace("길드", "").trim() === guildName.replace("길드", "").trim()) {
				return guildDataItem;
			}
		}
	} catch (e) {
		console.log(e);
		return null;
	}
	return null;
}

function getGuildDataByIndex(guildDataArray, guildIndex) {
	if (guildDataArray == null) return null;
	try {
		for (var index = 0; index < guildDataArray.length; index ++) {
			var guildDataItem = guildDataArray[index];
			if (guildDataItem == null || guildDataItem.title == null) continue;
			if (guildDataItem.guildIndex > 0 && guildDataItem.guildIndex === guildIndex) {
				return guildDataItem;
			}
		}
	} catch (e) {
		console.log(e);
		return null;
	}
	return null;
}
function getLoggingConfig(callback) {
	chrome.storage.local.get(["darkLog", "bossParticipant", "logKeywords"], function(data) {
		if (data.darkLog === undefined) {
			data.darkLog = true;
		}
		if (data.bossParticipant === undefined) {
			data.bossParticipant = "-";
		}
		if (data.logKeywords === undefined) {
			data.logKeywords = "";
		}

		if (callback) {
			callback(data);
		}
	});
}

function setLastCity(value, callback) {
	chrome.storage.local.set({"lastCity": value}, callback);
}

function getBattleCount(callback) {
	chrome.storage.local.get(["battleCount"], function(data) {
		if (!data.battleCount) {
			data.battleCount = 0;
		}
		callback(data.battleCount);
	});
}

function increaseBattleCount(callback) {
	getBattleCount(function(battleCount) {
		const result = battleCount + 1;
		chrome.storage.local.set({battleCount: result}, function() {
			callback(result);
		});
	});
}

function setBattleDuration(battleDuration, callback) {
	chrome.storage.local.set({"autoBattleDuration": battleDuration}, callback);
}

function setBattleFiveSecDuration(battleDuration, callback) {
	chrome.storage.local.set({"autoBattleFiveSecDuration": battleDuration}, callback);
}

function getBattleDuration(callback) {
	chrome.storage.local.get(["autoBattleDuration", "autoBattleFiveSecDuration"], function(data) {
		
		if (is5SecondsBattleUser()) {
			var battleDuration = data.autoBattleFiveSecDuration
			if (battleDuration === undefined) {
				battleDuration = 4000;
				setBattleFiveSecDuration(battleDuration, function() {
					callback(battleDuration);
				});
			} else {
				callback(battleDuration);
			}
		} else {
			var battleDuration = data.autoBattleDuration
			if (battleDuration === undefined) {
				battleDuration = 9000;
				setBattleDuration(battleDuration, function() {
					callback(battleDuration);
				});
			} else {
				callback(battleDuration);
			}
		}
	});
}

function getInventorySortConfig(callback) {
	chrome.storage.local.get(["inventorySort", "inventoryFavorite"], function(data) {
		if (data.inventorySort === undefined) {
			data.inventorySort = true;
		}
		if (data.inventoryFavorite === undefined) {
			data.inventoryFavorite = [];
		}

		if (callback) {
			callback(data);
		}
	});
}

function setInventoryFavoriteConfig(value, callback) {
	chrome.storage.local.set({"inventoryFavorite": value}, callback);
}

function addLog(str, callback) {
	chrome.storage.local.get(["battleLog"], function(data) {
		if (data.battleLog === undefined) {
			data.battleLog = "";
		}
		const allLog = "[" + getCurrentDateString() + "] " + str + "\n" + data.battleLog
		var splitLogs = allLog.split("\n");
		
		if (splitLogs.length > 2000) {
            splitLogs = splitLogs.slice(0, 2000)
		}
		chrome.storage.local.set({"battleLog": splitLogs.join("\n")}, callback)
	})
}

function addMultiLog(strList, callback) {
    chrome.storage.local.get(["battleLog"], function(data) {
        if (data.battleLog === undefined) {
            data.battleLog = "";
        }
        
        var allLog = data.battleLog;
        strList.forEach(str => {
            allLog = "[" + getCurrentDateString() + "] " + str + "\n" + allLog
        });
        
        var splitLogs = allLog.split("\n");
        if (splitLogs.length > 2000) {
            splitLogs = splitLogs.slice(0, 2000)
        }
        chrome.storage.local.set({"battleLog": splitLogs.join("\n")}, callback)
    })
}

function setAutoBattleLog(str) {
	chrome.storage.local.set({"autoBattleLog": "[" + getCurrentDateString() + "] " + str});
}

function is5SecondsBattleUser() {
	return Array.from(document.querySelectorAll(".offer.offer-radius.table font")).filter(item => item.textContent.match(/.*5초사냥 사용자, [0-9]+ 초 남음.*/)).length > 0
}

function injectConfigPage(srcFile) {
	if (!document.querySelector("frame[name=mainFrame]")) {
		return;
	}
	const configFrame = document.createElement("frame");
	configFrame.name = "configFrame"
	configFrame.src = srcFile
	configFrame.scrolling = "no"
	
	const frameset = document.createElement('frameset');
	frameset.cols =  "*,260"

	const topFrame = document.querySelector("frame[name=mainFrame]")
	const parentFrameset = topFrame.parentElement
	topFrame.remove()
	
	frameset.appendChild(topFrame);
	frameset.appendChild(configFrame);

	parentFrameset.insertBefore(frameset, parentFrameset.lastChild)
}

function sendUserMessage(credential, targetId, message) {
	if (message.length > 100) message = message.substring(0, 100);
	var form = document.createElement('form');
	form.setAttribute('name', 'frmTest');
	form.setAttribute('method', 'post');
	form.setAttribute('action', './status.cgi');
	form.setAttribute('target', 'transFrame');
	form.setAttribute('accept-charset', 'euc-kr');
	var inputTarget = document.createElement('input');
	inputTarget.setAttribute('type', 'text');
	inputTarget.setAttribute('id', 'player');
	inputTarget.setAttribute('name', 'player');
	inputTarget.setAttribute('value', targetId);
	form.appendChild(inputTarget);
	var inputMessage = document.createElement('input');
	inputMessage.setAttribute('type', 'text');
	inputMessage.setAttribute('id', 'message');
	inputMessage.setAttribute('name', 'message');
	inputMessage.setAttribute('value', message);
	form.appendChild(inputMessage);
	var inputId = document.createElement('input');
	inputId.setAttribute('type', 'hidden');
	inputId.setAttribute('name', 'id');
	inputId.setAttribute('value', credential.userId);
	form.appendChild(inputId);
	var inputPass = document.createElement('input');
	inputPass.setAttribute('type', 'hidden');
	inputPass.setAttribute('name', 'pass');
	inputPass.setAttribute('value', credential.userPass);
	form.appendChild(inputPass);
	var inputMode = document.createElement('input');
	inputMode.setAttribute('type', 'hidden');
	inputMode.setAttribute('name', 'mode');
	inputMode.setAttribute('value', 'message_send2');
	form.appendChild(inputMode);
	var inputSubmit = document.createElement('input');
	inputSubmit.setAttribute('type', 'submit');
	inputSubmit.setAttribute('value', '보내기');
	form.appendChild(inputSubmit);
	var iframeObject = document.createElement('iframe');
	iframeObject.setAttribute('name', 'transFrame');
	iframeObject.setAttribute('id', 'transFrame');
	setNonblockFrame(true, function() {
		try {
			document.body.appendChild(form);
			document.body.appendChild(iframeObject);
			form.submit();
			setTimeout(function() {
				document.body.removeChild(form);
				document.body.removeChild(iframeObject);
				setNonblockFrame(false);
			}, 750);
		} catch (e) {
			console.log(e);
		}
	});
}

function sendUserGold(credential, targetId, gold) {
	var form = document.createElement('form');
	form.setAttribute('name', 'frmTest');
	form.setAttribute('method', 'post');
	form.setAttribute('action', './status.cgi');
	form.setAttribute('target', 'transFrame');
	form.setAttribute('accept-charset', 'euc-kr');
	var inputTarget = document.createElement('input');
	inputTarget.setAttribute('type', 'text');
	inputTarget.setAttribute('id', 'yid');
	inputTarget.setAttribute('name', 'yid');
	inputTarget.setAttribute('value', targetId);
	form.appendChild(inputTarget);
	var inputGold = document.createElement('input');
	inputGold.setAttribute('type', 'text');
	inputGold.setAttribute('id', 'secNum2');
	inputGold.setAttribute('name', 'secNum2');
	inputGold.setAttribute('value', gold.toString());
	form.appendChild(inputGold);
	var inputId = document.createElement('input');
	inputId.setAttribute('type', 'hidden');
	inputId.setAttribute('name', 'id');
	inputId.setAttribute('value', credential.userId);
	form.appendChild(inputId);
	var inputPass = document.createElement('input');
	inputPass.setAttribute('type', 'hidden');
	inputPass.setAttribute('name', 'pass');
	inputPass.setAttribute('value', credential.userPass);
	form.appendChild(inputPass);
	var inputMode = document.createElement('input');
	inputMode.setAttribute('type', 'hidden');
	inputMode.setAttribute('name', 'mode');
	inputMode.setAttribute('value', 'money_send2');
	form.appendChild(inputMode);
	var inputSubmit = document.createElement('input');
	inputSubmit.setAttribute('type', 'submit');
	inputSubmit.setAttribute('value', '송금');
	form.appendChild(inputSubmit);
	var iframeObject = document.createElement('iframe');
	iframeObject.setAttribute('name', 'transFrame');
	iframeObject.setAttribute('id', 'transFrame');
	setNonblockFrame(true, function() {
		try {
			document.body.appendChild(form);
			document.body.appendChild(iframeObject);
			form.submit();
			setTimeout(function() {
				document.body.removeChild(form);
				document.body.removeChild(iframeObject);
				setNonblockFrame(false);
			}, 750);
		} catch (e) {
			console.log(e);
		}
	});
}

function makeTotalPointShorter() {
	var topNavigationBar;
	var topNavigationBars = document.querySelectorAll("nav.navbar.navbar-inverse.navbar-fixed-top");
	if (topNavigationBars && topNavigationBars.length > 1) topNavigationBar = topNavigationBars[1];
	if (!topNavigationBar) return;
	var navigationElements = topNavigationBar.querySelectorAll("td");
	if (!navigationElements) return;
	var totalPointElement;
	for (var index = 0; index < navigationElements.length; index ++) {
		if (navigationElements[index].textContent) {
			if (navigationElements[index].textContent.includes("TOTAL POINTS") && navigationElements[index].querySelector("font[color='white']")) {
				totalPointElement = navigationElements[index].querySelector("font[color='white']");
				break;
			}
		}
	}
	if (!totalPointElement) return;
	try {
		totalPointElement.innerHTML = totalPointElement.textContent.substring(totalPointElement.textContent.indexOf("(") + 1, totalPointElement.textContent.indexOf(")"));
	} catch (e) {
		console.log(e);
	}
}

$(document).ready(function() {
	injectConfigPage(chrome.runtime.getURL('config.html'));

	// makeTotalPointShorter(); UX적으로 개선필요
	
	if (document.querySelector("frame[name=mainFrame]")) {
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			console.log("CHROME onMessage (content.js) : " + request.method);
			if (request.method === "uchatMessage") {
				chrome.storage.local.get(["userId", "userPass"], function(data) {
					if (!data.userId || !data.userPass) {
						console.log("no user credential");
						sendResponse({success: false, message: "사용자 정보가 없습니다..!"});
						return;
					}

					var credential = {};
					credential.userId = data.userId;
					credential.userPass = data.userPass;

					sendUserMessage(credential, request.uchatTargetId, request.uchatValue);
					console.log("uchat REQUEST : message : " + credential + ":" + request.uchatTargetId + ":" + request.uchatValue);
					sendResponse({success: false, message: `${request.uchatTargetNick}에게 전보 전송중`});
				});
				return true;
			}
			if (request.method === "uchatGold") {
				chrome.storage.local.get(["userId", "userPass"], function(data) {
					if (!data.userId || !data.userPass) {
						console.log("no user credential");
						sendResponse({success: false, message: "사용자 정보가 없습니다..!"});
						return;
					}

					var credential = {};
					credential.userId = data.userId;
					credential.userPass = data.userPass;

					sendUserGold(credential, request.uchatTargetId, request.uchatValue);
					console.log("uchat REQUEST : gold : " + credential + ":" + request.uchatTargetId + ":" + request.uchatValue);
					sendResponse({success: false, message: `${request.uchatTargetNick}에게 골드 ${request.uchatValue} 송금중`});
				});
				return true;
			}
		});
		console.log("CHROME onMessage (content.js) SET");
	}
	
	const mainPageForm = document.querySelector("form[action=MainPage]")
	if (mainPageForm) {
		isAutoBattleActive(function(lastBattleStatus) {
			const worker = create300msIntervalWorker(function() {
				isAutoBattleActive(function(currentBattleStatus) {
					if (lastBattleStatus !== currentBattleStatus) {
						worker.terminate();
						mainPageForm.submit();
					}
				});
			});
		})
		
	}
});

