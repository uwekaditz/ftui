import FtuiWidget from './ftui.widget.js';

export default class FtuiSymbol extends FtuiWidget {

  constructor(attributes) {
    const defaults = {
      stateClasses: { '.*': '', 'on': 'active' },
      icon: 'fa ftui-window',
      iconClass: '',
      text: '',
      textClass: '',
      badgeValue: '',
      badgeClass: ''

    };
    super(Object.assign(defaults, attributes));

    this.elementIcon = this.querySelector('#icon');
    this.elementText = this.querySelector('#text');
    this.elementBadge = this.querySelector('#badge');

    ftui.addReading(this.stateReading).subscribe(param => this.onUpdateState(param));
    ftui.addReading(this.iconReading).subscribe(param => this.onUpdateIcon(param));
    ftui.addReading(this.textReading).subscribe(param => this.onUpdateText(param));
    ftui.addReading(this.badgeReading).subscribe(param => this.onUpdateBadge(param));
  }

  template() {
    return `<div id="wrapper">
          <div id="icon" class="${this.icon} ${this.iconClass}">
            <span id="text" class="${this.textClass}">${this.text}</span>
            <span id="badge" class="${this.badgeClass}">${this.badgeValue}</span>
          </div>
      </div>`;
  }

  onUpdateState(param) {
    this.setMatchingClasses(this.elementIcon, this.stateClasses, param.value);
  }

  onUpdateIcon(param) {
    if (this.iconClasses) {
      if (this.icon) {
        this.elementIcon.classList.remove(...this.icon.split(' '));
      }
      this.setMatchingClasses(this.elementIcon, this.iconClasses, param.value);
    } else {
      if (this.icon) {
        this.elementIcon.classList.remove(...this.icon.split(' '));
        this.icon = param.value;
        this.elementIcon.classList.add(...this.icon.split(' '));
      }
    }
  }

  onUpdateText(param) {
    if (ftui.isValid(param.value)) {
      this.elementText.innerHTML = param.value;
    }
    this.setMatchingClasses(this.elementText, this.textClasses, param.value);
  }

  onUpdateBadge(param) {
    this.elementBadge.innerHTML = (ftui.isValid(param.value) && param.value > 0) ? param.value : '';
  }

  setMatchingClasses(element, classes, value) {
    if (classes) {
      element.classList.remove(...this.allClasses(classes));
      element.classList.add(...this.matchingClasses(classes, value));
    }
  }

}

ftui.appendStyleLink(ftui.config.basedir + 'css/ftui.symbol.css', false);
window.customElements.define('ftui-symbol', FtuiSymbol);
