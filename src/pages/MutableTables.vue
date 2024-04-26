<template>
    <div class="table-container">
        <div class="btn-group">
            <button ref="centerHeightBtn" class="btn" @click="centerHeight">Центровать по вертикали</button>
            <button ref="centerWidthBtn" class="btn" @click="centerWidth">Центровать по горизонтали</button>
        </div>

        <table class="full-width-table">
            <colgroup>
                <col v-for="(index) in listCountries[0]" :key="index">
            </colgroup>
            <thead>
                <tr>
                    <th v-for="(column, index) in getNameColumn" :key="index">
                        <div class=" cell header-cell">
                            {{ column }}
                            <div class="resize-handle" @mousedown="startColumnResize($event, index)"></div>
                            <div class="resize-row" @mousedown="startCellResize($event, index)"></div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in listCountries" :key="rowIndex">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                        <div class="cell" :class="cellIndex">
                            {{ cell }}
                            <div class="resize-row" @mousedown="startCellResize($event, rowIndex)"></div>
                            <div class="resize-column-cell" @mousedown="startColumnResize($event, cellIndex)"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<!-- <div class="table-container">
        <div class="table-container__btn-group">
            <button ref="centerHeightBtn" class="table-container__btn" @click="centerHeight">Центровать по вертикали</button>
            <button ref="centerWidthBtn" class="table-container__btn" @click="centerWidth">Центровать по горизонтали</button>
        </div>
</div>
<table class="table-container__table table">
 <colgroup class="table__column-group"></colgroup>
</template> -->

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            listCountries: [],
            columnWidth: null,
            resizingColumnIndex: null,
            resizingRowIndex: null,
            startOffsetX: null,
            startOffsetY: null,
            minHeightRow: 18,
            minWidthColumn: 10,
        };
    },
    computed: {
        ...mapGetters({
            getCountries: 'getCountries',
            getNameColumn: 'getNameColumn',
        }),
    },
    methods: {
        //width
        startColumnResize(event, index) {
            this.resizingColumnIndex = index;
            this.startOffsetX = event.clientX;
            this.initialColumn = event.target.closest('.cell')
            this.initialColumnWidth = event.target.closest('.cell').offsetWidth;
            document.addEventListener('mousemove', this.resizeColumn);
            document.addEventListener('mouseup', this.stopColumnResize);
            document.querySelectorAll('*').forEach(element => {
                element.style.userSelect = 'none';
            });
        },
        resizeColumn(event) {
            document.body.style.cursor = 'col-resize';
            if (this.resizingColumnIndex !== null) {
                const deltaX = event.clientX - this.startOffsetX;
                const newWidth = this.initialColumnWidth + deltaX;
                if (newWidth > this.minWidthColumn) {
                    this.initialColumn.parentNode.style.width = newWidth + 'px';
                    return
                }
            }
        },
        stopColumnResize() {
            this.clearData()
            document.removeEventListener('mousemove', this.resizeColumn);
            document.removeEventListener('mouseup', this.stopColumnResize);

            document.querySelectorAll('*').forEach(element => {
                element.style.userSelect = 'auto';
            });
        },

        //height
        startCellResize(event, rowIndex, cellIndex) {
            this.resizingRowIndex = rowIndex;
            this.startOffsetY = event.clientY;

            this.initialRow = event.target.closest('.cell')
            this.initialRowHeight = event.target.closest('.cell').offsetHeight;

            document.addEventListener('mousemove', this.resizeCell);
            document.addEventListener('mouseup', this.stopCellResize);

            document.querySelectorAll('*').forEach(element => {
                element.style.userSelect = 'none';
            });
        },
        resizeCell(event) {
            document.body.style.cursor = 'row-resize';
            if (this.resizingRowIndex !== null) {
                const deltaY = event.clientY - this.startOffsetY;
                const newRowHeight = this.initialRowHeight + deltaY;
                if (newRowHeight > this.minHeightRow) {
                    const cellRow = this.initialRow.parentNode.parentNode
                    cellRow.querySelectorAll('.cell').forEach(cell => {
                        cell.style.height = newRowHeight + 'px';
                    })
                }
            }
        },
        stopCellResize() {
            this.clearData()
            document.removeEventListener('mousemove', this.resizeCell);
            document.removeEventListener('mouseup', this.stopRowResize);

            document.querySelectorAll('*').forEach(element => {
                element.style.userSelect = 'auto';
            });
        },
        centerHeight() {
            document.querySelectorAll('.cell').forEach(cell => {
                cell.classList.toggle('center-height')
            })
            this.$refs.centerHeightBtn.classList.toggle('active')
        },
        centerWidth() {
            document.querySelectorAll('.cell').forEach(cell => {
                cell.classList.toggle('center-width')
            })
            this.$refs.centerWidthBtn.classList.toggle('active')
        },
        clearData() {
            document.body.style.cursor = 'auto';
            this.resizingRowIndex = null;
            this.startOffsetY = null;
            this.initialRowHeight = null;
            this.resizingColumnIndex = null;
            this.startOffsetX = null;
            this.initialColumnWidth = null;
            this.columnWidth = null;
        }
    },
    created() {
        this.listCountries = this.getCountries;
    },
};
</script>

<style scoped lang="scss">
* {
    transform-origin: top left;
    transform: all 0.2s linear;
}

.btn-group {
    width: 90%;
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    margin-bottom: 20px;
}

.btn {
    width: max-content;
    height: max-content;
    padding: 5px 10px;

    &.active {
        background-color: green;
        color: white;
    }
}

.cell {
    width: 100%;
    min-height: 100%;
    height: max-content;
    display: flex;
    align-items: flex-start;
    justify-content: start;


    text-align: start;
    overflow: auto;
    padding: 8px;

    &::-webkit-scrollbar {
        display: none;
    }

    &.center-height {
        align-items: center;
    }

    &.center-width {
        justify-content: center;
        text-align: center;
    }

    & .resize-row {
        position: absolute;
        padding: 0;
        right: 0px;
        bottom: -7px;
        width: 100%;
        height: 14px;
        cursor: row-resize;
    }
}

.header-cell {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: unset;
    overflow: unset;

    & .resize-row {
        position: absolute;
        padding: 0;
        right: -2.5%;
        bottom: -15px;
        width: 105%;
        height: 14px;
        cursor: row-resize;
    }
}


.table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: auto;
}

.full-width-table {
    width: 90%;
    height: max-content;
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

.resize-column-cell {
    position: absolute;
    right: -4px;
    bottom: 0px;
    width: 7px;
    height: 100%;
    cursor: col-resize;
}
</style>