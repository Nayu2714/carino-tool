function buildText() {
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

    const text =
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

function buildUrl() {
    const encoded = encodeURIComponent(buildText());
    const intentUrl = 'https://twitter.com/intent/tweet?text=' + encoded;

    return intentUrl;
}

function update() {
    document.getElementById("preview").textContent = buildText();
    document.getElementById("openLink").href = buildUrl();
}

function copyText() {
    navigator.clipboard.writeText(buildText());
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

update(); // ページを開いた際に初期状態のプレビューを表示
