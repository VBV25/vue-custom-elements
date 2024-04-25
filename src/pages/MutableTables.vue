<template>
    <div class="table-container">
        <table class="full-width-table" ref="table">
            <colgroup>
                <col v-for="(columnWidth, index) in columnWidths" :key="index" :style="{ width: columnWidth + 'px' }">
            </colgroup>
            <thead>
                <tr>
                    <th v-for="(column, index) in getNameColumn" :key="index">
                        <div class="header-cell">
                            {{ column }}
                            <div class="resize-handle" @mousedown="startColumnResize($event, index)"></div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                        <div :style="{ height: rowHeights[rowIndex] + 'px' }">
                            {{ cell }}
                            <div class="resize-row" @mousedown="startCellResize($event, rowIndex, cellIndex)"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ref } from 'vue'; // Импортируем ref из Vue 3

export default {
    data() {
        return {
            // columns: ['Название страны', 'Количество жителей', 'Столица', 'Месторасположение', 'Краткое описание'],
            rows: [], // Заполните данными из хранилища Vuex
            columnWidths: [], // Изначальные ширины столбцов
            rowHeights: [], // Изначальные высоты строк
            resizingColumnIndex: null, // Индекс столбца, который в данный момент изменяется
            resizingRowIndex: null, // Индекс строки, которая в данный момент изменяется
            startOffsetX: null, // Начальное смещение X при изменении размера столбца
            startOffsetY: null, // Начальное смещение Y при изменении размера строки
            minHeightRow: 18,
            minWidthRow: 30,
        };
    },
    computed: {
        ...mapGetters({
            getCountries: 'getCountries',
            getNameColumn: 'getNameColumn',
        }),
    },
    methods: {
        startColumnResize(event, index) {
            this.resizingColumnIndex = index;
            this.startOffsetX = event.clientX;
            this.initialColumnWidth = this.columnWidths[index];
            document.addEventListener('mousemove', this.resizeColumn);
            document.addEventListener('mouseup', this.stopColumnResize);

            document.querySelectorAll('*').forEach(element => {
                element.style.userSelect = 'none';
            });
        },
        resizeColumn(event) {
            if (this.resizingColumnIndex !== null) {
                const deltaX = event.clientX - this.startOffsetX;
                const newWidth = this.initialColumnWidth + deltaX;
                if (newWidth > this.minWidthRow) {
                    this.columnWidths[this.resizingColumnIndex] = newWidth;
                    console.log(this.columnWidths);
                    return// Изменяем значение напрямую
                }
            }
        },
        stopColumnResize() {
            this.resizingColumnIndex = null;
            this.startOffsetX = null;
            this.initialColumnWidth = null;
            document.removeEventListener('mousemove', this.resizeColumn);
            document.removeEventListener('mouseup', this.stopColumnResize);

            document.querySelectorAll('*').forEach(element => {
                element.style.userSelect = 'auto';
            });
        },

        //
        //
        //   
        // 

        startCellResize(event, rowIndex, cellIndex) {
            this.resizingRowIndex = rowIndex;
            this.startOffsetY = event.clientY;
            this.initialRowHeight = this.rowHeights[rowIndex];
            document.addEventListener('mousemove', this.resizeCell);
            document.addEventListener('mouseup', this.stopCellResize);

            document.querySelectorAll('*').forEach(element => {
                element.style.userSelect = 'none';
            });
        },
        resizeCell(event) {
            if (this.resizingRowIndex !== null) {
                const deltaY = event.clientY - this.startOffsetY;
                const newRowHeight = this.initialRowHeight + deltaY;
                if (newRowHeight > this.minHeightRow) {
                    this.rowHeights[this.resizingRowIndex] = newRowHeight; // Изменяем значение напрямую
                }
            }
        },
        stopCellResize() {
            this.resizingRowIndex = null;
            this.startOffsetY = null;
            this.initialRowHeight = null;
            document.removeEventListener('mousemove', this.resizeCell);
            document.removeEventListener('mouseup', this.stopRowResize);

            document.querySelectorAll('*').forEach(element => {
                element.style.userSelect = 'auto';
            });
        },
    },
    created() {
        this.rows = this.getCountries;
        this.columnWidths = Array(this.getNameColumn.length).fill(20)
        this.rowHeights = Array(this.getCountries.length).fill(60)
    },
};
</script>

<style scoped>
.table-container {
    overflow-x: auto;
}

.full-width-table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
}

th {
    padding: 8px;
}

th,
td {
    position: relative;
    border: 1px solid #ccc;
    text-align: left;
    position: relative;
}

td div {
    position: relative;
    overflow: scroll;
    padding: 8px;

    &::-webkit-scrollbar {
        display: none;
    }
}

.header-cell {
    position: relative;
}

.resize-handle {
    position: absolute;
    right: -17px;
    bottom: -10px;
    width: 14px;
    height: 200%;
    cursor: col-resize;
}

.resize-row {
    position: absolute;
    padding: 0;
    right: 0px;
    bottom: -7px;
    width: 100%;
    height: 14px;
    cursor: row-resize;
}
</style>