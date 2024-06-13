document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("input-box"); // 入力ボックス要素を取得
    const listContainer = document.getElementById("list-container"); // リストコンテナ要素を取得
    const addButton = document.getElementById("add-button"); // 追加ボタン要素を取得

    addButton.addEventListener("click", addTask); // 追加ボタンがクリックされたときにaddTask関数を呼び出す

    listContainer.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") { // クリックされた要素がリスト項目（LI）かどうかを確認
            toggleTask(e.target); // タスクの完了状態をトグル
        } else if (e.target.tagName === "SPAN") { // クリックされた要素がスパン（削除用）かどうかを確認
            removeTask(e.target.parentElement); // タスクを削除
        }
    });

    // タスクを追加する関数
    function addTask() {
        const task = inputBox.value.trim(); // 入力ボックスの値をトリム
        if (task === "") { // 入力ボックスが空かどうかを確認
            alert("何かを書いてください！"); // テキストが入力されていない場合にアラートを表示
        } else {
            const li = createTaskElement(task); // 新しいリスト項目要素を作成
            listContainer.appendChild(li); // リスト項目をリストコンテナに追加
            saveData(); // 更新されたリストをlocalStorageに保存
        }
        inputBox.value = ""; // タスクを追加した後、入力ボックスをクリア
    }

    // タスク要素を作成する関数
    function createTaskElement(task) {
        const li = document.createElement("li"); // 新しいリスト項目要素を作成
        li.textContent = task; // リスト項目のテキストコンテンツを設定
        const span = document.createElement("span"); // 削除（クロス）アイコンのためのスパン要素を作成
        span.textContent = "\u00d7"; // 乗算記号（クロス）のUnicode
        span.classList.add("close"); // スパンにスタイル用のクラスを追加
        li.appendChild(span); // スパンをリスト項目に追加
        return li; // 作成したリスト項目要素を返す
    }

    // タスクの完了状態をトグルする関数
    function toggleTask(taskElement) {
        taskElement.classList.toggle("checked"); // タスクをマーク/アンマークするために 'checked' クラスをトグル
        saveData(); // 更新されたリストをlocalStorageに保存
    }

    // タスクを削除する関数
    function removeTask(taskElement) {
        taskElement.remove(); // リスト項目を削除
        saveData(); // 更新されたリストをlocalStorageに保存
    }

    // リストコンテナの内部HTMLをlocalStorageに保存する関数
    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML); // リストコンテナの内部HTMLを 'data' というキーでlocalStorageに保存
    }

    // localStorageから保存されたリストを取得し、リストコンテナの内部HTMLに設定する関数
    function showTask() {
        listContainer.innerHTML = localStorage.getItem("data"); // localStorageから保存されたリストを取得
        updateListeners(); // リスナーを更新
    }

    // リスト項目と削除ボタンにイベントリスナーを追加する関数
    function updateListeners() {
        const closeButtons = document.getElementsByClassName("close"); // クラス 'close' のスパン要素（削除ボタン）をすべて取得
        for (let i = 0; i < closeButtons.length; i++) { // 各削除ボタンにイベントリスナーを追加してクリック時にタスクを削除
            closeButtons[i].addEventListener("click", function() {
                removeTask(this.parentElement); // スパンの親リスト項目（タスク）を削除
            });
        }

        const listItems = listContainer.getElementsByTagName("li"); // すべてのリスト項目を取得
        for (let i = 0; i < listItems.length; i++) { // 各リスト項目にイベントリスナーを追加してクリック時に 'checked' クラスをトグル
            listItems[i].addEventListener("click", function() {
                toggleTask(this); // タスクをマーク/アンマークするために 'checked' クラスをトグル
            });
        }
    }

    showTask(); // ページがロードされたときにタスクを表示
});
