function setGuildWarTimeAndResetAlarm(time, callback) {
	chrome.storage.local.set({
		"guildWarTime": time,
		"guildWarNeedAlarm": true,
	}, callback);
}
function setCityRefreshNeed(value, callback) {
	chrome.storage.local.set({"cityRefresh": value}, callback);
}
function monitorGuildWar() {
	if (window.location.pathname !== '/etc.cgi') {
		return;
	}
	
	const guildwarDom = document.querySelector(".glyphicon.glyphicon-tower");
	
	if (guildwarDom) {
		setGuildWarTimeAndResetAlarm(new Date().getTime());
		setCityRefreshNeed(true);
		return;
	} else {
		const errorMessageDom = document.querySelector(".msg.msg-warning.msg-danger-text");
		if (!errorMessageDom) {
			return;
		}
		const errorMessage = errorMessageDom.textContent.replaceAll("\n", "");
		if (errorMessage.match(/.*도시 공격까지 ([0-9]+) 초 기다려 주세요..*/)) {
			const remainSecond = errorMessage.replace(/.*도시 공격까지 ([0-9]+) 초 기다려 주세요..*/, "$1")
			if (!remainSecond) {
				return;
			}
			
			console.log(remainSecond);
			setGuildWarTimeAndResetAlarm(new Date().getTime() - (1000 * 60 * 10 - (parseInt(remainSecond, 10) * 1000) - 1000));
		} else if (errorMessage.match(/.*공격할 수 있는 몸상태가 아닙니다. 여인숙에 가서 건강도를 회복하십시오.*/)) {
			addLog("HP부족으로 길드전실패");
			setGuildWarTimeAndResetAlarm(new Date().getTime());
		}
		
		
		
	}
	
	
}
$(document).ready(function() {
	monitorGuildWar();
});