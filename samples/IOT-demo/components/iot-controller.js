const template = document.createElement('template');
template.innerHTML = `
<div class="MonitorController__item">
    <div class="MonitorController__itemTitle"></div>
    <img src="" alt="" class="MonitorController__itemImage" />
</div>
`;

class IOTControllerItem extends HTMLElement {
    constructor() {
        super();
        // const shodow = this.attachShadow({ mode: 'open' });
        const content = template.content.cloneNode(true);
        content.querySelector('.MonitorController__itemTitle').innerText = this.getAttribute('title');
        content.querySelector('.MonitorController__itemImage').src = this.getAttribute('icon');
        this.$item = content.querySelector('.MonitorController__item');
        this.$item.addEventListener('click', () => {
            this.$item.addClass('MonitorController__item--active')
        });
        this.appendChild(content);
    }
}

window.customElements.define('iot-controller-item', IOTControllerItem);