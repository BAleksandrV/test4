document.getElementById('searchRoom').addEventListener('input', filterTable, false);
document.getElementById('searchNorm').addEventListener('input', filterTable, false);

let jsonData = [];  // Хранит загруженные данные

// Загрузка данных из JSON файла при загрузке страницы
window.addEventListener('load', () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            jsonData = data;
            populateTable(jsonData);
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
});

function populateTable(data) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';  // Очищаем таблицу перед добавлением новых данных
    data.forEach((row, index) => {
        if (index === 0) return;  // Пропускаем первую строку (заголовки)
        const newRow = document.createElement('tr');
        row.forEach((cell, cellIndex) => {
            const newCell = document.createElement('td');
            newCell.textContent = cell !== undefined ? cell : '-';  // Если ячейка пустая, ставим прочерк
            newRow.appendChild(newCell);
        });
        tableBody.appendChild(newRow);
    });
}

function filterTable() {
    const searchRoomValue = document.getElementById('searchRoom').value.toLowerCase();
    const searchNormValue = document.getElementById('searchNorm').value.toLowerCase();
    const filteredData = jsonData.filter((row, index) => {
        if (index === 0) return false;  // Пропускаем первую строку (заголовки)
        const roomMatches = row[0] && row[0].toString().toLowerCase().includes(searchRoomValue);
        const normMatches = row[3] && row[3].toString().toLowerCase().includes(searchNormValue);
        return roomMatches && normMatches;
    });
    populateTable([jsonData[0], ...filteredData]);  // Добавляем заголовки и отфильтрованные данные
}
