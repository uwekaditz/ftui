/*
* View component

* for FTUI version 3
*
* Copyright (c) 2020 Mario Stephan <mstephan@shared-files.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
* https://github.com/knowthelist/ftui
*/

import { FtuiElement } from '../element.component.js';

export class FtuiView extends FtuiElement {

  constructor(properties) {
    super(properties);
  }

  template() {
    return `
          <style>
            :host {
/*               display: inline-block;
              width: 100%;
              height: 100%; */
              will-change: transform;
              width: 100%;
              position: absolute;
              left: 0;
              top: 0;
              transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
              transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
              display: inline-block;
            }
            </style>
            <slot></slot>`;
  }
}

window.customElements.define('ftui-view', FtuiView);
