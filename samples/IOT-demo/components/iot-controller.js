<template id='iot-controller-item'>
    <div class="MonitorController__item" onClick={() => setElementId(control.id)}>
        <div class="MonitorController__itemTitle">{control.title}</div>
        <img src={control.icon} alt="" class="MonitorController__itemImage" />
    </div>
</template>

class IOTControllerItem extends HTMLElement {
    constructor() {
      super();
        const templateElem = document.getElementById('iot-controller-item');
        const content = templateElem.content.cloneNode(true);
        this.appendChild(content);
    }
}

window.customElements.define('iot-controller-item', IOTControllerItem);