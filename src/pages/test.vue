<template>
    <div class="table-container">
      <table class="full-width-table" ref="table">
        <colgroup>
          <col v-for="(columnWidth, index) in columnWidths" :key="index" :style="{ width: columnWidth + 'px' }">
        </colgroup>
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">
              <div class="header-cell">
                {{ column }}
                <div class="resize-handle" @mousedown="startColumnResize($event, index)"></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex"
              @mousedown="startCellResize($event, rowIndex, cellIndex)">
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        columns: ['Название страны', 'Количество жителей', 'Столица', 'Месторасположение', 'Краткое описание'],
        rows: [], // Заполните данными из хранилища Vuex
        columnWidths: Array(5).fill(150), // Изначальные ширины столбцов
        resizingColumnIndex: null, // Индекс столбца, который в данный момент изменяется
        resizingCell: null, // Индекс изменяемой ячейки
        startOffsetX: null, // Начальное смещение X при изменении размера столбца
        initialCellWidth: null, // Изначальная ширина ячейки
      };
    },
    computed: {
      ...mapGetters({
        getCountries: 'getCountries',
      }),
    },
    methods: {
      startColumnResize(event, index) {
        this.resizingColumnIndex = index;
        this.startOffsetX = event.clientX;
        document.addEventListener('mousemove', this.resizeColumn);
        document.addEventListener('mouseup', this.stopColumnResize);
      },
      resizeColumn(event) {
  if (this.resizingColumnIndex !== null) {
    const deltaX = event.clientX - this.startOffsetX;
    const newWidth = this.columnWidths[this.resizingColumnIndex] + deltaX;
    if (newWidth > 0) {
      Vue.set(this.columnWidths, this.resizingColumnIndex, newWidth);
    }
  }
},
      stopColumnResize() {
        this.resizingColumnIndex = null;
        this.startOffsetX = null;
        document.removeEventListener('mousemove', this.resizeColumn);
        document.removeEventListener('mouseup', this.stopColumnResize);
      },
      startCellResize(event, rowIndex, cellIndex) {
        this.resizingCell = { rowIndex, cellIndex };
        this.startOffsetX = event.clientX;
        this.initialCellWidth = event.target.offsetWidth;
      },
      resizeCell(event) {
        if (this.resizingCell !== null) {
          const deltaX = event.clientX - this.startOffsetX;
          const newWidth = this.initialCellWidth + deltaX;
          if (newWidth > 0) {
            const columnWidthIndex = this.resizingCell.cellIndex;
            this.$set(this.columnWidths, columnWidthIndex, newWidth);
          }
        }
      },
      stopCellResize() {
        this.resizingCell = null;
        this.startOffsetX = null;
      },
    },
    created() {
      this.rows = this.getCountries; // Заполнение данных из Vuex
    },
  };
  </script>
  
  <style scoped>
  .table-container {
    overflow-x: auto;
  }
  
  .full-width-table {
    width: 100%;
    border-collapse: collapse; /* Убираем отступы между ячейками */
  }
  
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
    position: relative; /* Добавлено для корректного позиционирования ручек изменения размера */
  }
  
  .header-cell {
    position: relative;
  }
  
  .resize-handle {
    position: absolute;
    right: -12px;
    bottom: -7px;
    width: 10px;
    height: 176%;
    cursor: col-resize;
  }
  
  </style>