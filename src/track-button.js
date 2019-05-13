export default class TrackButton extends HTMLElement {
  constructor() {
    super();

    this.thing = this.attributes.thing.value;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        button {
          --shadow-colour: hsla(var(--blue), 0%, 50%, .4);
          --border-color: hsla(var(--blue), 0%, 80%, .5);
          font-size: 64px;
          padding: .5em;
          margin: .2em;
          border-radius: 8px;
          background: hsla(var(--blue), 0%, 50%, .2);
          border: 1px solid var(--border-colour);
          cursor: pointer;
          box-shadow: 
            inset 7px 7px 3px var(--shadow-colour),
            inset -4px -4px 3px var(--shadow-colour),
            1px 1px 3px #111;
          transition: box-shadow .2s, filter .2s;
          filter: contrast(.7);
        }
        button:hover, button:focus {
          filter: none;
          box-shadow: 
            inset 7px 7px 3px hsla(var(--blue), 0%, 80%, .4),
            inset -4px -4px 3px hsla(var(--blue), 0%, 80%, .4);
          outline: none;
        }
        button:active {
          box-shadow: 
            inset 7px 7px 3px hsla(var(--blue), 0%, 30%, .4),
            inset -4px -4px 3px hsla(var(--blue), 0%, 30%, .4);
        }
      </style>
      <button>${this.thing}</button>
    `;

    this.shadowRoot.querySelector('button').addEventListener('click', this.track.bind(this));
  }

  track() {
    this.dispatchEvent(new CustomEvent('track-thing', {
      detail: this.thing,
      bubbles: true
    }));
  }
}

customElements.define('track-button', TrackButton)