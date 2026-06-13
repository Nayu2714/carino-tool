function buildText() {
    const eventDate = document.getElementById("eventDate").value;
    const eventDay = document.getElementById("eventDay").value;
    const deadlineDate = document.getElementById("deadlineDate").value;
    const deadlineDay = document.getElementById("deadlineDay").value;
    const formUrl = document.getElementById("formUrl").value;

    const text =
`【Carino 事前応募受付開始！】

${eventDate}(${eventDay})営業の事前応募開始！

営業時間：22:00～23:15
応募〆切：${deadlineDate} (${deadlineDay}) 23:59まで

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