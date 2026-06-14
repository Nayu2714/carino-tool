let currentTab = 'pre';

function switchTab(tabName) {
    currentTab = tabName;

    document.querySelectorAll('.tab-content').forEach((el) => {
        el.style.display = 'none';
    });

    document.getElementById('tab-' + tabName).style.display = 'block';

    document.querySelectorAll('.tab-btn').forEach((el) => {
        el.classList.remove('active');
    })

    event.currentTarget.classList.add('active');

    update();
}

function buildPreText() {
    const eventDateVal = document.getElementById("eventDate").value;
    const deadlineDateVal = document.getElementById("deadlineDate").value;
    const formUrl = document.getElementById("formUrl").value;

    const days = ["日", "月", "火", "水", "木", "金", "土"];

    const eventDate = new Date(eventDateVal);
    const deadlineDate = new Date(deadlineDateVal);

    const eventMonth = eventDate.getMonth() + 1;
    const eventDay = eventDate.getDate();
    const eventDayName = days[eventDate.getDay()];

    const deadlineMonth = deadlineDate.getMonth() + 1;
    const deadlineDay = deadlineDate.getDate();
    const deadlineDayName = days[deadlineDate.getDay()];

    const text = // エディターの自動インデントによって余計な空白が生まれる可能性があるため注意すること。
`【Carino 事前応募受付開始！】

${eventMonth}/${eventDay}(${eventDayName})営業の事前応募開始！

営業時間：22:00～23:15
応募〆切：${deadlineMonth}/${deadlineDay} (${deadlineDayName}) 23:59まで

下記応募フォームより必要事項をご記入ください！
${formUrl}

皆様のご応募お待ちしております
#VRC_Carino`;

    return text;
}

function buildSamedayText() {
    const samedayDateVal = document.getElementById("samedayDate").value;
    const joinVal = document.getElementById("joinAccount").value;

    const joinName = joinVal.split('|')[0];
    const joinUrl = joinVal.split('|')[1];

    const days = ["日", "月", "火", "水", "木", "金", "土"];

    const samedayDate = new Date(samedayDateVal);
    const samedayMonth = samedayDate.getMonth() + 1;
    const samedayDay = samedayDate.getDate();
    const samedayDayName = days[samedayDate.getDay()];

    const text =
`✨${samedayMonth}/${samedayDay}(${samedayDayName}) 当日参加枠のお知らせ！✨

今回も当日にフレンド+で「抽選インスタンス」を開きます！
本営業に参加できるかがその場で決まります！

開場：21:50
抽選：21:55

下記の参加条件を確認の上、「${joinName}」へJoinしてください！

【JOIN先】
${joinUrl}

#VRC_Carino`;
    
    return text;
}

// タブ及び生成関数の対応表
const builders = {
    'pre'       : buildPreText,
    'sameday'   : buildSamedayText,
};

function getCurrentText() {
    return builders[currentTab]();
}

function buildUrl() {
    const encoded = encodeURIComponent(getCurrentText());
    const intentUrl = 'https://twitter.com/intent/tweet?text=' + encoded;

    return intentUrl;
}

function update() {
    document.getElementById("preview").textContent = getCurrentText();
    document.getElementById("openLink").href = buildUrl();
}

function copyText() {
    navigator.clipboard.writeText(getCurrentText());
    alert("本文をコピーしました！");
}

function copyUrl() {
    navigator.clipboard.writeText(buildUrl());
    alert("Intent URLをコピーしました！")
}

const inputs = document.querySelectorAll("input, select");
inputs.forEach((el) => {
    el.addEventListener("input", update);
});

// ページ読み込み時の初期化
function init() {
    document.querySelectorAll('.tab-content').forEach((el) => {
        el.style.display = 'none';
    })

    document.getElementById('tab-' + currentTab).style.display = 'block';

    update();
}

init();