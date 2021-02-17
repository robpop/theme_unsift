class ProgressRing extends HTMLElement {
    constructor() {
        super();
        const stroke = this.getAttribute('stroke');
        const radius = $(window).width()*0.17;
        const color = this.getAttribute('color');
        const normalizedRadius = radius - stroke * 2;
        this._circumference = normalizedRadius * 2 * Math.PI;

        this._root = this.attachShadow({mode: 'open'});
        this._root.innerHTML = `
        <svg
            width="${radius * 2}"
            height="${radius * 2}"
            >
            <circle
                stroke="${color}"
                stroke-dasharray="${this._circumference} ${this._circumference}"
                style="stroke-dashoffset:"${this._circumference}"
                stroke-width="${stroke}"
                fill="transparent"
                r="${normalizedRadius}"
                cx="${radius}"
                cy="${radius}"
            />
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"></text>
        </svg>

        <style>
            circle {
                transition: stroke-dashoffset 0.35s;
                transform: rotate(-90deg);
                transform-origin: 50% 50%;
            }
            text {
                font-size: calc(1rem + 1vw);
            }
        </style>
        `;
    }

    setProgress(percent) {
        const steps = this.getAttribute('steps');
        const offset = this._circumference - (percent / 100 * this._circumference);
        const circle = this._root.querySelector('circle');
        const text = this._root.querySelector('text');
        circle.style.strokeDashoffset = offset; 
        text.textContent = (Math.ceil(percent / (100/(steps - 1)))+1)+" of "+steps.toString();
    }

    static get observedAttributes() {
        return ['progress'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'progress') {
            this.setProgress(newValue);
        }
    }
}
  
window.customElements.define('progress-ring', ProgressRing);
  
  