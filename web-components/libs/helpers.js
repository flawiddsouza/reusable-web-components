export function generateWebComponent({ attributesToObserve, template, mounted, watch }) {
    return class extends HTMLElement {
        constructor() {
            super()
            let shadowElement = this.attachShadow({ mode: 'open' })
            shadowElement.innerHTML = template
        }

        connectedCallback() {
            if(mounted) {
                mounted.call(this)
            }
        }

        static get observedAttributes() {
            if(attributesToObserve) {
                return attributesToObserve
            }
        }

        attributeChangedCallback(attributeName, oldValue, newValue) {
            if(watch) {
                if(attributeName in watch) {
                    watch[attributeName].call(this, oldValue, newValue)
                }
            }
        }
    }
}

export function html(htmlString) {
    return htmlString
}
