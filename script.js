// 选择情绪
function selectEmotion(emotion) {
    document.getElementById("selected-emotion").textContent = emotion;
}


// 监听用户交互后播放音乐
document.body.addEventListener("click", () => {
    bgMusic.play().catch(err => console.log("音乐自动播放失败:", err));
}, { once: true });


// 保存日记到 LocalStorage
function saveEntry() {
    let emotion = document.getElementById("selected-emotion").textContent;
    let eventText = document.getElementById("event").value;
    let reactionText = document.getElementById("reaction").value;
    let regulationText = document.getElementById("regulation").value;
    let timestamp = new Date().toLocaleString();

    if (emotion === "无") {
        alert("请选择一个情绪！");
        return;
    }

    let entry = {
        timestamp: timestamp,
        emotion: emotion,
        event: eventText,
        reaction: reactionText,
        regulation: regulationText
    };

    let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    entries.push(entry);
    localStorage.setItem("diaryEntries", JSON.stringify(entries));

    alert("日记已保存！");
    loadEntries();
}

// 加载历史日记
function loadEntries() {
    let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    let entryList = document.getElementById("entry-list");
    entryList.innerHTML = "";

    entries.forEach(entry => {
        let div = document.createElement("div");
        div.classList.add("entry");
        div.innerHTML = `
            <p><strong>时间：</strong>${entry.timestamp}</p>
            <p><strong>情绪：</strong>${entry.emotion}</p>
            <p><strong>事件：</strong>${entry.event}</p>
            <p><strong>行为反思：</strong>${entry.reaction}</p>
            <p><strong>调节方式：</strong>${entry.regulation}</p>
        `;
        entryList.appendChild(div);
    });
}

// 页面加载时显示历史日记
document.addEventListener("DOMContentLoaded", loadEntries);
