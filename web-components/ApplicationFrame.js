import { html, generateWebComponent } from '../libs/helpers.js'

const template = html`
<style>
:host {
    --header-height: 3em;
    --border-width: 1px;
}

.o-a {
    overflow: auto;
}

.d-f {
    display: flex;
}
</style>

<div>
    <header style="border-bottom: var(--border-width) solid black; height: var(--header-height);" class="o-a">
        <slot name="header">
            Header
        </slot>
    </header>
    <div style="display: flex; height: calc(100% - var(--header-height) - var(--border-width))" class="o-a">
        <aside style="background-color: blue; color: white; width: 15%; height: 100%" class="o-a">
            <slot name="sidebar">Sidebar</slot>
        </aside>
        <div style="width: 85%; height: 100%" class="o-a">
            <slot name="content">Content</slot>
        </div>
    </div>
</div>
`

const ApplicationFrame = generateWebComponent({
    template,
    attributesToObserve: [
        'header-height'
    ],
    watch: {
        'header-height'() {
            this.style.setProperty('--header-height', this.getAttribute('header-height'))
        }
    }
})

export default ApplicationFrame
