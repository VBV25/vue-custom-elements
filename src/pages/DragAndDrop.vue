<template>
  <div class="container">
    <!-- Блоки -->
    <div v-for="(block, index) in blocks" :key="index" class="block" :data-id="block.id"
     :class="{ [block.id]: true, selected: index === selectedBlockIndex }"
      draggable="true" 
      @dragstart="startDrag(index, $event)" 
      @dragover="handleDragOver($event)" 
      @drop="handleDrop(index)" >
        {{ block.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blocks: [{ name: 'Block 1', id: 'block-1' }, { name: 'Block 2', id: 'block-2' }, { name: 'Block 3', id: 'block-3' }, { name: 'Block 4', id: 'block-4' }], // Список блоков
      selectedBlock: null,
      selectedBlockIndex: null, // Индекс выбранного блока
      hoverBlock: null,
      hoverBlockIndex: null, // Индекс блока, над которым находится перемещаемый блок
      isDragging: false, // Флаг перетаскивания
      prevY: 0, // Предыдущая позиция Y мыши
      directionMouse: null,
    };
  },
  computed: {
    blockPositions() {
      return this.blocks.map((_, index) => index * 110);
    },
  },
  methods: {

    startDrag(index, event) {
      event.dataTransfer.setData('text/plain', index);
      this.selectedBlockIndex = index;
      this.isDragging = true;
      this.selectedBlock = event.target.closest('.block')
    },

    handleDragOver(event) {
      event.preventDefault();
      this.hoverBlock = event.target.closest('.block')

      this.getDirectionMouse(event)
      
      if (this.selectedBlock.dataset.id === this.hoverBlock.dataset.id) return
   
      this.removeSpaceDragging()

      if (this.directionMouse === "up") {
        this.selectedBlock.remove()
        this.hoverBlock.insertAdjacentElement("beforebegin", this.selectedBlock);
        this.createSpaceDragging(this.selectedBlock)
        return
      }
      if (this.directionMouse === "down") {    
        this.selectedBlock.remove()
        this.hoverBlock.insertAdjacentElement("afterend", this.selectedBlock);
        this.createSpaceDragging(this.selectedBlock)
        return
      }
    },

    handleDrop(index) {
      const blockSpace = document.querySelector('.block-space')

      if (this.hoverBlockIndex !== null) {
        const draggedIndex = this.selectedBlockIndex;
        const draggedBlock = this.blocks.splice(draggedIndex, 1)[0];
        const dropIndex = index < draggedIndex ? index : index + 1;
        this.blocks.splice(dropIndex, 0, draggedBlock);
      }
      this.selectedBlockIndex = null;
      this.hoverBlockIndex = null;
      this.prevY = 0
      this.directionMouse = null
      this.selectedBlock = null
      this.hoverBlock = null
      this.isDragging = false;
      if (blockSpace) {
        blockSpace.remove()
      }
    },

    getDirectionMouse(event) {
      if (event.buttons === 1) { // Проверяем, нажата ли кнопка мыши (левая кнопка)
        event.preventDefault();
        const mouseY = event.clientY;
        this.directionMouse = mouseY > this.prevY ? 'down' : 'up';
        // Обновляем предыдущую позицию Y мыши
        this.prevY = mouseY;
      }
    },

    createSpaceDragging(element) {
      const newBlock = document.createElement('div');
      newBlock.classList.add('block-space');
      newBlock.style.top = element.offsetTop + 'px';
      newBlock.dataset.id = element.dataset.id;
      element.insertAdjacentElement("afterend", newBlock);
    },

    removeSpaceDragging(){
      const blockSpace = document.querySelector('.block-space')
      if (this.selectedBlock.dataset.id !== this.hoverBlock.dataset.id && blockSpace) {
        blockSpace.remove()
      }
    }
  },
};
</script>

<style>
.container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.block {
  cursor: pointer;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  border: 1px solid #ccc;
  text-align: center;
}

.selected {
  z-index: 100;
  position: relative;
  opacity: 0.001;
  background-color: lightgreen;
  border-color: green;
}

/* .yellow-block {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: yellow;
  border: 1px solid #ccc;
} */

.block-space {
  position: absolute;
  width: 100%;
  height: 100px;
  border: 2px dashed green;
  background-color: rgb(220, 220, 220);
}
</style>
